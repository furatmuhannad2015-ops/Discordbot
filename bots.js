const { ButtonStyle } = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const db = require(`pro.db`);

module.exports = {
    name: 'bots',
    run: async (client, message, args) => {
        const Data = db.get(`Allow - Command bots = [ ${message.guild.id} ]`);
        const allowedRole = message.guild.roles.cache.get(Data);
        const isAuthorAllowed = message.member.roles.cache.has(allowedRole?.id);

        if (!isAuthorAllowed && message.author.id !== Data && !message.member.permissions.has('Administrator')) {
            return message.react('❌');
        }

        const Color = db.get(`Guild_Color = ${message.guild.id}`) || message.guild.members.me.displayHexColor || `#000000`;
        if (!Color) return;

        let arr = new Array();
        let esp = message.guild.members.cache.filter(e => e.user.bot);
        esp.forEach(member => {
            const joinedAt = member.joinedAt.toLocaleDateString(); // Get the join date of the bot
            arr.push(`${member} - Joined at: ${joinedAt}`);
        });

        let embed = new EmbedBuilder()
            .setTitle(`قائمة بوتات السيرفر`)
            .setDescription(`${arr.join(`\n`)}`)
            .setTimestamp()
            .setColor(`${Color || message.guild.members.me.displayHexColor || `#000000`}`);

        const button = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel('طرد')
            .setCustomId('kick_bots');

        const row = new ActionRowBuilder()
            .addComponents(button);

        const botMessage = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = (interaction) => interaction.customId === 'kick_bots' && interaction.user.id === message.author.id;
        const collector = botMessage.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (interaction) => {
            // Kick all bots logic here
            esp.forEach(member => {
                if (member.user.bot) {
                    member.kick();
                }
            });
            await interaction.reply({ content: '**يتم طرد كل البوتات الآن .**', ephemeral: true });
        });

        collector.on('end', () => {
            row.components[0].setDisabled(true);
            botMessage.edit({ components: [row] });
        });
    }
};
