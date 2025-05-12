import React from 'react';

function PokemonList({ pokemons, onPokemonSelect }) {
  return (
    <ul>
      {pokemons.map((pokemon, index) => (
        <li
          key={index}
          onMouseEnter={() => onPokemonSelect(pokemon)}  // <- esto activa la carga al pasar el mouse
          style={{ cursor: 'pointer', padding: '4px' }}
        >
          {pokemon.name}
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
