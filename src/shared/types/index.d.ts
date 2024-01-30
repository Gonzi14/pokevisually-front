export interface Generation {
  id: number
  pokedexMin: number
  pokedexMax: number
}

export interface Pokemon {
  id: number
  name: string
  frontSprite: string
  backSprite: string
  types: Array<{
    name
  }>
}
