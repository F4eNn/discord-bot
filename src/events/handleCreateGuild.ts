import { Guild } from 'discord.js';
import prisma from '../config/prisma-client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const handleCreateGuild = async (guild: Guild) => {
    try {
        const isGuildExist = await prisma.guild.findUnique({
            where: { guildId: guild.id },
        });
        if (isGuildExist) return;

        await prisma.guild.create({
            data: { guildId: guild.id, name: guild.name },
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return console.log(`Guild creation failed ${error.message} ${error.code}`);
        }
        console.log(error);
    }
};
