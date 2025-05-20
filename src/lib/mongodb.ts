import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;
console.log('MongoDB URI found:', MONGODB_URI.substring(0, 20) + '...'); // Only log first 20 chars for security

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: Cached | undefined;
}

let cached: Cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 10000,
    };

    console.log('Creating new MongoDB connection with options:', {
      maxPoolSize: opts.maxPoolSize,
      minPoolSize: opts.minPoolSize,
      serverSelectionTimeoutMS: opts.serverSelectionTimeoutMS,
      socketTimeoutMS: opts.socketTimeoutMS,
    });

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error in connectDB:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB; 