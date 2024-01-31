// POKEMON
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

// API
export interface BaseApiConstructor {
  baseUrl: string
}

export interface IGet {
  url: string
  headers?: HeadersInit
}
