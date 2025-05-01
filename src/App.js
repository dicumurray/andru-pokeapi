import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import './App.css'; // opcional, por si querés agregar estilos

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Fetch inicial de los pokémons
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => response.json())
      .then(data => setPokemons(data.results))
      .catch(error => console.error('Error fetching pokemones:', error));
  }, []);

  // Filtrar los pokémons según el término de búsqueda
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para manejar el clic en un Pokémon y obtener su información
  const handlePokemonSelect = (pokemon) => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => setSelectedPokemon(data))
      .catch(error => console.error('Error fetching pokemon details:', error));
  };

  return (
    <div className="App">
      <h1>Pokemones</h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Si se selecciona un Pokémon, mostrar detalles */}
      {selectedPokemon ? (
        <div className="pokemon-detail">
          <h2>{selectedPokemon.name.toUpperCase()}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>Types: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
      ) : (
        <PokemonList pokemons={filteredPokemons} onPokemonSelect={handlePokemonSelect} />
      )}
    </div>
  );
}

export default App;
