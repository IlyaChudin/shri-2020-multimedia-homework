let fullScreenVideo;
const playerFullScreen = "player_full_screen";
const controlsVisible = "controls_visible";
const controls = document.querySelector(".controls");

document.querySelectorAll(".player").forEach((player) =>
  player.addEventListener("click", (e) => {
    e.preventDefault();
    if (fullScreenVideo === undefined) {
      fullScreenVideo = player;
      fullScreenVideo.classList.add(playerFullScreen);
      controls.classList.add(controlsVisible);
    }
  })
);

document.querySelector(".controls__show-dashboard").addEventListener("click", (e) => {
  if (fullScreenVideo) {
    fullScreenVideo.classList.remove(playerFullScreen);
    fullScreenVideo = undefined;
    controls.classList.remove(controlsVisible);
  }
});

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
