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
    const { artStyle, styleIntensity, imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Extract base64 data
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    
    const stylePrompts = {
      paper: {
        subtle: "subtle paper art style with light newspaper textures",
        moderate: "expressive paper art style with vibrant black line art on textured newspaper background",
        strong: "bold paper art style with strong black line illustrations",
        extreme: "extreme paper art style with intense black ink illustrations"
      }
    };

    const currentStyle = stylePrompts[artStyle]?.[styleIntensity] || stylePrompts.paper.moderate;

    const requestBody = {
      contents: [{
        parts: [
          {
            text: `Analyze this image and create a detailed description for generating a ${currentStyle}. Focus on the main subject, features, and composition. Format as: "A ${styleIntensity} ${artStyle} art style illustration of..."`
          },
          {
            inline_data: {
              mime_type: "image/png",
              data: base64Data
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 200
      }
    };

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const description = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!description) {
      throw new Error('No description generated from Gemini API');
    }

    res.status(200).json({ description: description.trim() });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: error.message });
  }
}