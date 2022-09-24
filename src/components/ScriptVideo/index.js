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
    <iframe
      style={{ display: loading ? "none" : "block" }}
      {...scriptVideo.options}
      onLoad={() => setLoading(false)}
    />
  );
  useEffect(() => {
    setLoading(true);
  }, [videoChannel]);
  useEffect(() => {
    if (document.getElementsByTagName("iframe")[0] && scriptVideo.url) {
      document.getElementsByTagName("iframe")[0]?.remove();
    }
    window.setTimeout(() => {
      switch (type) {
        case "twitch":
          console.log("entra", document.getElementsByTagName("iframe")[0]);
          if (
            typeof Twitch !== "undefined" &&
            !document.getElementsByTagName("iframe")[0]
          ) {
            setLoading(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            new Twitch.Player("video", scriptVideo.options);
          }
          break;
        default:
          break;
      }
    }, 1000);
  }, [videoChannel]);
  return (
    <div className={styles.iframeContainer}>
      {scriptVideo.url ? (
        <>
          <Script src={scriptVideo.url} />
          <div
            style={{ display: loading ? "none" : "block" }}
            id="video"
            className={styles.videoContainer}
          />
        </>
      ) : (
        setManualIframe()
      )}

      {loading && (
        <div className={styles.loading}>
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
