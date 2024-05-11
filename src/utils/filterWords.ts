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

export const isProfanityWord = async (
	{ msg, content }: { msg: Message | PartialMessage; content: Message['content'] },
	words: Message['content'][]
) => {
	for (const word of words) {
		if (beadWordsArr.includes(word.toLowerCase()) && word) {
			const bannedWord = word;
			if (msg.guildId === process.env.DISCORD_GUILDID) {
				try {
					await msg.delete();
				} catch (error) {
					console.log(error);
				}
			}
			const profanityWarning = warnComponent(msg);
			const notification = sendNotificationToUser(content, bannedWord);

			msg.channel.send({ embeds: [profanityWarning] });
			msg.author!.send({ embeds: [notification] });
		}
	}
};
