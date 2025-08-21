import styles from "./Billeder.module.css"
export default function Billeder() {
  return (
    <div className={styles.BillederContainer}>
      <h2 className={styles.h2}>Billeder</h2>
      <img
        src="https://static.wikia.nocookie.net/central/images/3/3f/Placeholder_view_vector.svg/revision/latest/scale-to-width-down/681?cb=20250302081817"
        alt=""
      />
    </div>
  );
}
