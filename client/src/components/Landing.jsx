import styles from '../styles/landing.module.css';
import { Link } from "react-router-dom";

export default function Landing(){

    return <div className={styles.background}>
        <h1 className={styles.title}>¡Bienvenidos a la Aventura!</h1>
        <Link to='/home'>
         <button className={styles.btn}>HOME</button>
        </Link>
        
    </div>
}