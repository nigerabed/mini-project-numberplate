import styles from "./Header.module.css";
import '../../app/globals.css'; // just import, no need to assign to a variable
import Link from "next/link";


export default function Header(){
    return(
        <>
        <header  className={`${styles.siteHeader}`}>
         <div className={`container  ${styles.headerContainer}`}>
                <img src="https://www.nummerplade.net/images/logo-nummerplade-net.png" alt="Logo" class="logo" />
                <nav>
                    <ul>
                    <li>Information</li>
                    <li><Link href={`/numberplate`}>Menu</Link> </li>
                    </ul>
                </nav>
             </div>
        </header>
        </>
    )
}