// Balius — Discord Security & Moderation Bot | Created by fr4ct4l
'use strict';
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const db = require('./utils/database');
const { startScheduler } = require('./utils/scheduler');
const { startDashboard } = require('./dashboard/server');
const { syncEmojis } = require('./utils/emojiSync');
const antiNuke = require('./events/antiNuke');
const { errorEmbed } = require('./utils/embedBuilder');

const COMMANDS_DIR = path.join(__dirname, 'commands');
const EVENTS_DIR = path.join(__dirname, 'events');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildPresences
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();
client.prefixCommands = new Collection();

function walkDirectory(directory, callback) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) continue;
      walkDirectory(entryPath, callback);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      callback(entryPath);
    }
  }
}

function loadCommands() {
  if (!fs.existsSync(COMMANDS_DIR)) return;
  walkDirectory(COMMANDS_DIR, (filePath) => {
    try {
       
      const command = require(filePath);
      const category = path.relative(COMMANDS_DIR, filePath).split(path.sep)[0];
      if (command?.prefix && typeof command.execute === 'function') {
        const commandName = command.name || path.basename(filePath, '.js');
        if (!command.category) command.category = category;
        client.prefixCommands.set(commandName, command);
        console.log(`[loadCommands] registered prefix ${commandName} from ${filePath}`);
      } else if (command?.data?.name && typeof command.execute === 'function') {
        client.commands.set(command.data.name, command);
        console.log(`[loadCommands] registered slash ${command.data.name} from ${filePath}`);
      } else {
        console.log(`[loadCommands] skipped ${filePath} (no valid export)`);
      }
    } catch (err) {
      console.error(`[loadCommands] failed require ${filePath}:`, err);
    }
  });
}

function loadEvents() {
  if (!fs.existsSync(EVENTS_DIR)) return;
  for (const file of fs.readdirSync(EVENTS_DIR).filter((file) => file.endsWith('.js'))) {
    const event = require(path.join(EVENTS_DIR, file));
    if (!event?.name || typeof event.execute !== 'function') continue;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}



client.on('warn', (info) => console.warn('[discord:warn]', info));
client.on('error', (error) => console.error('[discord:error]', error));

async function main() {
  const token = process.env.TOKEN || process.env.DISCORD_TOKEN;
  if (!token) {
    console.error('[startup] Discord token is missing. Set TOKEN or DISCORD_TOKEN in environment.');
    process.exit(1);
  }

  await db.initDatabase();
  loadCommands();
  console.log('[startup] slash commands loaded:', Array.from(client.commands.keys()));
  loadEvents();

  await client.login(token);

  antiNuke.register(client);
  startScheduler(client);
  startDashboard(client);
}

main().catch((err) => {
  console.error('[startup] Fatal error', err);
  process.exit(1);
});

