# Local Share

A complete, self-contained peer-to-peer file sharing web application that works entirely in the browser using WebRTC technology. No backend server, databases, or API keys required.

## Features

- **Multiple File Support**: Select and transfer multiple files at once
- **Local Network Discovery**: Discover users across different browsers and devices on the same network
- **File Selection**: Select any file type and size from your device
- **Direct P2P Transfer**: Files transfer directly between browsers using WebRTC
- **Transfer Confirmation**: Recipients can accept or reject incoming file transfers
- **Real-time Progress**: Live progress bars for both sender and recipient
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Progressive Web App**: Installable as a native app
- **Auto-download**: Files automatically download when transfer completes

## How to Use

### Option 1: Local Network Discovery (Recommended)
1. **Start the Server**: Run `npm install && npm start` to start the WebSocket server
2. **Open the Application**: Open `index.html` in your web browser
3. **Wait for Connection**: The app will automatically connect to the local server and generate a unique username
4. **Select Files**: Click "Choose Files" to select one or more files to share
5. **Choose Recipient**: Click on a user from the "Online Users" list to initiate the transfer
6. **Accept/Reject**: The recipient will see a popup asking for permission to accept the files
7. **Auto-download**: Files automatically download when transfer completes

### Option 2: Same Browser Discovery (Fallback)
1. **Open the Application**: Simply open `index.html` in your web browser
2. **Multiple Tabs**: Open multiple browser tabs/windows with the app
3. **Select Files**: Click "Choose Files" to select one or more files to share
4. **Choose Recipient**: Click on a user from the "Online Users" list to initiate the transfer
5. **Accept/Reject**: The recipient will see a popup asking for permission to accept the files
6. **Auto-download**: Files automatically download when transfer completes

## Technical Details

### Architecture
- **Network Discovery**: Uses WebSocket server for peer discovery across local network
- **Fallback Discovery**: Uses localStorage for peer discovery on the same device/browser
- **WebRTC**: Direct peer-to-peer communication for file transfers
- **STUN Server**: Google's public STUN server for NAT traversal
- **File Chunking**: Files are split into 64KB chunks for reliable transfer
- **Multiple Files**: Sequential transfer of multiple files with progress tracking

### Technologies Used
- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Modern, responsive styling
- **Vanilla JavaScript**: No frameworks or dependencies
- **WebRTC**: Peer-to-peer communication
- **WebSocket**: Network peer discovery and signaling
- **localStorage**: Fallback peer discovery and signaling
- **Node.js**: WebSocket server for network discovery

### File Transfer Process
1. **Discovery**: Users connect to WebSocket server or use localStorage fallback
2. **Offer**: Sender creates WebRTC offer and sends it to recipient
3. **Acceptance**: Recipient accepts the offer and creates answer
4. **Data Channel**: Reliable data channel is established between peers
5. **Transfer**: Files are chunked and sent sequentially through the data channel
6. **Reassembly**: Recipient reassembles chunks into the original files
7. **Auto-download**: Files automatically download when transfer completes

## Browser Compatibility

This application works in all modern browsers that support:
- WebRTC (Chrome, Firefox, Safari, Edge)
- WebSocket API
- File API
- Blob API

## Security Features

- **No File Storage**: Files are never stored on any server
- **Direct Transfer**: All file data goes directly between browsers
- **User Consent**: Recipients must explicitly accept file transfers
- **Local Network**: Designed for use on trusted local networks

## Limitations

- **Local Network**: Requires both peers to be on the same local network
- **Browser Support**: Requires modern browsers with WebRTC support
- **File Size**: Limited by browser memory and WebRTC data channel limits
- **Server Required**: For network discovery, requires running the WebSocket server

### GitHub Pages Limitations

- **Static Only**: GitHub Pages only serves static files, no server-side code
- **Same-Browser Only**: Network discovery across devices doesn't work
- **Multiple Tabs**: Use multiple browser tabs for testing on GitHub Pages
- **PWA Works**: Progressive Web App features work perfectly

## Getting Started

### Option 1: Cloud Hosting (Recommended for Public Access)
1. **Deploy to Render** (Easiest):
   - Connect your GitHub repo to [render.com](https://render.com)
   - Render will automatically deploy using `render.yaml`
   - Update the WebSocket URL in `index.html` with your Render domain
2. **Deploy to Vercel**: 
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory
   - Update the WebSocket URL in `index.html` with your Vercel domain
3. **Deploy to Railway**:
   - Connect your GitHub repo to Railway
   - Railway will automatically deploy and provide a URL
4. **Share the URL**: Anyone can access your app via the provided URL
5. **Cross-Device Transfer**: Users on different devices can discover each other

### Option 2: Local Network Discovery
1. **Install Dependencies**: Run `npm install` to install the WebSocket server
2. **Start Server**: Run `npm start` to start the WebSocket server on port 4000
3. **Open Application**: Open `index.html` in your web browser
4. **Share with Network**: Other devices on the same network can connect to your IP address
5. **Start Sharing**: Users will automatically discover each other and can share files

### Option 2: Same Browser Discovery (Fallback)
1. **Open Application**: Open `index.html` in your web browser
2. **Multiple Tabs**: Open multiple browser tabs/windows with the app
3. **Start Sharing**: Users will discover each other and can share files

### Option 3: GitHub Pages Hosting
1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages** in your repository settings
3. **Set source to gh-pages branch** (created by GitHub Actions)
4. **Visit your site** at: `https://yourusername.github.io/local-share`
5. **Test with multiple tabs** (same-browser discovery only)

**Note**: GitHub Pages only supports static files, so network discovery across devices won't work. Use multiple browser tabs for testing.

## Troubleshooting

### Network Discovery Issues
- **No Users Visible**: Make sure the WebSocket server is running (`npm start`)
- **Connection Failed**: Check that port 4000 is not blocked by firewall
- **Network Issues**: Try the fallback mode by refreshing the page

### File Transfer Issues
- **File Transfer Fails**: Check that both browsers support WebRTC
- **Connection Issues**: Refresh the page and wait for discovery
- **Transfer Stuck**: Cancel and try again, or refresh both tabs

### General Issues
- **Server Won't Start**: Make sure Node.js is installed and port 4000 is available
- **Browser Compatibility**: Use Chrome, Firefox, Safari, or Edge

## License

This project is open source and available under the MIT License. 