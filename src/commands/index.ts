import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { bold, Interaction } from 'discord.js';
import axios from 'axios';
import prisma from '../config/prisma-client';
import { handleDailyCommand } from './handlers/daily';


export const chatCommandInteraction = async (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;

	switch (interaction.commandName) {
		case 'meme':
			await interaction.deferReply();
			const { data, status } = await axios.get('https://meme-api.com/gimm');
			if (status !== 200) {
				return interaction.editReply('Nie udało się załadować mema');
			}
			await interaction.editReply({ files: [data.url] });
			break;
		case 'ping':
			interaction.reply('pong');
			break;
		case 'hey':
			interaction.reply('Hej :)');
			break;
		case 'daily':
			handleDailyCommand(interaction);
			break;
	}
};
