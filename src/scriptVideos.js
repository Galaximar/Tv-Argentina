export const SCRIPT_VIDEOS = {
  twitch: {
    url: "https://player.twitch.tv/js/embed/v1.js",
    options: {
      width: 1000,
      height: 500,
      autoplay: true,
    },
  },
  yt: {
    url: null,
    options: {
      width: "853",
      height: "480",
      frameBorder: "0",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      title: "Embedded youtube",
    },
  },
};
