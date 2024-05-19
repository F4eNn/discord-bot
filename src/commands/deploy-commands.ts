import 'dotenv/config';
import {
    REST,
    Routes,
    RESTPutAPIApplicationCommandsJSONBody,
    RESTPutAPIApplicationCommandsResult,
    DiscordAPIError,
} from 'discord.js';
import chalk from 'chalk';
import { COMMANDS } from '../config/enums';

const log = console.log;
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error('Missing Eviroment variables');
}

const commands: RESTPutAPIApplicationCommandsJSONBody = [
    { name: COMMANDS.Hello, description: 'Reples with Hi' },
    { name: COMMANDS.Meme, description: 'Generates a random meme' },
    {
        name: COMMANDS.Daily,
        description: 'Adds daily points to your experience level.',
    },
];

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
    try {
        const data = (await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
            body: commands,
        })) as RESTPutAPIApplicationCommandsResult;
        log(chalk.white.bgGreen(`Successfully register ${data.length} application (/) commands.`));
    } catch (error) {
        if (error instanceof DiscordAPIError) {
            return log(chalk.white.bgRed(`[ERROR] The command registration failed ${error.message}`));
        }
        log(chalk.white.bgRed('[ERROR] The command registration failed'));
    }
})();
