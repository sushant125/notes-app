'use client';

import { useState, useEffect } from 'react';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <p className="text-lg">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Notes</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full p-2 border rounded"
            required
            disabled={submitting}
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            className="w-full p-2 border rounded h-32"
            required
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          className={`bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={submitting}
        >
          {submitting ? 'Adding Note...' : 'Add Note'}
        </button>
      </form>

      <div className="grid gap-4">
        {notes.map((note) => (
          <div key={note._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 