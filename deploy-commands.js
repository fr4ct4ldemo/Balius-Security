'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const clientId = process.env.CLIENT_ID;
if (!clientId) {
  console.error('CLIENT_ID missing in .env');
  process.exit(1);
}

const commands = [];
const commandsDir = path.join(__dirname, 'commands');
const categories = fs.existsSync(commandsDir)
  ? fs.readdirSync(commandsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
      .map((entry) => entry.name)
  : [];

function loadCategoryCommands(category) {
  const categoryDir = path.join(commandsDir, category);
  if (!fs.existsSync(categoryDir)) return [];

  const categoryCommands = [];
  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(categoryDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) continue;
      const nestedCommands = fs.readdirSync(fullPath, { withFileTypes: true });
      for (const nestedEntry of nestedCommands) {
        const nestedPath = path.join(fullPath, nestedEntry.name);
        if (nestedEntry.isFile() && nestedEntry.name.endsWith('.js')) {
          const cmd = require(nestedPath);
          if (cmd.data && !cmd.prefix) categoryCommands.push(cmd.data.toJSON());
        }
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.js')) {
      const cmd = require(fullPath);
      if (cmd.data && !cmd.prefix) categoryCommands.push(cmd.data.toJSON());
    }
  }

  if (categoryCommands.length > 50) {
    console.warn(`[deploy] ${category} contains ${categoryCommands.length} slash commands; only the first 50 will be deployed.`);
  }

  return categoryCommands.slice(0, 50);
}

for (const category of categories) {
  const loaded = loadCategoryCommands(category);
  console.log(`[deploy] loaded ${loaded.length} ${category} command(s)`);
  commands.push(...loaded);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const guildId = process.env.GUILD_ID;

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    let data;
    if (guildId) {
      // Guild deploy — instant (use during development)
      data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log(`Successfully deployed ${data.length} guild commands (instant).`);
    } else {
      // Global deploy — up to 1 hour propagation
      data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log(`Successfully deployed ${data.length} global commands.`);
    }
  } catch (error) {
    console.error(error);
  }
})();
