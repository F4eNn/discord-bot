import { Interaction } from 'discord.js';
import { COMMANDS } from '../config/enums';
import { handleGreetingCommand, handleDailyCommand } from './handlers';

export const chatCommandInteraction = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case COMMANDS.Hello:
            handleGreetingCommand(interaction);
            break;
        case COMMANDS.Meme:
            // await interaction.deferReply();
            // const { data, status } = await axios.get('https://meme-api.com/gimm');
            // if (status !== 200) {
            // 	return interaction.editReply('Nie udało się załadować mema');
            // }
            // await interaction.editReply({ files: [data.url] });
            break;
        case COMMANDS.Daily:
            handleDailyCommand(interaction);
            break;
    }
};
