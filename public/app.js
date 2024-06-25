const votesOptionA = document.getElementById('votesOptionA');
const votesOptionB = document.getElementById('votesOptionB');

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  const votes = JSON.parse(event.data);
  votesOptionA.textContent = votes.optionA;
  votesOptionB.textContent = votes.optionB;
};

document.getElementById('voteOptionA').addEventListener('click', () => {
  ws.send(JSON.stringify({ option: 'optionA' }));
});

document.getElementById('voteOptionB').addEventListener('click', () => {
  ws.send(JSON.stringify({ option: 'optionB' }));
});
