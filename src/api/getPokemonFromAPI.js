export async function getPokemonFromAPI(index) {
  const res = await fetch(`http://pokeapi.co/api/v2/pokemon/${index}`);
  const resJSON = await res.json();

  const { forms, sprites, types } = resJSON;

  return {
    name: forms[0].name,
    sprite: sprites.front_default,
    type1: types[0].type.name,
    type2: types[1]?.type?.name,
  };
}
