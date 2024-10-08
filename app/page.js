import PokemonGrid from "@/components/PokemonGrid";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Title or Header Section */}
      <div className="justify-center flex">
      <img className="w-60" src="/assets/imgbin_pokemon-logo-png.png"/>
      </div>
      {/* Pokémon Grid */}
      <PokemonGrid />
    </div>
  );
}
