import { useEffect } from "react";
import styles from "./ScriptVideo.module.scss";
import Script from "next/script";
import { useState } from "react";

// https://dev.twitch.tv/docs/embed/video-and-clips

export default function ScriptVideo({ videoChannel, scriptVideo }) {
  const { type, channel } = videoChannel;
  const [loading, setLoading] = useState(true);
  const setManualIframe = () => (
    <iframe {...scriptVideo.options} onLoad={() => setLoading(false)} />
  );
  useEffect(() => {
    if (!loading) {
      window.setTimeout(() => {
        switch (type) {
          case "twitch":
            if (document.getElementsByTagName("iframe")[0]) {
              document.getElementsByTagName("iframe")[0].remove();
            }
            typeof Twitch !== "undefined" &&
              new Twitch.Player("video", scriptVideo.options);
            break;
          default:
            break;
        }
      }, 8000);
    }
  }, [videoChannel, loading]);

  return (
    <div className={styles.iframeContainer}>
      {scriptVideo.url ? (
        <>
          <Script
            src={scriptVideo.url}
            onLoad={(a) => {
              setLoading(false);
            }}
          />
          <div id="video" className={styles.videoContainer} />
        </>
      ) : (
        setManualIframe()
      )}

      {/* {loading && <div className={styles.loading} />} */}
    </div>
  );
}
