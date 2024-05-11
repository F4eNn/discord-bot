import { EmbedBuilder, Message, bold, quote } from 'discord.js';

export const warnComponent = (msg: Message) => {
	const warn = new EmbedBuilder()
		.setColor('#FFA500')
		.setAuthor({ name: `${msg.author.username} został ostrzeżony 💢`, iconURL: msg.author.avatarURL() || undefined })
		.setDescription(`${bold('Powód:')} zabronione słowo`);
	return warn;
};

export const sendNotificationToUser = (content: Message['content'], bannedWord: string) => {
	const sendToUser = new EmbedBuilder()
		.setColor('#c30010')
		.setTitle('Moderation Alert')
		.setFields({ name: 'Banned word', value: quote(bannedWord) }, { name: 'Message', value: content });
	return sendToUser;
};
