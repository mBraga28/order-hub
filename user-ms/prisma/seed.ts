import prisma from "./utils/prisma-logger";

async function main() {
    const user1 = await prisma.user.create({
      data: {
        email: 'marco@mts.com',
        firstName: 'Marco',
        lastName: 'Braga',
        password: '1234567',
      },
    });
    const user2 = await prisma.user.create({
      data: {
        email: 'antonio@mts.com',
        firstName: 'Antonio',
        lastName: 'Araujo',
        password: '7654321',
      },
    });
    console.log(user1 && user2 ? 'Users created!' : 'Users not created!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());