import type { Message, PartialMessage } from 'discord.js';
import { isProfanityWord } from '../utils/filterWords.js';

export const handleMessageUpdate = async (msg: Message | PartialMessage) => {
	const content = msg.reactions.message.content;
	const words = content.split(' ');
	await isProfanityWord({ msg, content }, words);
};
