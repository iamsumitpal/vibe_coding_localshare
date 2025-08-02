# Render Deployment Guide for Local Share

## 🚀 Quick Deploy to Render

### Step 1: Prepare Your Repository
1. **Push your code** to GitHub
2. **Ensure all files** are committed:
   - `index.html`
   - `server.js`
   - `package.json`
   - `render.yaml`
   - `manifest.json`
   - `sw.js`

### Step 2: Deploy to Render
1. **Go to [render.com](https://render.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name**: `local-share`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:
- `NODE_ENV`: `production`
- `PORT`: `10000`

### Step 4: Update WebSocket URL
After deployment, update the WebSocket URL in `index.html`:
```javascript
const SIGNALING_SERVERS = [
    'wss://your-app-name.onrender.com',  // Replace with your actual Render URL
    'ws://localhost:4000',
    'ws://192.168.1.1:4000',
    'ws://192.168.0.1:4000',
    'wss://socketsbay.com/wss/v2/1/demo/'
];
```

### Step 5: Test Your Deployment
1. **Visit your Render URL**: `https://your-app-name.onrender.com`
2. **Open multiple tabs** to test file sharing
3. **Share the URL** with others on the internet

## 🔧 Troubleshooting

### Common Issues:
- **Build fails**: Check that all dependencies are in `package.json`
- **WebSocket connection fails**: Ensure the URL is updated correctly
- **Port issues**: Render automatically sets the PORT environment variable

### Render Free Tier Limitations:
- **Sleep after inactivity**: Service may sleep after 15 minutes of inactivity
- **Cold start**: First request after sleep may be slow
- **Bandwidth**: Limited bandwidth for file transfers

## 🌐 Features Available on Render:
- ✅ **Cross-device discovery**: Users can find each other from anywhere
- ✅ **Multiple file transfer**: Select and transfer multiple files
- ✅ **Real-time progress**: Live progress bars
- ✅ **Auto-download**: Files download automatically
- ✅ **Modern UI**: Responsive design works on all devices

## 📱 Usage:
1. **Share your Render URL** with others
2. **Open the app** in any modern browser
3. **Select files** to share
4. **Click on a user** to initiate transfer
5. **Accept/Reject** the transfer
6. **Files auto-download** when complete

Your Local Share app will now be accessible worldwide! 🌍 