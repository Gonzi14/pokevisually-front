import { useEffect, useState } from "react";
import { getPokemonFromAPI } from "../../api/getPokemonFromAPI";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import "./Home.css";

const CANT_POKEMON_FIRST_GEN = 1006;

export const Home = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);

  useEffect(() => {
    const randomNumber = getRandomNumber(1, CANT_POKEMON_FIRST_GEN);

    getPokemonFromAPI(randomNumber).then((pokemon) => {
      setCurrentPokemon(pokemon);
    });
  }, []);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  if (!currentPokemon) {
    return <div>Cargando Contenido...</div>;
  }

  return (
    <>
      <h1>Pokeggstats!</h1>

      <PokemonCard pokemon={currentPokemon} />
    </>
  );
};
