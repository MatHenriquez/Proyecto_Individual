import React from "react";
import styles from '../styles/pagination.module.css'

function Pagination ({pokemonsPerPage, pokemons, pagination, currentPage}){ // declaro mi paginado, traigo las props del otro componente

  const pageNumber = []

  const actualPage = currentPage;

  if(Math.floor(pokemons.length/pokemonsPerPage)===1) pageNumber.push(1) //Para que muestre al menos 1 página. 


  for (let i = 0; i < Math.floor(pokemons.length/pokemonsPerPage); i++) {//Saqué el <= del for porque crea una página vacía cuando la cantidad de pokemons es un múltiplo de 12.
    pageNumber.push(i+1);
  }
  


if(pokemons.length > 12) {//Si no hay pokemons o menos de 2 páginas, no muestro el paginado.
  return (
      <nav className={styles.nav}>
          <ul className={styles.ul}>
          <li className={styles.li}>
              <span onClick={() => pagination(1)}>{'|<'}</span>
            </li>
          <li className={styles.li}>
              <span onClick={() => {
                if(actualPage > 1)
                pagination(actualPage - 1)}
              }>
                {'<<'}
              </span>
            </li>
            {
            pageNumber?.map(number => (
              < li key={number} className={styles.li}>
                <span onClick={() => pagination(number)} className={actualPage === number ? styles.current : null }>{number}</span>   
              </li>
            )
              )
            }
            <li className={styles.li}>
              <span onClick={() => {
                if(actualPage < (pokemons.length/pokemonsPerPage))
                pagination(actualPage + 1)}
              }>
                {`>>`}
              </span>
            </li>
            <li className={styles.li}>
              <span onClick={() => pagination(Math.ceil(pokemons.length/pokemonsPerPage))}>{'>|'}</span>
            </li>
          </ul>
      </nav>
    )
} else {
  return <div></div>
}


}
export default Pagination;