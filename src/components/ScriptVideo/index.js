import { useEffect } from "react";
import styles from "./ScriptVideo.module.scss";
import Script from "next/script";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

// https://dev.twitch.tv/docs/embed/video-and-clips

export default function ScriptVideo({ videoChannel, scriptVideo }) {
  const { type, channel } = videoChannel;
  const [loading, setLoading] = useState(true);
  const setManualIframe = () => (
    <iframe {...scriptVideo.options} onLoad={() => setLoading(false)} />
  );
  useEffect(() => {
    setLoading(true);
  }, [videoChannel]);
  useEffect(() => {
    if (document.getElementsByTagName("iframe")[0]) {
      document.getElementsByTagName("iframe")[0].remove();
    }
    window.setTimeout(() => {
      switch (type) {
        case "twitch":
          if (
            typeof Twitch !== "undefined" &&
            !document.getElementsByTagName("iframe")[0]
          ) {
            setLoading(false);
            new Twitch.Player("video", scriptVideo.options);
          }
          break;
        default:
          break;
      }
    }, 8000);
  }, [videoChannel]);

  return (
    <div className={styles.iframeContainer}>
      {scriptVideo.url ? (
        <>
          <Script src={scriptVideo.url} />
          <div id="video" className={styles.videoContainer} />
        </>
      ) : (
        setManualIframe()
      )}
      {console.log("loadiing ", loading)}
      {loading && (
        <div
          style={{
            width: "80vw",
            height: "50vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
          className={styles.loading}
        >
          CARGANDO....
          <Circles
            height="80"
            width="80"
            color="white"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
