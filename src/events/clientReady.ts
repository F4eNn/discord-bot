import chalk from 'chalk';
import { Client } from 'discord.js';

const log = console.log;

export const handleClientReady = async (c: Client) => {
    if (c.user) {
        log(chalk.green.bold.underline(c.user.username, chalk.reset('is ready to go ✅')));
    } else {
        throw new Error('Client not found');
    }
};
