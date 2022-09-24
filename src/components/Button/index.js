import styles from "./index.module.scss";

export default function Button({ label, onClick, additionalStyles }) {
  return (
    <button style={additionalStyles} className={styles.btn} onClick={onClick}>
      {label}
    </button>
  );
}
