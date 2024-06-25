const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;

let votes = {
  optionA: 0,
  optionB: 0,
};

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.send(JSON.stringify(votes));

  ws.on('message', (message) => {
    const vote = JSON.parse(message);
    if (vote.option === 'optionA') {
      votes.optionA += 1;
    } else if (vote.option === 'optionB') {
      votes.optionB += 1;
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(votes));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
