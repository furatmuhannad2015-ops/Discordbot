const checkOwner = require(`${process.cwd()}/utils/owner`);
const { Client, Collection, AttachmentBuilder, WebhookClient, GatewayIntentBits, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, MessageModal, Role, ModalBuilder, TextInputBuilder } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)

module.exports = {
    name: "imaget",
    description: "A simple ping command.",
    run: async (Client, Message) => {
        if(!checkOwner(Message)) return Message.react('❌');
        if (Message.author.bot) return;
        if (!Message.guild) return;
        const Url = Message.content.split(` `).slice(1).join(` `);
        if (!Url) return Message.reply({ content: `**يرجى ارفاق رابط الصوره .**` })
        Message.react("✅").then(() => {
            db.set(`Image = [${Message.guild.id}]`, Url)
        })
    }
}