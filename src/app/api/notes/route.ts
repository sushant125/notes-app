import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';

export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error in GET /api/notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const note = await Note.create(body);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/notes:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
} 