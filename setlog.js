const checkOwner = require(`${process.cwd()}/utils/owner`);
const { Client, Collection, AttachmentBuilder, WebhookClient, GatewayIntentBits, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, MessageModal, Role, ModalBuilder, TextInputBuilder } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)

module.exports = {
    name: "ticlog",
    description: "A simple ping command.",
    run: async (Client, Message) => {
        if (Message.author.bot) return;
        if(!checkOwner(Message)) return Message.react('❌');
        if (!Message.guild) return;
        const Channel = Message.mentions.channels.first() || Message.content.split(` `)[1];
        if (!Channel) return Message.reply({ content: `**يرجى ارفاق منشن الشات او الايدي .**` })
        Message.react("✅").then(() => {
          db.set(`Channel = [${Message.guild.id}]`, Channel)
        })
    }
}