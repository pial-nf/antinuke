const { MessageEmbed } = require("discord.js");
const client = require("../../index");
const settings = require('../../files/settings');
const prefix = settings.bot.prefix;
const chalk = require("chalk");

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) {
      const error = new MessageEmbed()
        .setDescription("***Wrong Command***\n﹒*this is not a valid command.*\n﹒*try ;help to see a list of commands.*")
        .setColor("PURPLE")
      message.channel.send({ embeds: [error] });
    }
  try {
    await command.run(client, message, args)
  } catch (e) {
      console.log(`${chalk.red(`{!} :: Invalid Command Ran! :: ${message.content.split(" ")[0]}\n${chalk.magentaBright(`{!} :: Ran By ${message.author.tag} in ${message.guild.name}\n`)}`)}`)
    }
});