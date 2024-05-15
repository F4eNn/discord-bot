import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { bold, ChatInputCommandInteraction } from 'discord.js';
import prisma from '../../config/prisma-client';

export const handleDailyCommand = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.inGuild()) {
        interaction.reply('The daily command can be usend only on server');
        return;
    }
    const dailyAmount = 500;
    const currentDate = new Date();

    const guildName = interaction.guild?.name || 'None';
    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    try {
        const guild = await prisma.guild.findUnique({
            where: { guildId },
            include: { user: { where: { userId } } },
        });

        if (guild && !!guild.user.length) {
            const userId = guild.user[0].id;
            const userDaily = await prisma.daily.findUnique({ where: { userId } });

            if (!userDaily) {
                throw new Error("Something bad happened, Couldn't fetch user daily");
            }
            const isAlreadyClaimed = userDaily?.lastDaily.toDateString() === new Date().toDateString();

            if (isAlreadyClaimed) {
                return interaction.reply({
                    content: 'You have already claimed your daily reward, come back tomorrow ',
                    ephemeral: true,
                });
            }

            const updatedUserDailt = await prisma.daily.update({
                where: { userId },
                data: { balance: userDaily.balance + dailyAmount, lastDaily: currentDate },
            });
            await interaction.reply({
                content: `Your account has been credited with ${bold(
                    String(dailyAmount)
                )} daily points and your current score is now ${bold(String(updatedUserDailt.balance))} `,
                ephemeral: true,
            });
            
        } else {
            const createdUser = await prisma.user.create({
                data: { userId, guildId, name: interaction.user.username, guildName },
            });
            const daily = await prisma.daily.create({
                data: { balance: dailyAmount, lastDaily: currentDate, userId: createdUser.id },
            });
            interaction.reply('dodano');
        }
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return console.log(error.message);
        }
        console.log(error);
    }
};
