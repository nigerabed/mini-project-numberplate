import Billeder from "../Billeder/Billeder";
import CarDetails from "../Car-Details/Details";
import Overblik from "../Overblik/Overblik";
import styles from "./Main.module.css";
import '../../app/globals.css'; // just import, no need to assign to a variable


export default function Main({car}){
    return(
         <main className={styles.main}>
             <div className={`container`} >
cxsdsdsdsadadsadasda
            
             <div>
                <button className={styles.btn}>Overblik</button>
                <button className={styles.btn}>Statistic</button>
            </div>
            <div className={styles.fullCarDetails} >
                <CarDetails carData= {car} />
                <Overblik carData= {car}/>
            </div>
            <Billeder />
             </div>
        </main>
    )
}