const uploadForm = document.getElementById('upload-form');
const songListElement = document.getElementById('song-list');
const audioPlayer = document.getElementById('audio-player');

// Function to fetch songs from the server
function fetchSongs() {
  fetch('/songs')
    .then((response) => response.json())
    .then((songs) => {
      displaySongs(songs);
    })
    .catch((err) => console.error('Error fetching songs:', err));
}

// Function to display songs in the list
function displaySongs(songs) {
  songListElement.innerHTML = '';
  songs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.innerHTML = `
      <p>${song.title}</p>
      <button onclick="playSong('${song.filePath}')">Play</button>
    `;
    songListElement.appendChild(songElement);
  });
}

// Function to play a song
function playSong(filePath) {
  audioPlayer.src = filePath;
  audioPlayer.play();
}

// Handle song upload
uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(uploadForm);
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Song uploaded:', data);
      fetchSongs(); // Refresh the song list
    })
    .catch((err) => console.error('Error uploading song:', err));
});

// Fetch songs when the page loads
fetchSongs();