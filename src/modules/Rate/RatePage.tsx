import { useEffect, useState } from 'react'

import { GENERATIONS } from '@shared/constants'
import { Generation, Pokemon } from '@shared/types'
import CustomSelect from '@shared/components/CustomSelect'
import { getRandomNumberBetweenValues } from '@/shared/utils'
import { getPokemonFromAPI } from '@/shared/api/getPokemonFromAPI'

import PokemonCard from './components/PokemonCard'
import PokemonCardSkeleton from './components/PokemonCardSkeleton'
import ArrowButton from './components/ArrowButton'

export default function RatePage (): JSX.Element {
  const [currentGeneration, setCurrentGeneration] = useState<Generation>(
    GENERATIONS[0]
  )
  const [seenPokemonIds, setSeenPokemonIds] = useState<number[]>([])
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
  const [isCurrentPokemonLoading, setIsCurrentPokemonLoading] =
    useState<boolean>(true)

  useEffect(() => {
    const newPokedexNumber = getNotSeenPokedexNumber()
    updateCurrentPokemon(newPokedexNumber)
    updateSeenPokemonIds(newPokedexNumber)
  }, [])

  useEffect(() => {
    // Restart seen Pokemons and fetch new one
    setSeenPokemonIds([])
    const newPokedexNumber = getNotSeenPokedexNumber()
    updateCurrentPokemon(newPokedexNumber)
    updateSeenPokemonIds(newPokedexNumber)
  }, [currentGeneration])

  const getPreviousPokemonDisabled = (): boolean => {
    if (currentPokemon == null) return true

    const currentPokemonPosition = seenPokemonIds.indexOf(currentPokemon.id)
    if (currentPokemonPosition === undefined) return true
    if (seenPokemonIds[currentPokemonPosition - 1] === undefined) return true

    return false
  }

  const getNextPokemonDisabled = (): boolean => {
    // If user has seen all pokemon in current generation
    // and current pokemon is the last in the list
    if (currentPokemon == null) return true

    if (
      seenPokemonIds.length ===
        currentGeneration.pokedexMax - currentGeneration.pokedexMin + 1 &&
      seenPokemonIds.at(-1) === currentPokemon.id
    ) { return true }

    return false
  }

  const updateCurrentPokemon = (pokedexNumber: number): void => {
    if (pokedexNumber == null) return

    setIsCurrentPokemonLoading(true)
    getPokemonFromAPI(pokedexNumber)
      .then(pokemon => {
        setCurrentPokemon(pokemon)
      })
      .catch(e => e) // TODO: Show error as toast
      .finally(() => setIsCurrentPokemonLoading(false))
  }

  const updateSeenPokemonIds = (pokemonId: number): void => {
    setSeenPokemonIds(prev => [...prev, pokemonId])
  }

  const getNotSeenPokedexNumber = (): number => {
    while (true) {
      const randomPokedexNumber = getRandomNumberBetweenValues(
        currentGeneration.pokedexMin,
        currentGeneration.pokedexMax
      )
      if (!seenPokemonIds.includes(randomPokedexNumber)) {
        return randomPokedexNumber
      }
    }
  }

  const goPreviousPokemon = (): void => {
    if (currentPokemon == null) {
      console.log('No current pokemon!')
      return
    }

    const currentPokemonPosition = seenPokemonIds.indexOf(currentPokemon.id)
    if (currentPokemonPosition === undefined) return
    if (seenPokemonIds[currentPokemonPosition - 1] === undefined) return

    updateCurrentPokemon(seenPokemonIds[currentPokemonPosition - 1])
  }

  const goNextPokemon = (): void => {
    if (currentPokemon == null) {
      console.log('No current pokemon!')
      return
    }

    // Check if it is necessary to fetch a new pokemon
    if (seenPokemonIds.at(-1) === currentPokemon.id) {
      const newPokedexNumber = getNotSeenPokedexNumber()
      updateCurrentPokemon(newPokedexNumber)
      updateSeenPokemonIds(newPokedexNumber)
    } else {
      const currentPokemonPosition = seenPokemonIds.indexOf(currentPokemon.id)
      if (seenPokemonIds[currentPokemonPosition + 1] === undefined) return

      updateCurrentPokemon(seenPokemonIds[currentPokemonPosition + 1])
    }
  }

  return (
    <main className='h-full flex flex-col justify-start items-center gap-5 lg:gap-12 px-5'>
      <CustomSelect
        triggerClassname='self-end mt-5 self-center md:self-end'
        placeholder='Select a Generation'
        label='Generations'
        items={GENERATIONS}
        onChange={value => {
          const generation = GENERATIONS.find(gen => gen.id === value)
          setCurrentGeneration(generation ?? GENERATIONS[0])
        }}
        defaultValue={currentGeneration.id}
      />
      <div className='lg:flex lg:flex-row lg:items-center lg:gap-10'>
        <ArrowButton arrow='←' disabled={getPreviousPokemonDisabled()} className='hidden lg:flex p-6' onClick={() => goPreviousPokemon()} />
        {isCurrentPokemonLoading || currentPokemon == null
          ? (
            <PokemonCardSkeleton />
            )
          : (
            <PokemonCard pokemon={currentPokemon} />
            )}
        <ArrowButton arrow='→' disabled={getNextPokemonDisabled()} className='hidden lg:flex p-6' onClick={() => goNextPokemon()} />
      </div>
      <div className='flex w-full justify-evenly items-center lg:hidden'>
        <ArrowButton arrow='←' disabled={getPreviousPokemonDisabled()} className='p-8' onClick={() => goPreviousPokemon()} />
        <ArrowButton arrow='→' disabled={getNextPokemonDisabled()} className='p-8' onClick={() => goNextPokemon()} />
      </div>
    </main>
  )
}
