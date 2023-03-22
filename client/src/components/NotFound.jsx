import styles from '../styles/notFound.module.css';
import img from '../resources/notFound.PNG'

export default function NotFound(){

    return <div className={styles.background}>
        <h2 className={styles.title}>Parece que te has perdido...</h2>
        <img src={img} alt="Error" className={styles.img} />
    </div>
}