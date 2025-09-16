module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
      // Mobile Devices
      '9:16': { width: 1080, height: 1920 },
      '16:9': { width: 1920, height: 1080 },
      '9:18': { width: 1080, height: 2160 },
      
      // Tablets
      '3:4': { width: 1536, height: 2048 },
      '4:3': { width: 2048, height: 1536 },
      
      // Desktop/Laptop
      '16:10': { width: 1920, height: 1200 },
      '21:9': { width: 2560, height: 1080 },
      '1:1': { width: 1024, height: 1024 },
      
      // 4K Resolutions
      '16:9-4k': { width: 3840, height: 2160 },
      '21:9-4k': { width: 5120, height: 2160 },
      '9:16-4k': { width: 2160, height: 3840 },
      
      // Watch & Small Devices
      '1:1-watch': { width: 312, height: 312 },
      'watch-round': { width: 360, height: 360 },
      
      // Social Media
      'instagram': { width: 1080, height: 1080 },
      'instagram-story': { width: 1080, height: 1920 },
      'youtube-thumb': { width: 1280, height: 720 }
    };

    const { width, height } = dimensions[aspectRatio] || dimensions['1:1'];
    
    // Generate image URL using Pollinations AI
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Date.now()}&nologo=true&enhance=true&model=flux`;
    
    res.json({ imageUrl, prompt });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error.message });
  }
};