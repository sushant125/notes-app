import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';

export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const note = await Note.create(body);
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
} 