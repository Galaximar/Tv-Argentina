import Image from "next/image";
import Link from "next/link";
import { CHANNELS } from "../../channels";
import ChannelsList from "../../components/ChannelsList";
import ScriptVideo from "../../components/ScriptVideo";
import Subtitles from "../../components/Subtitles";
import { SCRIPT_VIDEOS } from "../../scriptVideos";
import styles from "./index.module.scss";
import { MdMonitor } from "react-icons/md";
import Button from "../../components/Button";
import Head from "next/head";

export default function ViewChannel({
  name,
  img,
  id,
  videoChannel,
  scriptVideo,
  oficcialLink,
}) {
  return (
    <>
      <Head>
        <title>Tv Argentina | {name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.pageLogo}>
          <Link href={"/"}>
            <a>
              <MdMonitor size={70} />
            </a>
          </Link>
        </div>

        <Image src={img.url} width={100} height={40} />

        <Subtitles label={name} />
        <p>Contenido utilizado únicamente como medio de estudio.</p>
        <p style={{ marginBottom: "10px" }}>
          Es posible que el video no funcione corréctamente. En ese caso, vea la
          emisión oficial.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minHeight: "60vw",
          }}
        >
          <ScriptVideo scriptVideo={scriptVideo} videoChannel={videoChannel} />
          <Button
            onClick={() => window.open(oficcialLink)}
            label={"Emisión oficial"}
            additionalStyles={{ width: "80vw" }}
          />
        </div>

        <Subtitles label="Otros canales" />
        <ChannelsList viewingChannel={id} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params?.slug;
  const channel = CHANNELS.find((channel) => channel.id === id);
  const scriptVideo = SCRIPT_VIDEOS[channel.videoChannel.type];
  switch (channel.videoChannel.type) {
    case "twitch":
      scriptVideo.options.channel = channel.videoChannel.channel;
      break;
    case "yt":
      scriptVideo.options.src = `https://www.youtube.com/embed/${channel.videoChannel.channel}?autoplay=1&mute=1&loop=1&quality=high`;
      break;
    default:
      break;
  }
  return {
    props: { ...channel, scriptVideo },
  };
}
