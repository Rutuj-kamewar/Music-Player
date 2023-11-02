const nowPlaying = document.querySelector(".now-playing")
const trackArt = document.querySelector(".img")
const trackName = document.querySelector(".track-name")
const trackArtist = document.querySelector(".track-artist")

let playpauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");
 
let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");


 
// Specify globally used values
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let currTrack = document.createElement('audio');
 
// Define the list of tracks that have to be played
let track_list = [
  {
    name: " Lil Mama See",
    artist: "Road Runner",
    image: "https://pagalnew.com/coverimages/Lil-Mama-See-feat.-Sultaan-Road-Runner-500-500.jpg",
    path: "music/Lil Mama.mp3"
  },
  {
    name: " Butter",
    artist: "BTS",
    image: "https://pagalnew.com/coverimages/Butter-BTS-500-500.jpg",
    path: "music/Butter.mp3"
  },
  {
    name: "Too Much",
    artist: "Dimitri Vegas, Like Mike, Dvbbs, Roy Woods",
    image: "https://pagalnew.com/coverimages/Too-Much-Dimitri-Vegas-Like-Mike-500-500.jpg",
    path: "music/Too Much.mp3",
  },
  {
    name: "Gumaan",
    artist: "Young Stunners",
    image: "https://m.media-amazon.com/images/M/MV5BNTJlNGQwY2EtZGYzYi00NzUxLWE4MmQtYzJlODVjZGNiZWRjXkEyXkFqcGdeQXVyMTM0Nzk1ODI0._V1_FMjpg_UY684_.jpg",
    path: "music/Gumaan.mp3",
  },
];

function loadTrack(trackIndex){

    clearInterval(updateTimer);
    resetValues();

        currTrack.src = track_list[trackIndex].path;
        currTrack.load();

        trackArt.style.background = "url(" + track_list[trackIndex].image + ")";
        trackArt.style.backgroundSize = "cover";
        trackName.textContent = track_list[trackIndex].name;
        trackArtist.textContent = track_list[trackIndex].artist; 
        nowPlaying.textContent = 
     "PLAYING " + (trackIndex + 1) + " OF " + track_list.length;

     updateTimer = setInterval(seekUpdate, 1000)

     currTrack.addEventListener("ended" , nextTrack)

     randomBgColor();



}

function randomBgColor() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
   
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
   
    // Set the background to the new color
    document.body.style.background = bgColor;
  }
  function resetValues() {
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
  }

  function playpauseTrack(){
    if(!isPlaying){
      playTrack()
    }
    else {
     pauseTrack()
    }
  }
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Call your function here
        if(!isPlaying){
          playTrack()
        }
        else {
         pauseTrack()
        }
    }
});

  function playTrack(){
    isPlaying = true
    currTrack.play()
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }

  function pauseTrack(){
    currTrack.pause()
    isPlaying = false;
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }

  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (trackIndex < track_list.length - 1)
      trackIndex += 1;
    else trackIndex = 0;
   
    // Load and play the new track
    loadTrack(trackIndex);
    playTrack();
  }

   function prevTrack(){
    if(trackIndex > 0){
      trackIndex -= 1
    }
    else {trackIndex = track_list.length - 1;}
   
  // Load and play the new track
  loadTrack(trackIndex);
  playTrack();

  }


  function seekTo(){
       var seekto = currTrack.duration * (seekSlider.value / 100);
      currTrack.currentTime = seekto;
  }

  function seekUpdate(){
    let seekPosition = 0;

    if (!isNaN(currTrack.duration)) {
      seekPosition =currTrack.currentTime * (100 / currTrack.duration);
      seekSlider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(currTrack.currentTime / 60);
      let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currTrack.duration / 60);
      let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   // Display the updated duration
   currTime.textContent = currentMinutes + ":" + currentSeconds;
   totalDuration.textContent = durationMinutes + ":" + durationSeconds;
 }
}

document.addEventListener('keydown', function(event) {
  switch (event.key) {

    case 'ArrowLeft':
      currTrack.currentTime = currTrack.currentTime - 5;
      break;

    case 'ArrowRight':
      currTrack.currentTime = currTrack.currentTime + 5;
      break;


    default:
      // Code for other keys
      console.log('Other key pressed');
  }
});





loadTrack(trackIndex);