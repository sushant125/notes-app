import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Log environment variable status (without exposing the actual URI)
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return NextResponse.json(
        {
          status: 'error',
          message: 'MongoDB URI is not configured',
          error: 'Environment variable MONGODB_URI is missing'
        },
        { status: 500 }
      );
    }

    console.log('MongoDB URI is configured');
    const db = await connectDB();
    
    if (!db.connection.db) {
      console.error('Database connection object is null');
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection not established',
          error: 'Connection object is null'
        },
        { status: 500 }
      );
    }
    
    console.log('Attempting to get server status...');
    const status = await db.connection.db.admin().serverStatus();
    console.log('Server status retrieved successfully');
    
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to MongoDB',
      details: {
        version: status.version,
        uptime: status.uptime,
        connections: status.connections,
      }
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: errorMessage,
        stack: errorStack,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 