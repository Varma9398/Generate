# Cloud AI Image Generator - Secure Backend

A secure web application for AI-powered image style transformation with a Node.js backend to protect API credentials.

## 🔒 Security Features

- **API Key Protection**: All sensitive API keys are stored securely on the backend
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Rate Limiting**: Prevents API abuse with configurable rate limits
- **Input Validation**: Validates file uploads and request data
- **Helmet Security**: Adds security headers to protect against common vulnerabilities

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Gemini AI API key
- Supabase account and credentials

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Copy the `.env` file and update with your actual credentials:
   ```bash
   # Replace with your actual API keys
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   SUPABASE_URL=your_actual_supabase_url_here
   SUPABASE_ANON_KEY=your_actual_supabase_anon_key_here
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Serve the frontend:**
   
   Open your HTML files using a local server. You can use:
   - Live Server extension in VS Code
   - Python: `python -m http.server 5500`
   - Node.js: `npx serve .`

## 🏗️ Architecture

```
Frontend (HTML/JS) → Backend API (Node.js/Express) → External APIs (Gemini, Pollinations)
                                ↓
                          Supabase (Auth)
```

### Backend Endpoints

- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signup` - User registration  
- `POST /api/analyze-image` - Image analysis using Gemini AI
- `POST /api/generate-image` - Image generation
- `GET /health` - Health check

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `GEMINI_API_KEY` | Your Gemini AI API key | Yes |
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No |

### Security Configuration

The backend includes several security measures:

- **Helmet**: Adds security headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents API abuse
- **File Upload Limits**: 10MB max file size
- **Input Validation**: Validates all incoming requests

## 📝 API Usage

### Image Generation Flow

1. **Upload Image**: Frontend uploads image to `/api/analyze-image`
2. **Analysis**: Backend analyzes image using Gemini AI
3. **Generation**: Backend generates styled image using the analysis
4. **Response**: Returns generated image URL to frontend

### Example Frontend Usage

```javascript
// Analyze uploaded image
const formData = new FormData();
formData.append('image', imageBlob);
formData.append('artStyle', 'paper');
formData.append('styleIntensity', 'moderate');

const analysisResponse = await fetch('http://localhost:3000/api/analyze-image', {
  method: 'POST',
  body: formData
});

const { description } = await analysisResponse.json();

// Generate styled image
const generationResponse = await fetch('http://localhost:3000/api/generate-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: description,
    aspectRatio: '1:1'
  })
});

const { imageUrl } = await generationResponse.json();
```

## 🔐 Security Best Practices

1. **Never expose API keys in frontend code**
2. **Use HTTPS in production**
3. **Regularly rotate API keys**
4. **Monitor API usage and costs**
5. **Implement proper error handling**
6. **Use environment variables for all secrets**

## 🚨 Important Notes

- **Environment Variables**: Make sure to update the `.env` file with your actual API credentials
- **CORS Configuration**: Update `ALLOWED_ORIGINS` for your production domains
- **Rate Limiting**: Adjust rate limits based on your usage needs
- **File Uploads**: The backend accepts image files up to 10MB

## 🐛 Troubleshooting

### Common Issues

1. **API Key Errors**: Ensure your Gemini API key is valid and has sufficient quota
2. **CORS Errors**: Check that your frontend origin is in the `ALLOWED_ORIGINS` list
3. **File Upload Errors**: Verify file size is under 10MB and is a valid image format
4. **Rate Limit Errors**: Wait for the rate limit window to reset or adjust limits

### Health Check

Visit `http://localhost:3000/health` to verify the server is running correctly.

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Configure proper HTTPS
4. Set up monitoring and logging
5. Configure firewall rules
6. Use a reverse proxy (nginx/Apache)

## 🔄 Development

For development, use:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.