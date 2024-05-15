import { ChatInputCommandInteraction } from 'discord.js';

export const handleGreetingCommand = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;
};
