let fullScreenVideo;
let player;
let updateVolumeId;
const playerFullScreen = "player_full_screen";
const controlsVisible = "controls_visible";
const controls = document.querySelector(".controls");
const volumeIndicator = document.querySelector(".volume__indicator");
const brightnessControl = document.getElementById("brightness");
const contrastControl = document.getElementById("contrast");
const brightnessAttr = "data-brightness";
const contrastAttr = "data-contrast";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 512;
const streamData = new Uint8Array(analyser.frequencyBinCount);

function updateVolume() {
  analyser.getByteFrequencyData(streamData);
  const volume = streamData.reduce((acc, val) => acc + val, 0) / streamData.length;
  volumeIndicator.style.width = `${Math.floor(volume)}%`;
  updateVolumeId = requestAnimationFrame(updateVolume);
}

document.querySelectorAll(".player__video").forEach((video) => {
  const source = audioContext.createMediaElementSource(video);
  source.connect(analyser);
  source.connect(audioContext.destination);
  video.addEventListener("click", (e) => {
    e.preventDefault();
    if (fullScreenVideo === undefined) {
      fullScreenVideo = video;
      fullScreenVideo.muted = false;
      player = fullScreenVideo.closest(".player");
      brightnessControl.value = fullScreenVideo.getAttribute(brightnessAttr) || 1;
      contrastControl.value = fullScreenVideo.getAttribute(contrastAttr) || 1;
      audioContext.resume();
      updateVolume();
      player.classList.add(playerFullScreen);
      controls.classList.add(controlsVisible);
    }
  });
});

document.querySelector(".controls__show-dashboard").addEventListener("click", (e) => {
  if (fullScreenVideo) {
    fullScreenVideo.muted = true;
    cancelAnimationFrame(updateVolumeId);
    player.classList.remove(playerFullScreen);
    controls.classList.remove(controlsVisible);
    fullScreenVideo = undefined;
    player = undefined;
  }
});

function updateFilter() {
  if (fullScreenVideo) {
    const brightness = brightnessControl.value;
    const contrast = contrastControl.value;
    fullScreenVideo.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    fullScreenVideo.setAttribute(brightnessAttr, brightness);
    fullScreenVideo.setAttribute(contrastAttr, contrast);
  }
}

brightnessControl.addEventListener("input", updateFilter);
contrastControl.addEventListener("input", updateFilter);

const host = "localhost";

initVideo(
  document.getElementById("video-1"),
  `http://${host}:9191/master?url=http%3A%2F%2F${host}%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8`
);

initVideo(
  document.getElementById("video-2"),
  `http://${host}:9191/live?url=http%3A%2F%2F${host}%3A3102%2Fstreams%2Fstairs%2Fmaster.m3u8`
);

initVideo(
  document.getElementById("video-3"),
  `http://${host}:9191/master?url=http%3A%2F%2F${host}%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8`
);

initVideo(
  document.getElementById("video-4"),
  `http://${host}:9191/live?url=http%3A%2F%2F${host}%3A3102%2Fstreams%2Fstreet%2Fmaster.m3u8`
);
