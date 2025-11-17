import Search from "@/components/Search/Search";
import styles from "./page.module.css";

export default function NumberPlate(){
    return(
        <div className={styles.numberplatePage}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Nummerplade Søgning</h1>
                    <p className={styles.pageDescription}>
                        Indtast en dansk nummerplade for at få detaljerede oplysninger om køretøjet
                    </p>
                </div>
            </div>
        </div>
    )
}