let fullScreenVideo;
let player;
const playerFullScreen = "player_full_screen";
const controlsVisible = "controls_visible";
const controls = document.querySelector(".controls");
const brightnessControl = document.getElementById("brightness");
const contrastControl = document.getElementById("contrast");
const brightnessAttr = "data-brightness";
const contrastAttr = "data-contrast";

document.querySelectorAll(".player__video").forEach((video) =>
  video.addEventListener("click", (e) => {
    e.preventDefault();
    if (fullScreenVideo === undefined) {
      fullScreenVideo = video;
      player = fullScreenVideo.closest(".player");
      brightnessControl.value = fullScreenVideo.getAttribute(brightnessAttr) || 1;
      contrastControl.value = fullScreenVideo.getAttribute(contrastAttr) || 1;
      player.classList.add(playerFullScreen);
      controls.classList.add(controlsVisible);
    }
  })
);

document.querySelector(".controls__show-dashboard").addEventListener("click", (e) => {
  if (fullScreenVideo) {
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

initVideo(
  document.getElementById("video-1"),
  "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8"
);

initVideo(
  document.getElementById("video-2"),
  "http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstairs%2Fmaster.m3u8"
);

initVideo(
  document.getElementById("video-3"),
  "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8"
);

initVideo(
  document.getElementById("video-4"),
  "http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstreet%2Fmaster.m3u8"
);
