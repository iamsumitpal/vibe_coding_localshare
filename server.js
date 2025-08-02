const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store connected peers
const peers = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    let peerId = null;
    let peerUsername = null;
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received:', data.type, 'from:', data.from);
            
            switch (data.type) {
                case 'join':
                    peerId = data.data.userId;
                    peerUsername = data.data.username;
                    peers.set(peerId, {
                        ws: ws,
                        userId: peerId,
                        username: peerUsername,
                        timestamp: Date.now()
                    });
                    
                    // Send current peer list to new peer
                    const peerList = Array.from(peers.values()).map(p => ({
                        userId: p.userId,
                        username: p.username
                    }));
                    
                    ws.send(JSON.stringify({
                        type: 'peers',
                        peers: peerList
                    }));
                    
                    // Broadcast new peer to others
                    broadcastToOthers(peerId, {
                        type: 'peers',
                        peers: peerList
                    });
                    
                    console.log(`Peer joined: ${peerUsername} (${peerId})`);
                    break;
                    
                case 'get-peers':
                    const currentPeers = Array.from(peers.values()).map(p => ({
                        userId: p.userId,
                        username: p.username
                    }));
                    
                    ws.send(JSON.stringify({
                        type: 'peers',
                        peers: currentPeers
                    }));
                    break;
                    
                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    // Relay signal to target peer
                    const targetPeer = peers.get(data.to);
                    if (targetPeer && targetPeer.ws.readyState === WebSocket.OPEN) {
                        targetPeer.ws.send(JSON.stringify(data));
                        console.log(`Relayed ${data.type} from ${data.from} to ${data.to}`);
                    } else {
                        console.log(`Target peer ${data.to} not found or disconnected`);
                    }
                    break;
                    
                default:
                    console.log('Unknown message type:', data.type);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
    
    ws.on('close', () => {
        if (peerId) {
            peers.delete(peerId);
            console.log(`Peer disconnected: ${peerUsername} (${peerId})`);
            
            // Broadcast updated peer list
            const updatedPeers = Array.from(peers.values()).map(p => ({
                userId: p.userId,
                username: p.username
            }));
            
            broadcastToAll({
                type: 'peers',
                peers: updatedPeers
            });
        }
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

function broadcastToOthers(excludePeerId, message) {
    peers.forEach((peer, peerId) => {
        if (peerId !== excludePeerId && peer.ws.readyState === WebSocket.OPEN) {
            peer.ws.send(JSON.stringify(message));
        }
    });
}

function broadcastToAll(message) {
    peers.forEach((peer) => {
        if (peer.ws.readyState === WebSocket.OPEN) {
            peer.ws.send(JSON.stringify(message));
        }
    });
}

// Clean up stale peers every 30 seconds
setInterval(() => {
    const now = Date.now();
    peers.forEach((peer, peerId) => {
        if (now - peer.timestamp > 30000) {
            console.log(`Removing stale peer: ${peer.username} (${peerId})`);
            peers.delete(peerId);
        }
    });
}, 30000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`WebSocket server running on port ${PORT}`);
    console.log(`Local network URL: ws://localhost:${PORT}`);
    console.log(`Network URL: ws://[your-local-ip]:${PORT}`);
}); 