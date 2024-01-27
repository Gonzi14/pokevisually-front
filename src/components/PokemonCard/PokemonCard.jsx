import "./PokemonCard.css";

export const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card-container">
      <div className="card">
        <h2>{pokemon.name}</h2>
        <img className="pokemonImg" src={pokemon.spriteFront}></img>
        <img className="pokemonImg" src={pokemon.spriteBack}></img>
        <h5>Tipos</h5>
        <img
          className="typeImg"
          src={`/img/${pokemon.type1}.png`}
          alt={`${pokemon.type1}`}
        />
        <br />
        <img
          className="typeImg"
          src={`/img/${pokemon.type2}.png`}
          onError="this.remove()"
        />
      </div>
    </div>
  );
};
