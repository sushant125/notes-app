# Notes App

A simple note-taking application built with Next.js, MongoDB, and Tailwind CSS.

## Features

- Create and view notes
- Responsive design
- MongoDB integration
- API routes for data persistence

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or Atlas)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add your environment variables in the Vercel dashboard
5. Deploy!

## Environment Variables

- `MONGODB_URI`: Your MongoDB connection string

## Tech Stack

- Next.js 14
- React 18
- MongoDB
- Tailwind CSS
- TypeScript 