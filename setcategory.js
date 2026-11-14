const checkOwner = require(`${process.cwd()}/utils/owner`);
const { Client, Collection, AttachmentBuilder, WebhookClient, GatewayIntentBits, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, MessageModal, Role, ModalBuilder, TextInputBuilder } = require("discord.js");
const {owners } = require(`${process.cwd()}/config`);
const db = require(`pro.db`)

module.exports = {
    name: "setcategory",
    description: "A simple ping command.",
    run: async (Client, Message) => {
        if (Message.author.bot) return;
        if(!checkOwner(Message)) return Message.react('❌');
        if (!Message.guild) return;
        const Cat = Message.content.split(` `)[1];
        if (!Cat) return Message.reply({ content: `**يرجى ارفاق ايدي الكاتيغوري .**` })
        Message.react("✅").then(() => {
          db.set(`Cat = [${Message.guild.id}]`, Cat)
        })
    }
}