import { ChatInputCommandInteraction } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const dirname = fileURLToPath(import.meta.url);
const greetingsPath = path.join(dirname, '../../../', 'txt/greetings.txt');

const readGreetings = fs.readFileSync(greetingsPath, 'utf-8');
const greetingsArr = readGreetings.split(/\r?\n/);

export const handleGreetingCommand = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const userInvoker = interaction.user;
    const greeting = greetingsArr[Math.floor(Math.random() * (greetingsArr.length -1))];
     console.log(greeting)
    interaction.reply(`${greeting} ${userInvoker}`);
};
