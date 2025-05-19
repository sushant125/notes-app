import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this note.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this note.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema); 