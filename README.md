<div align="center">

![Balius Console](https://github.com/user-attachments/assets/a819fd2e-549f-4c45-b330-ebeb2fbc0057)

# Balius

**Security & Moderation Bot**

*Node v24.11.0 &nbsp;•&nbsp; discord.js v14 &nbsp;•&nbsp; sql.js*

[![Discord](https://img.shields.io/badge/discord.js-v14-5865F2?style=flat&logo=discord&logoColor=white)](https://discord.js.org)
[![Node](https://img.shields.io/badge/node-v24.11.0-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![SQLite](https://img.shields.io/badge/database-SQLite-003B57?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org)

</div>

---

## 🌐 Dashboard

![Dashboard Landing](https://github.com/user-attachments/assets/902a4556-4500-4099-afa9-bfaad473f54c)

Balius ships with a full web dashboard — manage every setting without typing a single command.

- Login with Discord OAuth2
- Manage all your servers from one place
- Toggle automod rules, set log channels, configure verification & rank cards
- Real-time security alerts and audit logs

---

## ⚡ Features

| | Feature | Description |
|---|---|---|
| 🛡️ | **Anti-Nuke** | Detects mass channel deletes, role wipes & ban waves — stops attacks within seconds |
| 🚫 | **Anti-Raid** | Mass-join detection with automatic server lockdown |
| ⚙️ | **Automod Suite** | Anti-spam, caps, links, phishing, mentions, emoji, zalgo, alts & more |
| 🔒 | **Anti-Phishing** | Removes known phishing & scam URLs before members ever see them |
| ✅ | **Verification** | Button-based member verification with configurable channels and roles |
| 📋 | **Mod Logging** | Every action logged with moderator, context, and timestamp |
| 🔍 | **Threat Scanning** | Scan users, detect ghost pings, flag suspicious accounts |
| 🔑 | **Permission Auditing** | Detect dangerous permissions, unauthorized bots, and privilege escalation |

---

## 📦 Commands

> **148 total commands** across 5 categories — slash (`/`) and prefix (`b!`) supported.

### 🔨 Moderation — 49 commands

| Command | Description |
|---|---|
| `ban` | Permanently ban a member |
| `forceban` | Ban a user even if not in server |
| `hackban` | Ban by user ID without them being present |
| `idban` | Ban via raw ID |
| `massban` | Ban multiple users at once |
| `tempban` | Ban a member for a set duration |
| `softban` | Ban then immediately unban to purge messages |
| `unban` | Remove a ban from a user |
| `kick` | Kick a member from the server |
| `masskick` | Kick multiple members at once |
| `mute` | Mute a member in all channels |
| `unmute` | Remove mute from a member |
| `tempmute` | Mute a member for a set duration |
| `timeout` | Apply Discord native timeout |
| `untimeout` | Remove a timeout |
| `deafen` | Server-deafen a member in voice |
| `undeafen` | Remove server deafen |
| `voiceban` | Ban a member from all voice channels |
| `unvoiceban` | Remove a voice ban |
| `voicekick` | Kick a member from their current voice channel |
| `voicemute` | Server-mute a member in voice |
| `voiceunmute` | Remove a voice mute |
| `warn` | Issue a formal warning to a member |
| `warnings` | View all warnings for a member |
| `clearwarnings` | Clear all warnings for a member |
| `warnpunishment` | Configure auto-punishment thresholds for warnings |
| `case` | View or edit a moderation case |
| `reason` | Update the reason on an existing case |
| `history` | View full moderation history for a user |
| `modstats` | Show moderator action statistics |
| `note` | Add a private note to a user |
| `addnote` | Add an additional note to a user |
| `viewnotes` | View all notes on a user |
| `deletenote` | Delete a specific note |
| `watchlist` | Add a user to the watchlist for monitoring |
| `purge` | Bulk-delete messages in a channel |
| `lock` | Lock a channel so members can't send messages |
| `unlock` | Unlock a previously locked channel |
| `slowmode` | Set slowmode on a channel |
| `nick` | Change a member's nickname |
| `dehoist` | Remove hoisting characters from nicknames |
| `strip` | Strip all roles from a member |
| `role` | Add or remove a role from a member |
| `temprole` | Assign a role for a set duration |
| `announce` | Send an announcement embed to a channel |
| `pinmessage` | Pin a message in the current channel |
| `unpinmessage` | Unpin a message |
| `appeal` | View or manage ban appeals |
| `auditlog` | View the server's Discord audit log |
| `userinfo` | Display detailed info about a member |

### 🛡️ Security — 65 commands

| Command | Description |
|---|---|
| `antinuke` | Configure anti-nuke protection settings |
| `antimod` | Restrict which roles can use mod commands |
| `antihoisting` | Auto-dehoist members with hoisting characters |
| `raid` | Configure anti-raid protection |
| `raidcontrol` | Manually trigger or lift raid mode |
| `lockdown` | Put the entire server into lockdown |
| `softlockdown` | Partial lockdown — restrict new members only |
| `emergency` | Trigger emergency mode — maximum restrictions |
| `joinsecurity` | Configure join security (min account age, etc.) |
| `newaccountfilter` | Filter accounts below a minimum age |
| `alt` | Configure alt account detection |
| `captchagate` | Enable CAPTCHA-style verification gate |
| `verification` | Configure member verification system |
| `verify` | Manually verify a member |
| `unverifiedlist` | View all currently unverified members |
| `honeypot` | Set up honeypot channels to catch raiders |
| `burstdetect` | Detect and act on message bursts |
| `flood` | Configure flood protection thresholds |
| `spam` | Configure anti-spam settings |
| `dupemessage` | Block duplicate messages in rapid succession |
| `imagespam` | Limit image-only spam |
| `massmention` | Configure mass mention protection |
| `ghostping` | Log and act on ghost pings |
| `automod` | Configure the full automod suite |
| `filter` | Manage the word/phrase filter |
| `wordfilter` | Add or remove words from the filter |
| `importfilter` | Import a filter list in bulk |
| `filteredlog` | View recent filter hits |
| `regex` | Add regex-based content filters |
| `linkfilter` | Configure link filtering rules |
| `linkman` | Manage link whitelist/blacklist |
| `invitewhitelist` | Whitelist specific Discord invite links |
| `invitelog` | Log all Discord invites posted |
| `phishingfilter` | Configure anti-phishing detection |
| `zalgofilter` | Block zalgo/corrupted text |
| `tokenblocker` | Block Discord bot token patterns |
| `channellock` | Lock down specific channels |
| `channelsec` | Configure per-channel security rules |
| `channeltools` | Utility tools for channel management |
| `slowmodechannel` | Apply slowmode to channels automatically |
| `mentionlog` | Log mass mention events |
| `quarantine` | Quarantine a suspicious member |
| `flag` | Flag a user for elevated monitoring |
| `abuse` | Detect and act on permission abuse |
| `adminaudit` | Audit admin-level actions |
| `botaudit` | Audit bot additions and removals |
| `botprotect` | Restrict who can add bots to the server |
| `dangerousperms` | Detect roles with dangerous permissions |
| `permmanage` | Manage role permission overrides |
| `perms` | View effective permissions for a user |
| `integritycheck` | Run a full server security integrity check |
| `securityalert` | Configure security alert channel and thresholds |
| `securityreport` | Generate a full security report |
| `threatlog` | View recent threat detections |
| `incident` | Log and manage security incidents |
| `scanuser` | Deep-scan a user for threat indicators |
| `alertchannel` | Set where security alerts are sent |
| `mutebypass` | Detect and prevent mute bypass attempts |
| `stickymute` | Re-apply mute if a member rejoins |
| `rolesave` | Save and restore member roles on rejoin |
| `trustedroles` | Configure roles trusted by security systems |
| `removebypass` | Remove bypass flags from a member |
| `backupsettings` | Backup all security settings |
| `nuke` | Nuke a channel (clone and delete) |
| `nukeadmin` | Admin-level nuke with full audit trail |
| `join` | Configure new member join behaviour |

### 📋 Logging — 17 commands

| Command | Description |
|---|---|
| `setlog` | Set the main logging channel |
| `setmodlog` | Set the moderation log channel |
| `setbanlog` | Set the ban/unban log channel |
| `setjoinlog` | Set the member join log channel |
| `setleavelog` | Set the member leave log channel |
| `setmessagelog` | Set the message edit/delete log channel |
| `setvoicelog` | Set the voice state log channel |
| `setrolelog` | Set the role change log channel |
| `setserverlog` | Set the server settings log channel |
| `settimeoutlog` | Set the timeout log channel |
| `setinvitelog` | Set the invite tracking log channel |
| `setboostlog` | Set the boost event log channel |
| `setautomodlog` | Set the automod action log channel |
| `setembedlog` | Set a custom embed format for logs |
| `ignorechannel` | Exclude a channel from all logging |
| `clearlog` | Clear all logging channel settings |
| `viewlogs` | View all currently configured log channels |

### 🔧 Utility — 16 commands

| Command | Description |
|---|---|
| `ping` | Check bot latency and API response time |
| `uptime` | Display how long the bot has been online |
| `botinfo` | Show bot version, stats, and system info |
| `serverinfo` | Display detailed server information |
| `userinfo` | Display detailed user information |
| `channelinfo` | Display info about a channel |
| `roleinfo` | Display info about a role |
| `membercount` | Show member count breakdown |
| `avatar` | Display a user's avatar in full size |
| `permissions` | Show a user's permissions in a channel |
| `help` | Browse all commands by category |
| `poll` | Create a reaction poll |
| `snipe` | Recover the last deleted message in a channel |
| `firstmessage` | Jump to the first message in a channel |
| `inviteinfo` | Show details about a Discord invite link |
| `remind` | Set a reminder for yourself |

### ⚙️ Config — 17 commands

| Command | Description |
|---|---|
| `settings` | View all current bot settings |
| `viewconfig` | View the full server configuration |
| `setprefix` | Change the bot's prefix |
| `setmodrole` | Set the moderator role |
| `setadminrole` | Set the administrator role |
| `setmutedrole` | Set the muted role |
| `setjailrole` | Set the jail/quarantine role |
| `setlogchannel` | Set the default log channel |
| `setappealchannel` | Set the ban appeal channel |
| `setdmnotify` | Toggle DM notifications for mod actions |
| `setlanguage` | Set the bot's response language |
| `autorole` | Configure roles assigned on member join |
| `whitelist` | Manage the server whitelist |
| `blacklist` | Manage the server blacklist |
| `togglemodules` | Enable or disable feature modules |
| `resetconfig` | Reset all settings to default |
| `verification` | Configure the verification module |

---

## 🖥️ Console

![Console Preview](https://github.com/user-attachments/assets/2a627607-8073-4be7-aa55-e8546792e4a6)

---

## 🚀 Setup

**1. Install dependencies**
```
npm install
```

**2. Create a `.env` file**
```env
TOKEN=your_bot_token
CLIENT_ID=your_client_id
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_oauth_secret
DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback
SESSION_SECRET=any_random_string
DASHBOARD_PORT=3000
```

**3. Deploy slash commands**
```
npm run deploy
```
> Global commands propagate to all servers within ~1 hour.

**4. Start the bot**
```
npm start
```

**5. Open the dashboard** → `http://localhost:3000`

---

## 🏗️ Architecture

- **Multi-guild** — all data fully isolated per `guild_id` in a single SQLite database
- **Global commands** — one deploy covers every server the bot is in
- **Data persistence** — guild settings are kept even if the bot leaves a server
- **Dual command system** — every command works as both `/slash` and `b!prefix`
- **Dashboard** — Express + Discord OAuth2, runs alongside the bot in the same process
- **Emoji sync** — custom emojis uploaded once and ID-cached to `data/emoji-cache.json`, surviving restarts

---

## 📁 Project Structure

```
balius/
├── commands/
│   ├── config/        ← 17 configuration commands
│   ├── logging/       ← 17 log channel commands
│   ├── moderation/    ← 49 moderation commands
│   ├── security/      ← 65 security commands
│   └── utility/       ← 16 utility commands
├── dashboard/
│   ├── public/        ← index.html + logo
│   └── server.js      ← Express + OAuth2
├── events/            ← Discord.js event handlers
├── utils/             ← Automod handlers, database, helpers
├── balius/            ← Custom emoji PNG assets
├── data/              ← SQLite DB + emoji ID cache
├── index.js           ← Entry point
└── deploy-commands.js
```

---

<div align="center">

Built with [discord.js v14](https://discord.js.org) &nbsp;•&nbsp; Powered by SQLite

</div>
