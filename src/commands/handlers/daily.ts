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

	const member = interaction.user;
	const memberIds = {
		userId: interaction.user.id,
		guildId: interaction.guildId,
	};

	try {
		const res = await prisma.user.findUnique({
			where: { ...memberIds },
			include: { daily: true },
		});

		const isUserExistsAndClaimedReward = res && res.daily?.lastDaily.toDateString() === new Date().toDateString();

		if (isUserExistsAndClaimedReward) {
			return interaction.reply({
				content: 'You have already claimed your daily reward, come back tomorrow ',
				ephemeral: true,
			});
		}
		const newUser = await prisma.user.upsert({
			where: { userId: interaction.user.id },
			update: res
				? {
						daily: {
							upsert: {
								where: { userId: memberIds.userId },
								update: { balance: res.daily!.balance + dailyAmount, lastDaily: currentDate },
								create: { balance: dailyAmount },
							},
						},
				  }
				: {},
			create: { ...memberIds, name: member.displayName, daily: { create: { balance: dailyAmount } } },
			include: { daily: true },
		});

		await interaction.reply({
			content: `Your account has been credited with ${bold(
				String(dailyAmount)
			)} daily points and your current score is now ${bold(String(newUser.daily?.balance))} `,
			ephemeral: true,
		});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log(error.message);
		}
		console.log(error);
	}
};
