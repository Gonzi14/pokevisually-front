export async function getPokemonFromAPI(index) {
  const res = await fetch(`http://pokeapi.co/api/v2/pokemon/${index}`);
  const resJSON = await res.json();

  const { species, sprites, types } = resJSON;

  return {
    name: species.name,
    spriteFront: sprites.front_default,
    spriteBack: sprites.back_default,
    type1: types[0].type.name,
    type2: types[1]?.type?.name,
  };
}
