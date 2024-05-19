import type { Message } from 'discord.js';
import { checkProfanity } from '../utils/filterWords.js';
import { deleteMessage } from '../utils/deleteMessage.js';
import { sendWarning } from '../utils/sendWarning.js';

export const handleMessageCreate = async (msg: Message) => {
    const content = msg.content;
    const words = content.split(' ');
    const bannedWord = await checkProfanity(words);

    if (bannedWord) {
        await deleteMessage(msg);
        sendWarning(msg, { content: msg.content, bannedWord });
    }
};
