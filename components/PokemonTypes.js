"use client"
import { useState, useEffect } from "react";

export default function PokemonTypes() {
    const [pokemonTypes, setPokemonTypes] = useState(null);

    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/type/');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon types');
                }
                const data = await response.json();
                setPokemonTypes(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchPokemonTypes();
    }, []);

    return (
        <div className="mb-4">
            <label htmlFor="type-select" className="block text-gray-700 font-medium mb-2">Filter by type</label>
            {pokemonTypes && (
                <select id="type-select" className="px-4 py-2 bg-white border border-gray-300 rounded-md">
                    {pokemonTypes.results.map((type) => (
                        <option key={type.name}>{type.name}</option>
                    ))}
                </select>
            )}
        </div>

    );
}
