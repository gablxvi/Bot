const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType } = require("discord.js");
const { relativeTime } = require("util-stunks");
const moment = require("moment");
const sqlite3 = require("sqlite3").verbose();
moment.locale("pt-BR");
require("moment-duration-format");


const db = new sqlite3.Database('./viewCounts.db');

db.run("CREATE TABLE IF NOT EXISTS views (userId TEXT PRIMARY KEY, count INTEGER)");

module.exports = {
    name: "ui",
    description: "Obtém as informações de um usuário",
    options: [
        {
            name: "usuário",
            description: "O usuário do qual você quer obter as informações",
            type: ApplicationCommandOptionType.User,
        },
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser("usuário") || interaction.user;
        const fullUser = await client.users.fetch(user.id, { force: true });


        const userId = fullUser.id;

        db.get("SELECT count FROM views WHERE userId = ?", [userId], async (err, row) => {
            if (err) {
                console.error(err);
                return;
            }

            let count = row ? row.count : 0;
            count += 1;

            if (row) {
                db.run("UPDATE views SET count = ? WHERE userId = ?", [count, userId]);
            } else {
                db.run("INSERT INTO views (userId, count) VALUES (?, ?)", [userId, count]);
            }

            try {
                const response = await fetch(`https://apiattt.discloud.app/user/${fullUser.id}`).then((res) => res.json());

                const flags = {
                    staff: "<:bluestaff:1209242149955182602>",
                    active_developer: "<:Active_Dev_Badge:1257551748814606437>",
                    early_supporter: "<:pig_midia:1195048779045421217>",
                    verified_developer: "<:devrico:1199429680701382687>",
                    certified_moderator: "<:mod:1220488564299534459>",
                    bug_hunter_level_1: "<:Bug_Hunter:1209242436920942724>",
                    bug_hunter_level_2: "<:Bug_Hunter_level2:1209242461805871134>",
                    partner: "<:partner:1209242240442957894>",
                    legacy_username: "<:legacyUsername:1199429746384175287>",
                    hypesquad_house_1: "<:Icon_Hypesquad_Bravery:1257551750211309591>",
                    hypesquad_house_2: "<:HypeSquad_Brilliance:1199429640691925085>",
                    hypesquad_house_3: "<:HypeSquad_Balance:1199429555941806232>",
                    hypesquad: "<:HypeSquad_Event:1199429425398296577>",
                    premium: "<a:legitgod:1257552180227997756>",
                    guild_booster_lvl1: "<:boost:1257551747455516773>",
                    guild_booster_lvl2: "<a:pinkr_boost:1257550721365053480>",
                    guild_booster_lvl3: "<:lvl3:1192181362980040795>",
                    guild_booster_lvl4: "<:lvl4:1192181374166237264>",
                    guild_booster_lvl5: "<:lvl5:1192181384530378762>",
                    guild_booster_lvl6: "<:lvl6:1192181396278624386>",
                    guild_booster_lvl7: "<:lvl7:1192181406445600910>",
                    guild_booster_lvl8: "<:lvl8:1192181416402886656>",
                    guild_booster_lvl9: "<:lvl9:1192181428025298965>",
                };

                const userflags = response.badges || [];
                let badges = userflags.map((flag) => flags[flag]).join("") || "Sem Badges";

                const embed = new EmbedBuilder()
                    .setTimestamp()
                    .setAuthor({ name: `${fullUser.username} (${response.user.global_name || 'Sem Nome Global'})`, iconURL: fullUser.displayAvatarURL() })
                    .setColor("#2b2d31")
                    .setThumbnail(fullUser.displayAvatarURL())
                    .setFooter({
                        text: `Comando executado por: ${interaction.user.username} | Visualizações: ${count}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    });

                embed.addFields({ name: "<:membros_bots:1257550423548629105> Tag\n", value: `\`\`\`@${response.user.username}\`\`\`\n\n`, inline: true });
                embed.addFields({ name: "<:idd:1257550479404171346> ID\n", value: `\`\`\`${response.user.id}\`\`\`\n\n`, inline: true });
                embed.addFields({ name: "<a:nitroboost68:1257550594647003247> Insígnias\n", value: `${badges}`, inline: true });
                embed.addFields({ name: "<:idd:1257550479404171346> Conta criada em\n", value: `<t:${parseInt(fullUser.createdTimestamp / 1000)}:F>`, inline: false });

                if (response.nitro && response.nitro.assinatura && response.nitro.assinatura !== "Tipo de Nitro desconhecido") {
                    embed.addFields({ name: "<a:Wumpus_Nitro:1257550652398243863> Assinante Nitro desde\n", value: `<t:${moment(response.nitro.nitroDate).unix()}:F>`, inline: false });
                }

                if (response.boost?.boostDate) {
                    embed.addFields({ name: "<:fogueteboost:1257550792844640286> Impulsionando desde\n", value: `<t:${moment(response.boost.boostDate).unix()}:F>`, inline: false });
                    embed.addFields({ name: `${flags[response.boost.boost]} **Boost Atual**\n`, value: `${relativeTime(new Date(response.boost.boostDate).getTime(), { removeMs: true })}\n\n`, inline: true });
                }

                if (response.boost?.nextBoostDate < "MaxLevelReached") {
                    embed.addFields({ name: `${flags[response.boost.nextBoost]} **Boost Up**\n`, value: `${relativeTime(new Date(response.boost.nextBoostDate).getTime(), { removeMs: true })}\n\n`, inline: true });
                }

                const row = new ActionRowBuilder();

                if (response.user.avatarUrl) {
                    const avatarButton = new ButtonBuilder()
                        .setLabel("Avatar")
                        .setURL(response.user.avatarUrl)
                        .setStyle(ButtonStyle.Link);
                    row.addComponents(avatarButton);
                }

                if (response.user.bannerUrl) {
                    const bannerButton = new ButtonBuilder()
                        .setLabel("Banner")
                        .setURL(response.user.bannerUrl)
                        .setStyle(ButtonStyle.Link);
                    row.addComponents(bannerButton);
                }

                if (response.user.legacy_username) {
                    const legacyButton = new ButtonBuilder()
                        .setLabel(`Originalmente: ${response.user.legacy_username}`)
                        .setCustomId("legacy")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true);
                    row.addComponents(legacyButton);
                }

                if (response.user.global_name) {
                    const nameButton = new ButtonBuilder()
                        .setLabel(`Nome Exibido: ${response.user.global_name}`)
                        .setCustomId("name")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true);
                    row.addComponents(nameButton);
                }

                if (response.user_profile?.pronouns) {
                    const pronounsButton = new ButtonBuilder()
                        .setLabel(`Pronomes: ${response.user_profile.pronouns}`)
                        .setCustomId("pronouns")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true);
                    row.addComponents(pronounsButton);
                }

                await interaction.reply({ embeds: [embed], components: [row], ephemeral: false });
            } catch (error) {
                console.error("Erro ao buscar as informações do usuário:", error);
                await interaction.reply({ content: "Ocorreu um erro ao buscar as informações do usuário. Por favor, tente novamente mais tarde.", ephemeral: true });
            }
        });
    },
};
