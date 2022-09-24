import styles from "./ChannelsList.module.scss";
import Image from "next/image";
import router from "next/router";
import { CHANNELS } from "../../channels";
import Link from "next/link";
import Button from "../Button";

function ChannelsList({ viewingChannel }) {
  const goToVideoPage = (id) => router.push(`/${id}`);
  return (
    <div className={styles.channelsContainer}>
      {CHANNELS.filter((channel) => channel.id !== viewingChannel).map(
        ({ name, img, id, oficcialLink }) => {
          return (
            <div
              onClick={() => goToVideoPage(id)}
              className={styles.channel}
              key={id}
            >
              <Image src={img?.url} alt={img?.alt} width={100} height={40} />
              <p className={styles.display}>{name}</p>
              <Button
                onClick={() => window.open(oficcialLink)}
                label={"Emisión oficial"}
              />
            </div>
          );
        }
      )}
    </div>
  );
}

export default ChannelsList;
