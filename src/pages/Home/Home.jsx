import { useEffect, useState } from "react";
import { getPokemonFromAPI } from "../../api/getPokemonFromAPI";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import "./Home.css";
import { NextButton } from "../../components/NextButton/NextButton";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

const CANT_POKEMON_FIRST_GEN = 1006;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Home = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentPokemonId, setCurrentPokemonId] = useState(
    getRandomNumber(1, CANT_POKEMON_FIRST_GEN)
  );

  useEffect(() => {
    setCurrentPokemonId(getRandomNumber(1, CANT_POKEMON_FIRST_GEN));
    getPokemonFromAPI(currentPokemonId).then((pokemon) => {
      setCurrentPokemon(pokemon);
    });
  }, []);

  if (!currentPokemon) {
    return <div>Cargando Contenido...</div>;
  }
  return (
    <>
      <div>
        <h1>Pokeggstats!</h1>

        <PokemonCard pokemon={currentPokemon} />
        <NextButton
          icon={<TiArrowLeftOutline />}
          handleClick={() => {
            console.log(currentPokemon);
          }}
        />
        <NextButton
          icon={<TiArrowRightOutline />}
          handleClick={async () => {
            setCurrentPokemonId(getRandomNumber(1, CANT_POKEMON_FIRST_GEN));
            setCurrentPokemon(await getPokemonFromAPI(currentPokemonId));
          }}
        />
      </div>
    </>
  );
};
