import { useEffect, useState } from "react";
import { getPokemonFromAPI } from "../../api/getPokemonFromAPI";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import "./Home.css";
import { NextButton } from "../../components/NextButton/NextButton";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

const CANT_POKEMON_MIN = 152;
const CANT_POKEMON_MAX = 251;
//primera generacion: 1-151
//segunda generacion: 152-251
//tercera generacion: 252-386
//cuarta  generacion: 387-493
//quinta  generacion: 494-649
//sexta   generacion: 650-721
//septima generacion: 722-809
//octava  generacion: 810-905
//novena  generacion: 906-1010

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Home = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokemonsId, setCurrentPokemonId] = useState([
    getRandomNumber(CANT_POKEMON_MIN, CANT_POKEMON_MAX),
  ]);
  useEffect(() => {
    setCurrentPokemonId([
      ...pokemonsId,
      getRandomNumber(CANT_POKEMON_MIN, CANT_POKEMON_MAX),
    ]);
    getPokemonFromAPI(pokemonsId[pokemonsId.length - 1]).then((pokemon) => {
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
        <div className="parent">
          <NextButton
            icon={<TiArrowLeftOutline />}
            handleClick={async () => {
              setCurrentPokemon(
                // cuando haces uno a la derecha, uno a la izquierda y de  vuelta a la derecha, hay un error
                // ver como resolverlo
                await getPokemonFromAPI(pokemonsId[pokemonsId.length - 3])
              );
            }}
          />
          <NextButton
            icon={<TiArrowRightOutline />}
            handleClick={async () => {
              setCurrentPokemonId([
                ...pokemonsId,
                getRandomNumber(CANT_POKEMON_MIN, CANT_POKEMON_MAX),
              ]);
              console.log(pokemonsId);
              setCurrentPokemon(
                await getPokemonFromAPI(pokemonsId[pokemonsId.length - 1])
              );
            }}
          />
        </div>
      </div>
    </>
  );
};
