import { gql, useQuery } from "@apollo/client";

const GET_POKEMON = gql`
  query GetPokemons($offset: Int!, $limit: Int!) {
    getPokemons(offset: $offset, limit: $limit) {
      results {
        name
        pokemonDetail {
          height
          weight
          sprite
          spriteBack
          spriteShiny
          spriteShinyBack
        }
      }
    }
  }
`;

interface GetPokemonResult {
  getPokemons: Result;
}

interface Result {
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
  spriteBack: string;
  spriteShiny: string;
  spriteShinyBack: string;
}

interface GetPokemonsVar {
  offset: number;
  limit: number;
}

export const PokemonComponent = () => {
  const { loading, error, data, fetchMore } = useQuery<
    GetPokemonResult,
    GetPokemonsVar
  >(GET_POKEMON, {
    variables: { offset: 0, limit: 3 },
  });
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
          <img alt="pokemon sprite back" src={pokemonDetail.spriteBack} />
          <img alt="pokemon shiny sprite" src={pokemonDetail.spriteShiny} />
          <img
            alt="pokemon shiny sprite back"
            src={pokemonDetail.spriteShinyBack}
          />
        </div>
      ))}
      <button
        onClick={() => {
          fetchMore({ variables: { offset: data.getPokemons.results.length } });
        }}
      >
        Load next 3 Pokemons
      </button>
    </>
  );
};
