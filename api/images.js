import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For Vercel, we'll return a static list since file system access is limited
    // In production, you would typically use a database or external storage
    const staticImages = [];
    
    // Generate a list of potential image numbers (you can customize this)
    for (let i = 1; i <= 50; i++) {
      const num = i.toString().padStart(3, '0');
      staticImages.push(num);
    }
    
    res.status(200).json({ images: staticImages });
  } catch (error) {
    console.error('Error in images API:', error);
    res.status(500).json({ error: 'Failed to get images' });
  }
}