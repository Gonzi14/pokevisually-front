export const PokemonCard = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprite}></img>
      <h5>Tipos</h5>
      <span>{pokemon.type1}</span> <br />
      <span>{pokemon.type2}</span>
    </div>
  );
};
