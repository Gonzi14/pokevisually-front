import { useEffect, useState } from 'react'

import { Button } from '@ui/button'
import { GENERATIONS } from '@/shared/constants'
import { Generation, Pokemon } from '@shared/types'
import { getPokemonFromAPI } from '@shared/api/getPokemonFromAPI'

import { NextButton } from './components/NextButton/NextButton'
import { PokemonCard } from './components/PokemonCard/PokemonCard'

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function Home (): JSX.Element {
  const [currentGeneration, setCurrentGeneration] = useState<Generation>(
    GENERATIONS[0]
  )
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
  const [seenPokemon, setSeenPokemon] = useState<number[]>([])

  useEffect(() => {
    updatePokemon().catch(e => {})
  }, [])

  async function updatePokemon (pokedexNumber?: number): Promise<void> {
    if (pokedexNumber !== undefined) {
      const pokemon = await getPokemonFromAPI(pokedexNumber)
      setCurrentPokemon(pokemon)
    } else {
      const pokedexNumber = getNewPokedexNumber()
      const pokemon = await getPokemonFromAPI(pokedexNumber)
      setCurrentPokemon(pokemon)
      setSeenPokemon(prev => [...prev, pokedexNumber])
    }
  }

  const getNewPokedexNumber = (): number => {
    while (true) {
      const newPokedexNumber = getRandomNumber(
        currentGeneration.pokedexMin,
        currentGeneration.pokedexMax
      )
      if (!seenPokemon.includes(newPokedexNumber)) {
        return newPokedexNumber
      }
    }
  }

  // const getPreviousSeenPokemon = (): number => {
  // const currentPosition = seenPokemon.indexOf(currentPokemon.pokedexNumber as number)
  //   return seenPokemon.at(currentPosition - 1) as number
  // }

  if (currentPokemon == null) {
    return <div>Cargando Contenido...</div>
  }
  return (
    <div>
      <Button>Button</Button>
      <NextButton
        icon={<span>{currentGeneration.id}</span>}
        handleClick={() => {
          setCurrentGeneration(GENERATIONS[currentGeneration.id])
        }}
      />
      <PokemonCard pokemon={currentPokemon} />
      <div>
        {/* <NextButton
          handleClick={async () => {
            const pokemon = await getPokemonFromAPI(getPreviousSeenPokemon())
            setCurrentPokemon(pokemon)
          }}
        />
        <NextButton
          handleClick={() => {
            const currentPosition = seenPokemon.indexOf(
              currentPokemon.pokedexNumber
            )
            updatePokemon(seenPokemon.at(currentPosition + 1))
          }}
        /> */}
      </div>
    </div>
  )
}
