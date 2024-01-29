import { useEffect, useState } from 'react'

import { GENERATIONS } from '@shared/constants'
import { Generation, Pokemon } from '@shared/types'
import CustomSelect from '@shared/components/CustomSelect'
import { getRandomNumberBetweenValues } from '@/shared/utils'
import { getPokemonFromAPI } from '@shared/api/getPokemonFromAPI'

import PokemonCard from './components/PokemonCard'
import { Button } from '@/shared/ui/button'

export default function RatePage (): JSX.Element {
  const [currentGeneration, setCurrentGeneration] = useState<Generation>(
    GENERATIONS[0]
  )
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    updatePokemon()
  }, [])

  async function updatePokemon (): Promise<void> {
    const pokedexNumber = getRandomNumberBetweenValues(
      currentGeneration.pokedexMin,
      currentGeneration.pokedexMax
    )
    const pokemon = await getPokemonFromAPI(pokedexNumber)
    setCurrentPokemon(pokemon)
  }

  if (currentPokemon == null) {
    return <div>Cargando Contenido...</div>
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
      <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
        <Button className='hidden lg:flex text-xl' variant='ghost'>
          ←
        </Button>
        <PokemonCard pokemon={currentPokemon} />
        <Button className='hidden lg:flex text-xl' variant='ghost'>
          →
        </Button>
      </div>
      <div className='flex w-full justify-evenly items-center lg:hidden'>
        <Button variant='ghost' className='text-2xl'>
          ←
        </Button>
        <Button variant='ghost' className='text-2xl'>
          →
        </Button>
      </div>
    </main>
  )
}
