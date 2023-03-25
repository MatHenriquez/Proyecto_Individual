import React from "react";
import styles from '../styles/pagination.module.css'

function Pagination ({pokemonsPerPage, pokemons, pagination, currentPage}){ // declaro mi paginado, traigo las props del otro componente
  const pageNumber = []

  const actualPage = currentPage;

  for (let i = 0; i <= Math.floor(pokemons.length/pokemonsPerPage); i++) {
    pageNumber.push(i+1);
  }
  return (
    <nav>
        <ul className={styles.ul}>
        <li className={styles.li}>
            <span onClick={() => pagination(1)}>{'|<'}</span>
          </li>
        <li className={styles.li}>
            <span onClick={() => {
              if(actualPage > 1)
              pagination(actualPage - 1)}
            }
            >
              {'<<'}
              </span>
          </li>
           {
           pageNumber?.map(number => (
            < li key={number} className={styles.li}>
              <span onClick={() => pagination(number)}>{number}</span>   
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
}
export default Pagination;