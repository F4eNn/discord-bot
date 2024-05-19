import type { Message, PartialMessage } from 'discord.js';
import { checkProfanity } from '../utils/filterWords.js';
import { deleteMessage } from '../utils/deleteMessage.js';
import { sendWarning } from '../utils/sendWarning.js';

export const handleMessageUpdate = async (msg: Message | PartialMessage) => {
    const content = msg.reactions.message.content;
    const words = content.split(' ');

    const bannedWord = await checkProfanity(words);

    if (bannedWord) {
        await deleteMessage(msg);
        sendWarning(msg, { content: msg.content ? msg.content: 'Failed to attach your message' , bannedWord });
    }
};
