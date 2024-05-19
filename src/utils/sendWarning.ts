import { Message, PartialMessage } from 'discord.js';
import { sendNotificationToUser, warnComponent } from '../components/embed';

export const sendWarning = (
    msg: Message | PartialMessage,
    content: { bannedWord: string ; content: Message['content'] }
) => {
    const profanityWarning = warnComponent(msg as Message);
    const sendDM = sendNotificationToUser({ ...content });

    msg.channel.send({ embeds: [profanityWarning] });
    msg.author!.send({ embeds: [sendDM] });
};
