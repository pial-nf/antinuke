// Files
const { Embeds } = require(`./files/embeds`);
const { bot } = require('./files/settings');
const prefix = bot.prefix;

// Packages
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const chalk = require('chalk');
module.exports = client;
/*
// Hosting
const keepAlive = require('./files/server');
keepAlive();
*/

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Handler 
require("./handler")(client);
client.login(process.env.token).catch((e) => {
  console.log(`${chalk.red(`\n{!} :: Failed to log in.. Please check if your bot token is valid or it has all intents enabled..`)}`)
  setTimeout(() => {
    process.exit();
  }, 5000)
});

// Database
const Database = require("@replit/database");
const db = new Database();


// Anti Channel Create
client.on("channelCreate", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${channel.guild.id}`);

  if (executor.id === channel.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  channel.delete();
  channel.guild.members.ban(executor.id, { 
    reason: "Anti Channel Create"
  });
}); 


// Anti Channel Delete
client.on("channelDelete", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;
  const trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${channel.guild.id}`);

  if (executor.id === channel.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  channel.clone();
  channel.guild.members.ban(executor.id, { 
    reason: "Anti Channel Delete"
  });
});   


// Anti Role Create
client.on("roleCreate", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: "ROLE_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor, createdTimestamp } = logs;

  const trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${role.guild.id}`);

  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);
  
  if (executor.id === role.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  if (log !== event) return;

  role.delete();
  role.guild.members.ban(executor.id, { 
    reason: "Anti Role Create"
  });
});    

// Anti Role Delete
client.on("roleDelete", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: "ROLE_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${role.guild.id}`);
  
  if (executor.id === role.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  role.guild.roles.create({
    name: role.name,
    color: role.color,
  });
  role.guild.members.ban(executor.id, { 
    reason: "Anti Role Delete"
  });
});

// Anti Emoji Create
client.on("emojiCreate", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({
    limit: 2,
    type: "EMOJI_CREATE"
  });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${emoji.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${emoji.guild.id}`);
  
  if (executor.id === emoji.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
emoji.guild.members.ban(executor.id, { 
    reason: "Anti Emoji Create"
  });
});


// Anti Emoji Delete
client.on("emojiDelete", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({
    limit: 2,
    type: "EMOJI_DELETE"
  });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${emoji.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${emoji.guild.id}`);
  
  if (executor.id === emoji.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
emoji.guild.members.ban(executor.id, { 
    reason: "Anti Emoji Delete"
  });
});


// Anti Member Ban
client.on("guildBanAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_BAN_ADD" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
member.guild.members.kick(executor.id, { 
    reason: "Anti Member Ban"
  });
  member.guild.members.unban(target.id, {
    reason: "Anti Member Ban"
  })
});

// Anti Member Kick
client.on("guildMemberRemove", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_KICK" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
member.guild.members.ban(executor.id, { 
    reason: "Anti Member Kick"
  });
});


// Anti Bot Add
client.on("guildMemberAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({
    limit: 2, 
    type: "BOT_ADD" 
  });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;


member.guild.members.ban(executor.id, { 
    reason: "Anti Bot Add"
  });
  member.guild.members.ban(target.id, { 
    reason: "illegal bot"
  });
});


// Anti Role Update
client.on("roleUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({
    limit: 2,
    type: "ROLE_UPDATE"
  });
  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === o.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  n.setPermissions(o.permissions);
  n.guild.members.ban(executor.id, {
    reason: "Anti Role Update"
  })
});


// Anti Channel Update
client.on("channelUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({
    limit: 2,
    type: "CHANNEL_UPDATE"
  });
  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === o.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldName = o.name;
  const newName = n.name;
  
n.guild.members.ban(executor.id, {
  reason: "Anti Channel Update"
});

  if (oldName !== newName) {
    await n.edit({
      name: oldName
    })
  }
  
  if (n.isText()) {
    const oldTopic = o.topic;
    const newTopic = n.topic;
    if (oldTopic !== newTopic) {
      await n.setTopic(oldTopic)
    }
  }
});


// Anti Server Update
client.on("guildUpdate", async (o,n) => {
  const auditLogs = await n.fetchAuditLogs({
    limit: 3,
    type: "GUILD_UPDATE",
  });
  const logs = auditLogs.entries.first();

  const { executor } = logs;
  
  const trusted = await db.get(`trust${n.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.id}`);
  
  if (executor.id === o.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldIcon = o.iconURL();
  const oldName = o.name;
  
  const newIcon = n.iconURL(); 
  const newName = n.name;

  if (oldName !== newName) {
    await n.setName(oldName);
  }

  if (oldIcon !== newIcon) {
    await n.setIcon(oldIcon);
  }
  
n.members.ban(executor.id, {
    reason: "Anti Guild Update"
  });
});

// #1
process.on("unhandledRejection", (reason, promise) => {
   console.log("Unhandled Rejection at: " + promise)
   console.log("Reason: " + reason)
});

// #2
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
});

// #3
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});

// #4
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
