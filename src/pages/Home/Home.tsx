import { useEffect, useState } from "react";
import { getPokemonFromAPI } from "../../api/getPokemonFromAPI";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import "./Home.css";
import { NextButton } from "../../components/NextButton/NextButton";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import { Generation, Pokemon } from "../../types";

const GENERATIONS = [
  { id: 1, pokedexMin: 1, pokedexMax: 151 },
  { id: 2, pokedexMin: 152, pokedexMax: 251 },
  { id: 3, pokedexMin: 252, pokedexMax: 386 },
  { id: 4, pokedexMin: 387, pokedexMax: 493 },
  { id: 5, pokedexMin: 494, pokedexMax: 649 },
  { id: 6, pokedexMin: 650, pokedexMax: 721 },
  { id: 7, pokedexMin: 722, pokedexMax: 809 },
  { id: 8, pokedexMin: 810, pokedexMax: 905 },
  { id: 9, pokedexMin: 906, pokedexMax: 1010 },
  { id: 0, pokedexMin: 1, pokedexMax: 1010 },
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
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Home = () => {
  const [currentGeneration, setCurrentGeneration] = useState<Generation>(
    GENERATIONS[0]
  );
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [seenPokemon, setSeenPokemon] = useState<number[]>([]);
  const [randomPokemons, setRandomPokemons] = useState(true);

  useEffect(() => {
    updatePokemon();
  }, []);

  const updatePokemon = async (pokedexNumber?: number) => {
    if (pokedexNumber) {
      const pokemon = await getPokemonFromAPI(pokedexNumber);
      setCurrentPokemon(pokemon);
    } else {
      const pokedexNumber = getNewPokedexNumber(randomPokemons);
      if (pokedexNumber != null) {
        const pokemon = await getPokemonFromAPI(pokedexNumber);
        setCurrentPokemon(pokemon);
        setSeenPokemon((prev) => [...prev, pokedexNumber]);
      }
    }
  };

  const getNewPokedexNumber = (randomPokemons: boolean) => {
    while (true) {
      if (randomPokemons == true) {
        const newPokedexNumber = getRandomNumber(
          currentGeneration.pokedexMin,
          currentGeneration.pokedexMax
        );
        if (!seenPokemon.includes(newPokedexNumber)) {
          return newPokedexNumber;
        }
      } else {
        console.log("hay un problema");
        if (!currentPokemon?.pokedexNumber) {
          return; // si no hay pokemon actual, se vuelve con las manos vacias
        }
        const newPokedexNumber = currentPokemon?.pokedexNumber + 1;
        console.log(newPokedexNumber);
        if (!seenPokemon.includes(newPokedexNumber)) {
          console.log("no se repite");
          return newPokedexNumber;
        } else {
          return newPokedexNumber;
        }
      }
    }
  };

  const getPreviousSeenPokemon = () => {
    const currentPosition = seenPokemon.indexOf(currentPokemon!.pokedexNumber);
    return seenPokemon.at(currentPosition - 1) as number;
  };

  if (!currentPokemon) {
    return <div>Cargando Contenido...</div>;
  }
  return (
    <div>
      <h1>Pokeggstats!</h1>
      <NextButton
        icon={<span>{currentGeneration.id}</span>}
        handleClick={async () => {
          setRandomPokemons(true); // esto es para que cuando quieras agarrar un pokemon de otra generacion, no te siga agarrando el siguiente en la lista
          setCurrentGeneration(GENERATIONS[currentGeneration.id]);
        }}
      />
      <NextButton
        icon={<span>Random/ No Random</span>}
        handleClick={() => {
          setRandomPokemons(!randomPokemons);
        }}
      />
      <PokemonCard pokemon={currentPokemon} />
      <div className="parent">
        <NextButton
          icon={<TiArrowLeftOutline />}
          handleClick={async () => {
            setCurrentPokemon(
              await getPokemonFromAPI(getPreviousSeenPokemon())
            );
          }}
        />
        <NextButton
          icon={<TiArrowRightOutline />}
          handleClick={() => {
            const currentPosition = seenPokemon.indexOf(
              currentPokemon.pokedexNumber
            );
            updatePokemon(seenPokemon.at(currentPosition + 1));
            console.log(seenPokemon);
          }}
        />
      </div>
    </div>
  );
};
