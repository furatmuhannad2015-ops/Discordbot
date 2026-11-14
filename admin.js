const { ButtonStyle, ChannelType } = require("discord.js");
const { Client, Collection, AttachmentBuilder, WebhookClient, GatewayIntentBits, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, MessageModal, Role, ModalBuilder, TextInputBuilder } = require("discord.js");
const db = require(`pro.db`)
module.exports = {
  name: "admin",
  aliases: ["تيكت"], // Add the alias here
    description: "A simple ping command.",
    run: async (Client, Message) => {
        
const B = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`DD`)
      .setStyle(ButtonStyle.Danger)
      .setEmoji(`🗑`),
    new ButtonBuilder()
      .setCustomId(`D`)
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(`➕`),
  )
        const Image = db.get(`Image = [${Message.guild.id}]`)
        const Channel = db.get(`Channel = [${Message.guild.id}]`)
        const Role = db.get(`Role = [${Message.guild.id}]`)
        const Cat = db.get(`Cat = [${Message.guild.id}]`)
        const Parent = Message.guild.channels.cache.find(C => C.id === Cat);
        if (db.get(`member${Message.author.id}`) === true) return Message.reply({ content: `**عذرًا لا يمكنك فتح تذكرة لوجود تذكرة خاصة بك .**`, ephemeral: true })
        await Message.guild.channels.create({ name: `ticket ${Message.author.username}`, type: ChannelType.GuildText,
          parent: Parent.id,
          permissionOverwrites: [
            {
              id: Message.author.id,
              allow: ['ViewChannel', 'SendMessages'],
            },
            {
              id: `${Role}`,
              allow: ['ViewChannel', 'SendMessages'],
            },
            {
              id: Message.guild.roles.everyone,
              deny: ['ViewChannel'],
            },
          ],
        }).then(async Cahnnels => {
          db.set(`channel${Cahnnels.id}`, Message.author.id)
          db.set(`member${Message.author.id}`, true)
          await Message.react(`✅`)
          Cahnnels.send({ files: [Image], components: [B], content: `${Message.author} | <@&${Role}>` })
        })
    }
}











