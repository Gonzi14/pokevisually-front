import { Pokemon } from '@/shared/types'

const API_URL = 'https://pokeapi.co/api/v2/'

export async function getPokemonByPokedexNumber (
  pokedexNumber: number
): Promise<Pokemon> {
  try {
    const res = await fetch(`${API_URL}pokemon/${pokedexNumber}`)
    const resJSON = await res.json()

    const { species, sprites, types } = resJSON

    return {
      id: pokedexNumber,
      name: species.name,
      frontSprite: sprites.front_default,
      backSprite: sprites.back_default,
      types: types.map((type: { type: { name: string } }) => ({
        name: type.type.name
      }))
    }
  } catch (error) {
    console.log(error)
    throw new Error('There was an error on the server')
  }
}
