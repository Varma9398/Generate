const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https:"],
    },
  },
}));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Multer configuration for file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Gemini AI configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Authentication endpoints
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({ success: true, user: data.user });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, user: data.user });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Image analysis endpoint
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    const { artStyle, styleIntensity } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Convert uploaded file to base64
    const imageBase64 = req.file.buffer.toString('base64');
    
    const stylePrompts = {
      paper: {
        subtle: "subtle paper art style with light newspaper textures and minimal paint splashes",
        moderate: "expressive paper art style with vibrant black line art on textured newspaper background, enhanced with splashes of bright blue and orange paint",
        strong: "bold paper art style with strong black line illustrations on heavily textured newspaper collage, dramatic splashes of bright blue and orange paint",
        extreme: "extreme paper art style with intense black ink illustrations on complex newspaper collage background, explosive splashes of bright blue, orange, and additional vibrant colors"
      }
    };

    const currentStyle = stylePrompts[artStyle]?.[styleIntensity] || stylePrompts.paper.moderate;

    const requestBody = {
      contents: [{
        parts: [
          {
            text: `Analyze this image and describe the subject in detail for creating a ${currentStyle}. Focus on:
            1. The main subject (person, object, scene)
            2. Key facial features, expressions, and characteristics
            3. Clothing, accessories, or notable elements
            4. The overall mood and composition

            Create a detailed description that will be used to generate a ${artStyle} style image. The composition should fuse realism and abstract expressionism.

            Format your response as a single descriptive paragraph suitable for image generation, starting with "A ${styleIntensity} ${artStyle} art style illustration of"`
          },
          {
            inline_data: {
              mime_type: req.file.mimetype,
              data: imageBase64
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

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const description = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!description) {
      throw new Error('No description generated from Gemini API');
    }

    res.json({ description: description.trim() });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
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
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;