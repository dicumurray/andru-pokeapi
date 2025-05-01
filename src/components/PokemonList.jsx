import React from 'react';

function PokemonList({ pokemons }) {
  return (
    <ul>
      {pokemons.map((pokemon, index) => (
        <li key={index}>{pokemon.name}</li>
      ))}
    </ul>
  );
}

export default PokemonList;
