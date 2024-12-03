let currentTrack =0;
const tracks = [
    'music/sample.mp3',
    'music/track2.mp3',
    'music/track3.mp3',
];
const audioPlayer = 
document.getElementById('audio-player');

function playMusic(){
    audioPlayer.play();
}

function playMusic(){
    audioPlayer.pause();
}

function nextTrack() {
    currentTrack = (currentTrack +1)%tracks.length;
    audioPlayer.src = tracks[currentTrack];
    audioPlayer.play();
}