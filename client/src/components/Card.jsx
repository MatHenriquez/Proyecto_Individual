import styles from '../styles/card.module.css';
import { Link } from "react-router-dom";



export default function Card({id, name, image, types}){


      return (

       
                <div className={styles.Card}>
                    <h3 className={styles.name}>{name}</h3>
                    <img src={image} alt={name} className={styles.img}/>
                    <div>
                        <h4 className={styles.types} >Tipos:</h4>
                        {
                            types.map((type, index) => <h4 className={styles.types} key={index}>{type}</h4>)
                        }
                    </div>

                    <Link to={`/detail/${id}`}>
                        <button>Detalles</button>
                    </Link>
                </div>
 
      )
}