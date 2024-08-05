/******w**************
    
    Assignment 4 Javascript
    Name: Rylee Jennings
    Date: June 28th, 2024
    Description: JSON and Open

*********************/

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const characterName = document.getElementById('characterName').value.trim();
    if (!characterName) {
        alert('Please enter a character name to search.');
        return;
    }

    const baseUrl = 'https://swapi.dev/api/people/';
    const queryUrl = `${baseUrl}?search=${encodeURIComponent(characterName)}&$where=name!=''&order=name ASC`;

    fetch(queryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                displayNoCharactersFound();
            } else {
                displayResults(data.results);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again later.');
        });
});

function displayResults(characters) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const resultList = document.createElement('ul');
    resultList.classList.add('character-list');

    characters.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        resultList.appendChild(listItem);
    });

    resultsDiv.appendChild(resultList);
}

function displayNoCharactersFound() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>No characters found.</p>';
}