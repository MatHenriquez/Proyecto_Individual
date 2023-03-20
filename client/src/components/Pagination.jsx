import React from "react";

function Pagination ({pokemonsPerPage, pokemons, pagination}){ // declaro mi paginado, traigo las props del otro componente
  const pageNumber = []

  for (let i = 0; i <= Math.floor(pokemons.length/pokemonsPerPage); i++) {
    pageNumber.push(i+1);
  }
  return (
    <nav>
        <ul>
           {
           pageNumber?.map(number => (
            < li key={number}>
              <a onClick={() => pagination(number)}>{number}</a>   
            </li>
           )
            )
           }
        </ul>
    </nav>
  )
}
export default Pagination;