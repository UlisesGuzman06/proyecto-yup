import { ChangeEvent, FC } from "react";
import styles from "./Input.module.css";

interface IProps {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

export const Input: FC<IProps> = ({
  placeholder,
  name,
  type,
  value,
  onChange,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={styles.Inputs}>
      <div className={styles.Input}>
        <input
          className={`${styles.Input} ${error ? styles.errorInput : ""}`}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
        {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
