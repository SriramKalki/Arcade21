const optionsContainer = document.getElementById('options');
const resultsContainer = document.getElementById('results');
const newOptionInput = document.getElementById('newOption');
const addOptionButton = document.getElementById('addOption');

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  const votes = JSON.parse(event.data);
  updateResults(votes);
};

function updateResults(votes) {
  resultsContainer.innerHTML = '';
  for (const [option, count] of Object.entries(votes)) {
    const result = document.createElement('p');
    result.textContent = `${option}: ${count}`;
    resultsContainer.appendChild(result);
  }
}

function createOptionButton(option) {
  const button = document.createElement('button');
  button.textContent = `Vote for ${option}`;
  button.addEventListener('click', () => {
    ws.send(JSON.stringify({ type: 'vote', option }));
  });
  optionsContainer.appendChild(button);
}

