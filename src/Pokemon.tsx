import { gql, useQuery } from "@apollo/client";

const GET_POKEMON = gql`
  query GetPokemons {
    getPokemons(offset: 0, limit: 26) {
      count
      results {
        name
        pokemonDetail {
          height
          weight
          sprite
          spriteShiny
        }
      }
    }
  }
`;

interface GetPokemonResult {
  getPokemons: Result;
}

interface Result {
  count: number;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  pokemonDetail: PokemonDetail;
}

interface PokemonDetail {
  height: number;
  weight: number;
  sprite: string;
  spriteShiny: string;
}

interface GetPokemonsVar {
  offset: number;
  limit: number;
}

export const PokemonComponent = () => {
  const { loading, error, data } = useQuery<GetPokemonResult, GetPokemonsVar>(
    GET_POKEMON
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data?.getPokemons) return <p>Nothing</p>;

  const { results } = data.getPokemons;

  return (
    <>
      {results.map(({ name, pokemonDetail }) => (
        <div>
          <p>name: {name}</p>
          <p>height: {pokemonDetail.height}</p>
          <p>weight: {pokemonDetail.weight}</p>
          <img alt="pokemon sprite" src={pokemonDetail.sprite} />
          <img alt="pokemon shiny sprite" src={pokemonDetail.spriteShiny} />
        </div>
      ))}
    </>
  );
};
