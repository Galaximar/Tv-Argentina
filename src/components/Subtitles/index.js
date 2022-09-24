import styles from "./index.module.scss";

export default function Subtitles({ label }) {
  return <h3 className={styles.subtitle}>{label}</h3>;
}
