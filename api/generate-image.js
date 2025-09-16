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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, aspectRatio } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const dimensions = {
      '9:16': { width: 1080, height: 1920 },
      '16:9': { width: 1920, height: 1080 },
      '1:1': { width: 1024, height: 1024 },
      '3:4': { width: 1536, height: 2048 },
      '4:3': { width: 2048, height: 1536 }
    };

    const { width, height } = dimensions[aspectRatio] || dimensions['1:1'];
    
    // Generate image URL using Pollinations AI
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Date.now()}&nologo=true&enhance=true&model=flux`;
    
    res.status(200).json({ imageUrl, prompt });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error.message });
  }
}