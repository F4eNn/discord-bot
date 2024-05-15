import 'dotenv/config';
import { REST, Routes, RESTPutAPIApplicationCommandsJSONBody, RESTPutAPIApplicationCommandsResult } from 'discord.js';
import chalk from 'chalk';
import { COMMANDS } from '../config/enums';

const log = console.log;
const { DISCORD_TOKEN, DISCORD_GUILD_ID, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_GUILD_ID || !DISCORD_CLIENT_ID) {
    throw new Error('Missing Eviroment variables');
}

const commands: RESTPutAPIApplicationCommandsJSONBody = [
    { name: COMMANDS.Greeting, description: 'Reples with hey' },
    { name: COMMANDS.Meme, description: 'Generates a random meme' },
    {
        name: COMMANDS.Daily,
        description: 'Adds daily points to your experiance level',
    },
];

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
    try {
        const data = (await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
            body: commands,
        })) as RESTPutAPIApplicationCommandsResult;
        log(chalk.white.bgGreen(`Successfully register ${data.length} application (/) commands.`));
    } catch (error) {
        log(chalk.white.bgRed('[ERROR] The command registration failed'));
    }
})();
