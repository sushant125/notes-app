const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/notes-app');
    console.log('Successfully connected to MongoDB.');
    
    // Create a test collection
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: 'Hello MongoDB!' });
    console.log('Successfully inserted test document.');
    
    // Clean up
    await testCollection.deleteOne({ test: 'Hello MongoDB!' });
    console.log('Successfully cleaned up test document.');
    
    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

testConnection(); 