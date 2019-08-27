// STATE
let PLAYING = false;
let LOADED = false;
let rotation = 0;
let timer = null;

// DOMS and NODES
const poster = document.getElementById("poster");
const playerIcon = document.getElementById("player-icon");
// music
const audio = new Audio();
audio.addEventListener(
  "ended",
  function() {
    rotation = 0;
    PLAYING = true;
    playPause();
  },
  false
);
// Setets
const setPoster = src => {
  if (!!src) poster.src = src;
};
const setAudio = src => {
  if (!!src) audio.src = src;
};
const setIconSrc = src => {
  playerIcon.src = src;
};

/*************************************************
  ADJUST SETTING WITH YOUR CUSTOMIZED DATA HERE
***************************************************/

const playPause = () => {
  if (playerIcon.getAttribute("data-loaded") === "false") return;
  PLAYING = !PLAYING;

  if (PLAYING) {
    setIconSrc("assets/icons/pause.png");
    poster.classList.remove("pause");
    audio.play();
  } else {
    setIconSrc("assets/icons/play.png");
    poster.classList.add("pause");
    audio.pause();
  }
};

// audio
audio.addEventListener("canplaythrough", () => {
  // messageStae.innerText = "";
  playerIcon.setAttribute("data-loaded", "true");
  setIconSrc("assets/icons/play.png");
  clearInterval(timer);
  const duration = audio.duration * 1000 || 10000;
  timer = setInterval(() => {
    if (PLAYING) rotation += (360 * 100) / duration;
    document.querySelector(
      ".player"
    ).style.transform = `rotate(${rotation}deg)`;
  }, 100);
});

// animator
timer = setInterval(() => {
  if (PLAYING) rotation += 0.2;
  document.querySelector(".player").style.transform = `rotate(${rotation}deg)`;
}, 100);

const W = window.W;

const onCustomizeValueChange = ({ key, value }) => {
  if (key === "poster") {
    if (value !== "Enter your poster link") {
      setPoster(value);
    }
  }
  if (key === "audio") {
    setAudio(value);
  }
};

const hooks = {
  onCustomizeValueChange,
  wappWillStart(start) {
    W.loadData().then(({ customize }) => {
      const { poster, audio } = customize;
      setPoster(poster);
      setAudio(audio);
    });
    start();
  }
};
W.setHooks(hooks);
