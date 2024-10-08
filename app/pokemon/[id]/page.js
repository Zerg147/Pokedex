export default async function PokemonDetails({ params }) {
    const { id } = params; // Access dynamic route parameter
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!response.ok) {
        return <h1>Pokémon not found</h1>; // Handle 404 from API
    }
    
    const pokemon = await response.json();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Pokémon Card */}
            <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image Section */}
                <div className="bg-teal-200 p-4">
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        className="w-full h-48 object-contain"
                    />
                </div>

                {/* Content Section */}
                <div className="bg-yellow-300 p-6">
                    {/* Name */}
                    <h2 className="text-xl font-bold mb-2 capitalize">Name: {pokemon.name}</h2>

                    {/* Type */}
                    <p className="mb-2">
                        <span className="font-semibold">Type:</span> {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}
                    </p>

                    {/* Stats */}
                    <p className="mb-2">
                        <span className="font-semibold">Stats:</span> {pokemon.stats.map(stat => stat.stat.name).join(', ')}
                    </p>

                    {/* Abilities */}
                    <p className="mb-2">
                        <span className="font-semibold">Abilities:</span> {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}
                    </p>

                    {/* Moves */}
                    <p className="mb-2">
                        <span className="font-semibold">Some Moves:</span> {pokemon.moves.slice(0, 6).map(moveInfo => moveInfo.move.name).join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
}
