import 'dotenv/config';

import { Client, GatewayIntentBits, Events } from 'discord.js';
import { handleClientReady, handleMessageCreate, handleMessageUpdate } from './events/index.js';

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
	throw new Error('Missing Env variables');
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildModeration,
	],
});
client.on(Events.ClientReady, handleClientReady);
client.on(Events.MessageCreate, handleMessageCreate);
client.on(Events.MessageUpdate, handleMessageUpdate);

client.login(DISCORD_TOKEN);
