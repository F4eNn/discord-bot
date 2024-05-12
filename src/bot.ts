import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { handleClientReady, handleMessageCreate, handleMessageUpdate } from './events/index';
import { chatCommandInteraction } from './commands';

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
	throw new Error('Missing Eviroment variables');
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildModeration,
	],
});
client.once(Events.ClientReady, handleClientReady);
client.on(Events.MessageCreate, handleMessageCreate);
client.on(Events.MessageUpdate, handleMessageUpdate);

client.on(Events.InteractionCreate, chatCommandInteraction);

client.login(DISCORD_TOKEN);
