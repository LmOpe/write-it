import { PrismaClient } from "../../generated/prisma";
import { createClient } from "redis";

export let prisma: PrismaClient = new PrismaClient()

export let redisClient: any;

if (process.env.ENV === 'local') {
    redisClient = createClient({
        url: process.env.REDIS_URL
    });
} else {
    redisClient = createClient({
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
        }
    });
}


export const initServices = async () => {
    redisClient.on('error', (err: any) => {
        console.error('Redis Client Error', err);
    }
    );
    await redisClient.connect();
    console.log("Redis client connected successfully");
};