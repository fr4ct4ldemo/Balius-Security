'use strict';

function parseId(token) {
  if (!token) return null;
  const match = token.match(/\d{17,19}/);
  return match ? match[0] : null;
}

function parseBoolean(token) {
  if (!token) return null;
  const value = token.toLowerCase();
  if (['true', 'yes', 'y', '1', 'on'].includes(value)) return true;
  if (['false', 'no', 'n', '0', 'off'].includes(value)) return false;
  return null;
}

function resolveUser(token, message, client) {
  if (!token) return null;
  const mention = message.mentions.users.first();
  if (mention) return mention;
  const id = parseId(token);
  if (!id) return null;
  return client.users.cache.get(id) || message.guild?.members.cache.get(id)?.user || { id };
}

function resolveRole(token, message) {
  if (!token) return null;
  const mention = message.mentions.roles.first();
  if (mention) return mention;
  const id = parseId(token);
  return id ? message.guild?.roles.cache.get(id) || null : null;
}

function resolveChannel(token, message) {
  if (!token) return null;
  const mention = message.mentions.channels.first();
  if (mention) return mention;
  const id = parseId(token);
  return id ? message.guild?.channels.cache.get(id) || null : null;
}

function resolveMentionable(token, message, client) {
  return resolveRole(token, message) || resolveUser(token, message, client);
}

function findOptionByName(options, name) {
  return options.find((opt) => opt.name === name);
}

function createOptionValues(options, rawArgs, message, client) {
  const results = {};
  const args = [...rawArgs];

  for (let index = 0; index < options.length; index += 1) {
    const option = options[index];
    if (!args.length) break;

    if (option.type === 3) {
      results[option.name] = args.shift();
      continue;
    }

    if (option.type === 4) {
      const value = args.shift();
      results[option.name] = value ? parseInt(value, 10) : null;
      continue;
    }

    if (option.type === 5) {
      const value = args.shift();
      results[option.name] = value ? parseBoolean(value) : null;
      continue;
    }

    if (option.type === 6) {
      const value = args.shift();
      results[option.name] = resolveUser(value, message, client);
      continue;
    }

    if (option.type === 7) {
      const value = args.shift();
      results[option.name] = resolveChannel(value, message);
      continue;
    }

    if (option.type === 8) {
      const value = args.shift();
      results[option.name] = resolveMentionable(value, message, client);
      continue;
    }

    if (option.type === 10) {
      const value = args.shift();
      results[option.name] = value ? parseFloat(value) : null;
      continue;
    }

    if (option.type === 11) {
      const value = args.shift();
      results[option.name] = value ? parseInt(value, 10) : null;
      continue;
    }

    if (option.type === 12) {
      const value = args.shift();
      results[option.name] = value ? parseFloat(value) : null;
      continue;
    }

    // Strings, attachments, and fallback values
    if (index === options.length - 1) {
      results[option.name] = args.join(' ');
      args.length = 0;
    } else {
      results[option.name] = args.shift();
    }
  }

  return results;
}

function buildOptions(commandData, rawArgs, message, client) {
  const options = commandData?.options || [];
  if (!options.length) {
    return {
      getSubcommand: () => null,
      getString: () => null,
      getInteger: () => null,
      getBoolean: () => null,
      getUser: () => null,
      getRole: () => null,
      getChannel: () => null,
      getMentionable: () => null,
    };
  }

  const args = [...rawArgs];
  let resolvedOptions = options;
  let subcommand = null;

  const subcommandOption = resolvedOptions.find((opt) => opt.type === 1);
  if (subcommandOption) {
    const possible = args[0]?.toLowerCase();
    const match = subcommandOption.options?.find((opt) => opt.name.toLowerCase() === possible);
    if (match) {
      subcommand = args.shift();
      resolvedOptions = match.options || [];
    }
  }

  const values = createOptionValues(resolvedOptions, args, message, client);

  return {
    getSubcommand: () => subcommand,
    getString: (name) => values[name] ?? null,
    getInteger: (name) => values[name] ?? null,
    getBoolean: (name) => values[name] ?? null,
    getUser: (name) => values[name] || null,
    getRole: (name) => values[name] || null,
    getChannel: (name) => values[name] || null,
    getMentionable: (name) => values[name] || null,
  };
}

function buildPrefixInteraction(message, args, client, commandData) {
  const commandJSON = typeof commandData.toJSON === 'function' ? commandData.toJSON() : commandData;
  const options = buildOptions(commandJSON, args, message, client);
  let deferredMessage = null;
  let repliedMessage = null;

  return {
    guild: message.guild,
    user: message.author,
    member: message.member,
    channel: message.channel,
    client,
    options,
    async deferReply(payload = {}) {
      const content = payload?.content || '\u200b';
      deferredMessage = await message.reply({ content }).catch(() => null);
      return deferredMessage;
    },
    async reply(payload) {
      repliedMessage = await message.reply(payload).catch(() => null);
      return repliedMessage;
    },
    async editReply(payload) {
      const editPayload = { content: '', ...payload };
      if (deferredMessage) {
        return deferredMessage.edit(editPayload).catch(async () => {
          return message.reply(editPayload).catch(() => null);
        });
      }
      if (repliedMessage) {
        return repliedMessage.edit(editPayload).catch(async () => {
          return message.reply(editPayload).catch(() => null);
        });
      }
      return message.reply(editPayload).catch(() => null);
    },
    async fetchReply() {
      return deferredMessage || repliedMessage || null;
    },
  };
}

module.exports = { buildPrefixInteraction };
