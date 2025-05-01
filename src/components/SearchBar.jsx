import React, { useState, useEffect } from 'react';

function SearchBar({ searchTerm, setSearchTerm, onSearchSelect }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (searchTerm.length > 1) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const data = await response.json();
        const filtered = data.results.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    };

    fetchPokemons();
  }, [searchTerm]);

  const handleResultClick = (pokemon) => {
    onSearchSelect(pokemon); // Llama al padre para mostrar los detalles del Pokémon
    setSearchTerm(''); // Limpia el campo de búsqueda
    setResults([]); // Limpia los resultados
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '16px',
          marginBottom: '20px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
      {results.length > 0 && (
        <ul style={{ paddingLeft: '0', listStyleType:
