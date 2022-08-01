const music = document.querySelector("#audio");
const numOfSongs = document.querySelector(".music-counter");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".song-creator");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const shuffleBtn = document.querySelector(".random-track");
const prevbtn = document.querySelector(".prev-track");
const playBtn = document.querySelector(".play-track");
const nextBtn = document.querySelector(".next-track");
const rewindBtn = document.querySelector(".repeat-track");
const libraryBtn = document.querySelector(".btn--library");
const lyricsBtn = document.querySelector(".btn--lyrics");
const sideBar = document.querySelector(".sidebar");
const disk = document.querySelector(".track-image");
const songList = document.querySelector(".song");
const songInfo = document.querySelector(".song-info");
const ulTag = document.querySelector(".song-container");
const allLiTag = ulTag.getElementsByTagName("li");

let increment = 0;
let currentMusic = 0;
const displayLibrary = function (arr) {
  ulTag.innerHTML = "";
  for (let counter = 0; counter < songs.length; counter++) {
    //let's pass the song name, artist from the array
    let liTag = `<li li-index="${counter}">
                    <div class="song">
                      <div class="img-container">
                        <img class="img-cover" src="${arr[counter].cover}" alt="${arr[counter].name}">
                      </div>
                     <div class="song-info" id=${increment}>
                      <h3 class="composer">${arr[counter].name}</h3>
                       <h3 class="band-name">${arr[counter].artist}</h3>
                      </div>
                  <  /div>
                  </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
  }
};

ulTag.addEventListener("click", function (e) {
  songIndex = e.target.closest("li").getAttribute("li-index");
  currentMusic = songIndex;
  setMusic(currentMusic);
  playMusic();
});

//Oraganize Library
libraryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sideBar.classList.toggle("active");
});

//Pause/Play Button
playBtn.addEventListener("click", function () {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

//Start Music Player
const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  music.load();

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  numOfSongs.textContent = "Playing " + currentMusic + " of " + songs.length;
  disk.style.backgroundImage = `url(${songs[currentMusic].cover})`;
  currentTime.textContent = "00:00";
  seekBar.max = music.duration;
  music.addEventListener("loadeddata", () => {
    let mainAdDuration = music.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `0${totalMin}:${totalSec}`;
    seekBar.max = music.duration;
  });
};
setMusic(0);
displayLibrary(songs);

//Format Time
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

//Seekbar
setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    nextBtn.click();
  }
}, 500);

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

//Forward Button
nextBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

// Backwards Button
prevbtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});

//Rewind Button
rewindBtn.addEventListener("click", () => {
  setMusic(currentMusic);
  playMusic();
});

//Random Button
shuffleBtn.addEventListener("click", () => {
  for (let i = 0; i < allLiTag.length - 1; i++) {
    ulTag.appendChild(allLiTag[(Math.random() * i) | 0]);
  }
  currentMusic = allLiTag[0].getAttribute("li-index");
  setMusic(currentMusic);
  playMusic();
});

const playMusic = () => {
  music.play();
  playBtn.classList.remove("pause");
  disk.classList.remove("play");
};
