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
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Check if directory exists
    try {
      await fs.access(imagesDir);
    } catch (error) {
      return res.json({ images: [] });
    }
    
    // Read directory contents
    const files = await fs.readdir(imagesDir);
    
    // Filter for image files and extract numbers
    const imageNumbers = files
      .filter(file => file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
      .map(file => {
        const match = file.match(/^(\d+)\./); // Extract number from filename like "001.png"
        return match ? match[1] : null;
      })
      .filter(num => num !== null)
      .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically
    
    res.json({ images: imageNumbers });
  } catch (error) {
    console.error('Error reading images directory:', error);
    res.status(500).json({ error: 'Failed to read images directory' });
  }
}