import styles from './RatingInput.module.css';

interface RatingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const RatingInput = ({ label, value, onChange }: RatingInputProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.legend}>{label}</legend>
    <div className={styles.options}>
      {[1, 2, 3, 4, 5].map((option) => (
        <label className={styles.option} key={option}>
          <input
            checked={value === option}
            className={styles.input}
            name="confidence"
            onChange={() => onChange(option)}
            type="radio"
            value={option}
          />
          <span className={`${styles.pill} ${value === option ? styles.pillSelected : ''}`}>
            {option}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);
