let currentMusic = 0;
const music = document.querySelector("#audio");
const numOfSongs = document.querySelector(".music-counter");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".song-creator");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const shuffleBtn = document.querySelector(".random-track");
const prevbtn = document.querySelector(".prev-track");
const playBtn = document.querySelector(".pause-track");
const nextBtn = document.querySelector(".next-track");
const rewindBtn = document.querySelector(".repeat-track");
const libraryBtn = document.querySelector(".btn--library");
const lyricsBtn = document.querySelector(".btn--lyrics");
const sideBar = document.querySelector(".sidebar");

changePauseBtn = (icon) => icon.classList.toggle("fa-pause");
openLibrary = (sidebar) => sidebar.classList.toggle("hidden");

// libraryBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   sideBar.classList.remove(".hidden");
// });
