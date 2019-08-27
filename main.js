const W = window.W;
W.setHooks();
// STATE
let PLAYING = false;
let LOADED = false;
let rotation = 0;

// DOMS and NODES
const songName = document.querySelector(".info > h2");
const messageStae = document.querySelector(".info .state");
const artist = document.querySelector(".info p > span");
const poster = document.getElementById("poster");
const playerIcon = document.getElementById("player-icon");
// music
const songAudio = document.querySelector("audio");

// Setets
const setName = name => {
  songName.innerText = name.toString();
};
const setaArtist = name => {
  artist.innerText = name.toString();
};
const setPoster = src => {
  if (!!src) poster.src = src;
};
const setAudio = src => {
  if (!!src) songAudio.src = src;
};
const setIconSrc = src => {
  playerIcon.src = src;
};

/*************************************************
  ADJUST SETTING WITH YOUR CUSTOMIZED DATA HERE
***************************************************/

setName("تیکه ها");
setaArtist("کیان پورتراب");
setPoster(
  "https://www.tarafdari.com/sites/default/files/contents/user321924/content-sound/kian_pourtorab_-_pieces.jpg"
);
setAudio(
  "https://www.tarafdari.com/sites/default/files/contents/user321924/content-sound/kiyan_pourtorab_tekeha_128_.mp3"
);

const playPause = () => {
  if (playerIcon.getAttribute("data-loaded") === "false") return;
  PLAYING = !PLAYING;

  if (PLAYING) {
    setIconSrc("assets/icons/pause.png");
    poster.classList.add("playing");
    songAudio.play();
  } else {
    setIconSrc("assets/icons/play.png");
    poster.classList.remove("playing");
    songAudio.pause();
  }
};

messageStae.innerText = "processing...";

// audio
songAudio.addEventListener("canplaythrough", () => {
  messageStae.innerText = "";
  playerIcon.setAttribute("data-loaded", "true");
  setIconSrc("assets/icons/play.png");
});
songAudio.addEventListener("canplay", () => {
  messageStae.innerText = "downloading...";
});
songAudio.addEventListener("loadstart", event => {
  console.log(event.type);
});
songAudio.addEventListener("loadedmetadata", event => {
  console.log(event.type);
});
songAudio.addEventListener("canplay", event => {
  console.log(event.type);
});

// animator

setInterval(() => {
  if (PLAYING) rotation += 0.2;
  document.querySelector(".player").style.transform = `rotate(${rotation}deg)`;
}, 100);
