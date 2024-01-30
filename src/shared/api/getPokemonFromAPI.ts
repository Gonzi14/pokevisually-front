import { Pokemon } from '@/shared/types'

export async function getPokemonFromAPI (index: number): Promise<Pokemon> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    const resJSON = await res.json()

    const { species, sprites, types } = resJSON

    return {
      id: index,
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
