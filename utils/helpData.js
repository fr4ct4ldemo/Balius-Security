'use strict';
const fs   = require('fs');
const path = require('path');

// ─── Emoji IDs ────────────────────────────────────────────────────────────────
const CACHE_FILE = path.join(__dirname, '..', 'data', 'emoji-cache.json');
function loadCachedIds() {
  try {
    if (fs.existsSync(CACHE_FILE)) return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch { /* ignore */ }
  return {};
}
const _cached = loadCachedIds();

const E = {
  home:      _cached.home      || '',
  hammer:    _cached.hammer    || '',
  shield:    _cached.shield    || '',
  clipboard: _cached.clipboard || '',
  wrench:    _cached.wrench    || '',
  gear:      _cached.gear      || '',
  folder:    _cached.folder    || '',
  zap:       _cached.zap       || '',
  scroll:    _cached.scroll    || '',
  checkmark: _cached.checkmark || '',
  xmark:     _cached.xmark     || '',
};

const em  = (name) => E[name] ? `<:${name}:${E[name]}>` : '❓';
const eid = (name) => E[name] ? { id: E[name] } : { name: '❓' };

// ─── Command counts ────────────────────────────────────────────────────────────
const CATEGORY_COUNTS = {
  security:   49,
  moderation: 49,
  utility:    16,
  config:     17,  // 10 slash + 7 prefix-only
  logging:    17,  // 6 slash + 11 prefix-only
};

// ─── Page topic labels ─────────────────────────────────────────────────────────
const PAGE_TOPICS = {
  moderation: [
    'Bans & Kicks',
    'Mutes, Timeouts & Warns',
    'Cases, Notes & History',
    'Roles & Voice',
  ],
  security: [
    'Automod & Filters',
    'Spam, Flood & Abuse',
    'Raid & Lockdown',
    'Verification & Alts',
    'Flags, Threats & Nuke',
    'Permissions & Audit',
    'Advanced Protection',
  ],
  config: ['Slash Commands', 'Prefix-Only Commands'],
  logging: ['Slash Commands', 'Prefix-Only Commands'],
};

// ─── Full command listings ─────────────────────────────────────────────────────
const CATEGORY_DETAILS = {

  moderation: {
    get emoji() { return em('hammer'); },
    title: 'Moderation Commands',
    description: 'Manage members and keep your server in order.',
    pages: [
      // Page 1 — Bans & Kicks
      [
        ['`/ban`',        'Ban a user from the server'],
        ['`/unban`',      'Unban a previously banned user'],
        ['`/softban`',    'Ban & immediately unban to purge messages'],
        ['`/tempban`',    'Temporarily ban a user for a set duration'],
        ['`/forceban`',   'Force-ban a user not in the server'],
        ['`/hackban`',    'Ban a user by ID without them being present'],
        ['`/idban`',      'Ban multiple users by a list of IDs'],
        ['`/massban`',    'Ban multiple users at once'],
        ['`/kick`',       'Kick a user from the server'],
        ['`/masskick`',   'Kick multiple members at once'],
        ['`/strip`',      'Remove all removable roles from a user'],
        ['`/deafen`',     'Server-deafen a member in voice'],
        ['`/undeafen`',   'Remove server-deafen from a member'],
        ['`/announce`',   'Send an announcement to a channel'],
        ['`/appeal`',     'Look up or manage a punishment appeal'],
      ],
      // Page 2 — Mutes, Timeouts & Warns
      [
        ['`/mute`',           'Mute a user via the Muted role'],
        ['`/unmute`',         'Unmute a user'],
        ['`/tempmute`',       'Temporarily mute a user'],
        ['`/timeout`',        'Apply a Discord native timeout to a user'],
        ['`/untimeout`',      'Remove a Discord native timeout'],
        ['`/warn`',           'Issue a warning to a user'],
        ['`/warnings`',       'List all warnings for a user'],
        ['`/clearwarnings`',  'Clear all warnings for a user'],
        ['`/warnpunishment`', 'Set auto-punishments at warn thresholds'],
        ['`/temprole`',       'Assign a role to a user temporarily'],
        ['`/slowmode`',       'Set slowmode on a channel'],
        ['`/lock`',           'Lock a channel from @everyone'],
        ['`/unlock`',         'Unlock a previously locked channel'],
        ['`/dehoist`',        'Remove hoisting characters from a nickname'],
      ],
      // Page 3 — Cases, Notes & History
      [
        ['`/case`',         'View a moderation case by ID'],
        ['`/reason`',       'Update the reason of a moderation case'],
        ['`/history`',      'View moderation history for a user'],
        ['`/addnote`',      'Add a staff note to a user\'s record'],
        ['`/note`',         'Add a quick moderator note to a user'],
        ['`/viewnotes`',    'View all staff notes for a user'],
        ['`/deletenote`',   'Delete a specific staff note by ID'],
        ['`/watchlist`',    'Add or remove a user from the watchlist'],
        ['`/modstats`',     'Show moderation action stats for a moderator'],
        ['`/auditlog`',     'View the server audit log'],
        ['`/moduserinfo`',  'View moderation-focused info about a user'],
        ['`/purge`',        'Bulk delete messages in a channel'],
        ['`/pinmessage`',   'Pin a message in a channel'],
        ['`/unpinmessage`', 'Unpin a message in a channel'],
      ],
      // Page 4 — Roles & Voice
      [
        ['`/role`',        'Add or remove a role from a user'],
        ['`/nick`',        "Change a member's nickname"],
        ['`/voiceban`',    'Ban a user from voice channels'],
        ['`/unvoiceban`',  'Remove a voice channel ban from a user'],
        ['`/voicemute`',   'Server-mute a member in voice'],
        ['`/voiceunmute`', 'Remove server-mute from a member'],
        ['`/voicekick`',   'Disconnect a user from a voice channel'],
      ],
    ],
  },

  security: {
    get emoji() { return em('shield'); },
    title: 'Security Commands',
    description: 'Automated protection and threat management for your server.',
    pages: [
      // Page 1 — Automod & Filters
      [
        ['`/automod`',         'Configure core automod settings'],
        ['`/antihoisting`',    'Toggle anti-hoisting nickname enforcement'],
        ['`/antinuke`',        'Configure anti-nuke protection settings'],
        ['`/antimod`',         'Protect against moderator-targeted attacks'],
        ['`/stickymute`',      'Re-apply mute if a muted user rejoins'],
        ['`/tokenblocker`',    'Block messages containing bot tokens or API keys'],
        ['`/wordfilter`',      'Add or remove words from the custom word filter'],
        ['`/zalgofilter`',     'Toggle zalgo/unicode abuse character filtering'],
        ['`/phishingfilter`',  'Toggle anti-phishing link detection'],
        ['`/filter`',          'Configure content filter settings'],
        ['`/linkfilter`',      'Configure link filtering settings'],
        ['`/linkman`',         'Manage link whitelist and blacklist'],
        ['`/regex`',           'Add or manage custom regex filter patterns'],
        ['`/channelsec`',      'Configure per-channel security settings'],
        ['`/trustedroles`',    'Configure roles trusted to bypass automod'],
      ],
      // Page 2 — Spam, Flood & Abuse
      [
        ['`/spam`',             'Configure antispam detection settings'],
        ['`/flood`',            'Configure flood detection settings'],
        ['`/abuse`',            'Configure message abuse detection'],
        ['`/massmention`',      'Configure mass mention detection thresholds'],
        ['`/dupemessage`',      'Detect and delete repeated identical messages'],
        ['`/imagespam`',        'Configure image/attachment spam detection'],
        ['`/ghostping`',        'Configure ghost ping detection and logging'],
        ['`/mentionlog`',       'Set a channel to log mass mention events'],
        ['`/mutebypass`',       'Detect and re-mute users who bypass mute'],
        ['`/newaccountfilter`', 'Set minimum account age to join or chat'],
        ['`/burstdetect`',      'Detect and log message burst events'],
        ['`/alt`',              'Manage alt account detection settings'],
        ['`/captchagate`',      'Toggle captcha gate for new members'],
        ['`/botprotect`',       'Prevent bots from being added without approval'],
        ['`/honeypot`',         'Set up a honeypot channel to detect suspicious users'],
      ],
      // Page 3 — Raid & Lockdown
      [
        ['`/raid`',          'Configure raid detection and response'],
        ['`/lockdown`',      'Lock or unlock all channels server-wide'],
        ['`/softlockdown`',  'Apply soft lockdown (slowmode only, no full lock)'],
        ['`/channellock`',   'Lock or unlock specific channels during an incident'],
        ['`/emergency`',     'Trigger an emergency server lockdown'],
        ['`/quarantine`',    'Quarantine a user during an active raid'],
        ['`/joinsecurity`',  'Configure join screening and security settings'],
        ['`/join`',          'Configure join event logging'],
      ],
      // Page 4 — Verification & Alts
      [
        ['`/verify`',       'Manage member verification and bypass'],
        ['`/verification`', 'Set the server Discord verification level'],
        ['`/scanuser`',     'Scan a user for suspicious activity flags'],
        ['`/flag`',         'Flag or unflag a user as suspicious'],
        ['`/alertchannel`', 'Set a dedicated security alert channel'],
      ],
      // Page 5 — Flags, Threats & Nuke
      [
        ['`/nuke`',          'Nuke a channel (clone it, purging all messages)'],
        ['`/channeltools`',  'Channel utility and management tools'],
        ['`/emergency`',     'Trigger an emergency server lockdown'],
        ['`/flag`',          'Manually flag or unflag a user as suspicious'],
        ['`/scanuser`',      'Scan a user for suspicious activity flags'],
      ],
      // Page 6 — Permissions & Audit
      [
        ['`/perms`',          'View or check permissions for a role or user'],
        ['`/permmanage`',     'Manage channel permission overrides'],
        ['`/dangerousperms`', 'List all roles with dangerous permissions'],
      ],
      // Page 7 — Advanced Protection
      [
        ['`/abuse`',            'Configure message abuse detection'],
        ['`/burstdetect`',      'Detect and log rapid burst events'],
        ['`/stickymute`',       'Re-apply mute if a muted user rejoins'],
        ['`/mutebypass`',       'Detect and re-mute users who bypass mute'],
        ['`/botprotect`',       'Prevent bots being added without approval'],
        ['`/newaccountfilter`', 'Set minimum account age to join or chat'],
        ['`/antinuke`',         'Configure anti-nuke protection settings'],
      ],
    ],
  },

  utility: {
    get emoji() { return em('wrench'); },
    title: 'Utility Commands',
    description: 'General-purpose tools.',
    pages: [[
      ['`b!avatar`',      'Show a user\'s avatar'],
      ['`b!botinfo`',     'Show information about the bot'],
      ['`b!channelinfo`', 'Show information about a channel'],
      ['`b!firstmessage`','Jump to the first message in a channel'],
      ['`/help`',        'Show this help menu'],
      ['`b!inviteinfo`',  'Show info about a Discord invite link'],
      ['`b!membercount`', 'Show the server member count'],
      ['`b!permissions`', 'Check permissions for a user or role'],
      ['`b!ping`',        'Check bot and API latency'],
      ['`b!poll`',        'Create a quick poll'],
      ['`b!remind`',      'Set a reminder'],
      ['`b!roleinfo`',    'Show information about a role'],
      ['`b!serverinfo`',  'Show information about the server'],
      ['`b!snipe`',       'Show the last deleted message in a channel'],
      ['`b!uptime`',      'Show how long the bot has been online'],
      ['`b!userinfo`',    'Show information about a user'],
    ]],
  },

  config: {
    get emoji() { return em('gear'); },
    title: 'Configuration Commands',
    description: 'Configure bot settings and roles. Commands use b!. Some settings are prefix-only (e.g. b!setlanguage).',
    pages: [
      [
        ['`b!autorole`',     'Manage the auto-role assigned to new members'],
        ['`b!blacklist`',    'Manage the server blacklist (users, links, words)'],
        ['`b!whitelist`',    'Manage the automod whitelist (users, roles, channels)'],
        ['`b!resetconfig`',  'Reset all bot settings to defaults'],
        ['`b!setadminrole`', 'Set the administrator role'],
        ['`b!setmodrole`',   'Set the moderator role'],
        ['`b!setmutedrole`', 'Set the role used for muting members'],
        ['`b!setprefix`',    'Set the bot command prefix for this server'],
        ['`b!settings`',     'View all current bot and automod settings'],
        ['`b!verification`', 'Configure button-based member verification'],
      ],
      [
        ['`b!setappealchannel`', 'Set the channel where appeals are posted'],
        ['`b!setdmnotify`',      'Toggle DM notifications for moderation actions'],
        ['`b!setjailrole`',      'Set the jail role used for temporary punishments'],
        ['`b!setlanguage`',      'Set the server language'],
        ['`b!setlogchannel`',    'Set the default log channel for the server'],
        ['`b!togglemodules`',    'Enable or disable specific bot modules'],
        ['`b!viewconfig`',       'View current server configuration'],
      ],
    ],
  },

  logging: {
    get emoji() { return em('clipboard'); },
    title: 'Logging Commands',
    description: 'Configure log channels and event tracking. Commands use b!. Some log setters are prefix-only (e.g. b!setbanlog).',
    pages: [
      [
        ['`b!setlog`',        'Set the main moderation log channel'],
        ['`b!setmodlog`',     'Set the moderation action log channel'],
        ['`b!setautomodlog`', 'Set a dedicated automod log channel'],
        ['`b!setjoinlog`',    'Set the member join log channel'],
        ['`b!setleavelog`',   'Set the member leave log channel'],
        ['`b!ignorechannel`', 'Ignore or un-ignore a channel from automod scanning'],
      ],
      [
        ['`b!clearlog`',      'Clear a specific log type'],
        ['`b!setbanlog`',     'Set the channel used for ban logs'],
        ['`b!setboostlog`',   'Set the channel used for boost logs'],
        ['`b!setembedlog`',   'Set the channel used for embed/content logs'],
        ['`b!setinvitelog`',  'Set the channel used for invite logs'],
        ['`b!setmessagelog`', 'Set the channel used for message logs'],
        ['`b!setrolelog`',    'Set the channel used for role change logs'],
        ['`b!setserverlog`',  'Set the channel used for general server logs'],
        ['`b!settimeoutlog`', 'Set the channel used for timeout logs'],
        ['`b!setvoicelog`',   'Set the channel used for voice logs'],
        ['`b!viewlogs`',      'View all configured log channels for this server'],
      ],
    ],
  },

};

// ─── Dropdown menu options ─────────────────────────────────────────────────────
function getMenuOptions() {
  return [
    { label: 'Home',       value: 'home',       description: 'Back to the main overview',           emoji: eid('home')      },
    { label: 'Moderation', value: 'moderation', description: 'Ban, kick, mute, warn, purge & more', emoji: eid('hammer')    },
    { label: 'Security',   value: 'security',   description: 'Automod, antiraid, filters & more',   emoji: eid('shield')    },
    { label: 'Logging',    value: 'logging',    description: 'Log channels and event tracking',      emoji: eid('clipboard') },
    { label: 'Utility',    value: 'utility',    description: 'Ping, help & general tools',           emoji: eid('wrench')    },
    { label: 'Config',     value: 'config',     description: 'Automod settings, roles & bot setup', emoji: eid('gear')      },
  ];
}

module.exports = { E, em, eid, CATEGORY_COUNTS, CATEGORY_DETAILS, PAGE_TOPICS, getMenuOptions };
