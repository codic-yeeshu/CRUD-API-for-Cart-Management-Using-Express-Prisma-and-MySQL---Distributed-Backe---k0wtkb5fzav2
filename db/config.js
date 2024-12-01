const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(`Connected to db`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { prisma, connectDB };
