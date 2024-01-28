import { Pokemon } from '@shared/types'

export const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <div>
      <div>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.spriteFront} />
        <img src={pokemon.spriteBack} />
        <br />
        <img src={`/img/${pokemon.type1}.png`} alt={`${pokemon.type1}`} />
        <br />
        <img
          src={`/img/${pokemon.type2}.png`}
          onError={e => e.currentTarget.remove()}
        />
      </div>
    </div>
  )
}
