// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const wordInfo = document.getElementById('wordInfo');
const wordTitle = document.getElementById('wordTitle');
const phonetics = document.getElementById('phonetics');
const playSound = document.getElementById('playSound');
const definitionsDiv = document.getElementById('definitions');
const examplesDiv = document.getElementById('examples');
const relatedImagesDiv = document.getElementById('relatedImages');
const synonymsDiv = document.getElementById('synonyms');
const antonymsDiv = document.getElementById('antonyms');
const translationDiv = document.getElementById('translation');
const micBtn = document.getElementById('micBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsSection = document.getElementById('settings');
const darkModeToggle = document.getElementById("darkModeToggle");
const languageSelectSetting = document.getElementById('languageSelectSetting');
const languageSelect = document.getElementById('languageSelect');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const historyList = document.getElementById('historyList');

// Get localStorage history
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

// --- Search Button Click ---
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  // Save to history if not already
  if (!history.includes(query)) {
    history.push(query);
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }

  renderHistory();
  
  // Call API for word info (example with placeholder data)
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
  const data = await response.json();
  
  displayWordInfo(data);
});

// --- Display Word Info ---
function displayWordInfo(data) {
  wordInfo.classList.remove('hidden');
  wordTitle.textContent = data[0].word;
  phonetics.textContent = data[0].phonetic || 'No phonetic available';
  playSound.onclick = () => new Audio(data[0].audio).play();

  definitionsDiv.innerHTML = `<h4>Definitions:</h4>`;
  data[0].meanings[0].definitions.forEach((def, index) => {
    definitionsDiv.innerHTML += `<p>${index + 1}. ${def.definition}</p>`;
  });

  // Similar implementations for Examples, Images, Synonyms, and Antonyms
}

// --- Settings Button Click ---
settingsBtn.addEventListener('click', () => {
  settingsSection.classList.toggle('hidden');
});

// --- Dark Mode Toggle ---
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// --- Load Dark Mode Preference ---
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
});

// --- Clear History Button Click ---
clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Clear search history?')) {
    history = [];
    localStorage.removeItem('searchHistory');
    renderHistory();
  }
});

// --- Render Search History ---
function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

renderHistory();
