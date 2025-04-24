import { FC } from "react";
import styles from "./Button.module.css";

type IProps = {
  disabled?: boolean;
};

export const Button: FC<IProps> = ({ disabled }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="submit"
        className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      >
        Enviar
      </button>
    </div>
  );
};
