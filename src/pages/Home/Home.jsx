import { useEffect, useState } from "react";
import { getPokemonFromAPI } from "../../api/getPokemonFromAPI";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import "./Home.css";
import { NextButton } from "../../components/NextButton/NextButton";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

const CANT_POKEMON_MIN = 152;
const CANT_POKEMON_MAX = 251;
const generations = [
  { id: 1, min: 1, max: 151 },
  { id: 2, min: 152, max: 251 },
  { id: 3, min: 252, max: 386 },
  { id: 4, min: 387, max: 493 },
  { id: 5, min: 494, max: 649 },
  { id: 6, min: 650, max: 721 },
  { id: 7, min: 722, max: 809 },
  { id: 8, min: 810, max: 905 },
  { id: 9, min: 906, max: 1010 },
  { id: 0, min: 1, max: 1010 },
];
//primera generacion: 1-151
//segunda generacion: 152-251
//tercera generacion: 252-386
//cuarta  generacion: 387-493
//quinta  generacion: 494-649
//sexta   generacion: 650-721
//septima generacion: 722-809
//octava  generacion: 810-905
//novena  generacion: 906-1010
const getRandomNumber = (currentGeneration) => {
  return Math.floor(
    Math.random() * (currentGeneration.max - currentGeneration.min + 1) +
      currentGeneration.min
  );
};

export const Home = () => {
  const [currentGeneration, setCurrentGeneration] = useState(generations[0]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokemonsId, setCurrentPokemonId] = useState([
    getRandomNumber(currentGeneration),
  ]);
  useEffect(() => {
    setCurrentPokemonId([...pokemonsId, getRandomNumber(currentGeneration)]);
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
        <NextButton
          icon={currentGeneration.id}
          handleClick={async () => {
            setCurrentGeneration(generations[currentGeneration.id]);
          }}
        />
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
                getRandomNumber(currentGeneration),
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
