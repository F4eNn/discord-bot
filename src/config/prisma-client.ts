import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
    var prisma: PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({ errorFormat: 'pretty' });
    console.log('Production: Created DB connection.');
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({ errorFormat: 'pretty' });
        console.log('Development: Created DB connection.');
    }
    prisma = global.prisma;
}

export default prisma;
