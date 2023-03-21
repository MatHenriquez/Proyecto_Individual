import styles from '../styles/card.module.css';


export default function Card({name, image, types}){

      return (

       
                <div className={styles.Card}>
                    <h3>{name}</h3>
                    <img src={image} alt={name}/>
                    <div>
                        <h4>Tipos:</h4>
                        {
                            types.map((type, index) => <h4 key={index}>{type}</h4>)
                        }
                    </div>
                </div>
 
      )
}