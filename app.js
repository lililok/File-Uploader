import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

await prisma.message.create({
   data: {
      content: 'Hello, world!',
      authorId: 1
   }
})

const messages = await prisma.message.findMany();
