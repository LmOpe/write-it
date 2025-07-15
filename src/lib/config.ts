import { PrismaClient } from "../../generated/prisma";
import { createClient } from "redis";

export let prisma: PrismaClient = new PrismaClient()

export const redisClient = createClient({
    url: process.env.REDIS_URL
});

export const initServices = async () => {
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }
    );
    await redisClient.connect();
    console.log("Redis client connected successfully");
};