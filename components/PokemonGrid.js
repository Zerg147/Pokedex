'use client';
import { useState, useEffect } from "react";
import SkeletonCard from "./SkeletonCard";

export default function PokemonGrid() {
    const [allPokemon, setAllPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
    const [pokemonTypes, setPokemonTypes] = useState(null); // State for Pokémon types
    const [selectedType, setSelectedType] = useState(""); // State for selected type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchAllDetails = async () => {
            const data = await fetchAllPokemon();
            const temp = await Promise.all(
                data.results.map(async (item) => {
                    const response = await fetch(item.url);
                    const pokemonData = await response.json();
                    return pokemonData;
                })
            );
            setAllPokemon(temp); // Set all Pokémon details in 
            setLoading(false); // Set loading to false when data is fetched
        };

        const fetchPokemonTypes = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/type/');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon types');
                }
                const data = await response.json();
                setPokemonTypes(data.results); // Set Pokémon types in state
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAllDetails();
        fetchPokemonTypes(); // Fetch types when the component loads
    }, []);

    // Filter Pokémon based on search term and selected type
    const filteredPokemon = allPokemon?.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === "" || pokemon.types.some(typeInfo => typeInfo.type.name === selectedType))
    );

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
            {/* Type Filter */}
            <div className="relative w-80 flex items-center mb-4 space-x-4">
                <label htmlFor="type-select" className="block w-60 text-gray-700 font-medium mb-2">Filter by type:</label>
                <select
                    id="type-select"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="capitalize block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Types</option>
                    {pokemonTypes && pokemonTypes.map((type) => (
                        <option className="capitalize" key={type.name} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Search input field */}
            <div className="relative mb-5">
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-80 pl-10 pr-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6M4 10a6 6 0 1 0 12 0 6 6 0 0 0-12 0" />
                    </svg>
                </div>
            </div>
            </div>


            <section id="Projects"
                className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {/* Show skeleton cards while loading */}
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    filteredPokemon && filteredPokemon.map((pokemon) => (
                        <div key={pokemon.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <a href={`/pokemon/${pokemon.id}`}>
                                <img src={pokemon.sprites.other["official-artwork"].front_default} // Rendering Pokémon image
                                    alt={pokemon.name} className="h-80 w-72 object-cover rounded-t-xl" />
                                <div className="px-4 py-3 w-72">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">ID: {pokemon.id}</span>
                                    <p className="text-lg font-bold text-black truncate block capitalize">{pokemon.name}</p>
                                    <a href={`/pokemon/${pokemon.id}`} className="inline-flex font-medium items-center text-blue-600 hover:underline">
                                        Details
                                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                                        </svg>
                                    </a>
                                </div>
                            </a>
                        </div>
                    )))}
            </section>
        </div>
    );
}
