import styles from '../styles/card.module.css';
import { Link } from "react-router-dom";



export default function Card({id, name, image, types}){


      return (

          <Link to={`/detail/${id}`} className={styles.link}>
       
                <div className={styles.card}>
                    <h3 className={styles.name}>{name}</h3>
                    <img src={image} alt={name} className={styles.img}/>
                    <div>
                        <h4 className={styles.types} >Tipos:</h4>
                        {
                            types.map((type, index) => <h4 className={styles.types} key={index}>{`- ${type}`}</h4>)
                        }
                    </div>

                </div>
        </Link>
 
      )
}