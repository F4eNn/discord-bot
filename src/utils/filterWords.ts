import 'dotenv/config';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { sendNotificationToUser, warnComponent } from '../components/embed.js';

import type { Message, PartialMessage } from 'discord.js';

const fileToPath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileToPath);
const txtBadWordsPath = path.join(__dirname, '..', 'txt', 'bad-words.txt');
const readBeadWords = fs.readFileSync(txtBadWordsPath, 'utf-8');
const beadWordsArr = readBeadWords.split(/\r?\n/);

export const checkProfanity = async (words: Message['content'][]) => {
    for (const word of words) {
        if (beadWordsArr.includes(word.toLowerCase()) && word) {
            const bannedWord = word;
            return bannedWord;
        }
    }
    return null;
};
