const optionsContainer = document.getElementById('options');
const resultsContainer = document.getElementById('results');
const newOptionInput = document.getElementById('newOption');
const addOptionButton = document.getElementById('addOption');

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  const { votes, totalVotes } = JSON.parse(event.data);
  updateResults(votes, totalVotes);
};

function updateResults(votes, totalVotes) {
  resultsContainer.innerHTML = '';
  for (const [option, count] of Object.entries(votes)) {
    const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : 0;

    const result = document.createElement('div');
    result.classList.add('option-container');

    const resultText = document.createElement('p');
    resultText.textContent = `${option}: ${count} (${percentage}%)`;

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;

    result.appendChild(resultText);
    result.appendChild(progressBar);
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

addOptionButton.addEventListener('click', () => {
  const newOption = newOptionInput.value.trim();
  if (newOption) {
    ws.send(JSON.stringify({ type: 'addOption', option: newOption }));
    createOptionButton(newOption);
    newOptionInput.value = '';
  }
});
