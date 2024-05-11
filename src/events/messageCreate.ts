import type { Message } from 'discord.js';
import { isProfanityWord } from '../utils/filterWords.js';

export const handleMessageCreate = async (msg: Message) => {
	const content = msg.content;
	const words = content.split(' ');
	await isProfanityWord({ msg, content }, words);
};
