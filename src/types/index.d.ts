export type Generation = {
  id: number;
  pokedexMin: number;
  pokedexMax: number;
};

export type Pokemon = {
  pokedexNumber: number;
  name: string;
  spriteFront: string;
  spriteBack: string;
  type1: string;
  type2: string;
};
