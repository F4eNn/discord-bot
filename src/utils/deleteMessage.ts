import { Message, PartialMessage } from 'discord.js';

export const deleteMessage = async (msg: Message | PartialMessage) => {
    try {
        await msg.delete();
    } catch (error) {
        console.log(error);
    }
};
