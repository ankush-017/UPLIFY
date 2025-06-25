import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000, // 10 seconds timeout
  }
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');
  } 
  catch (error) {
    console.error('Redis connection failed:', error);
  }
};
export { redisClient, connectRedis };