import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

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
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore } = useQuery<
    GetPokemonResult,
    GetPokemonsVar
  >(GET_POKEMON, {
    variables: { offset, limit: 3 },
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
          setOffset(offset + 3);
          // TODO - Figure out Apollo cache to build up final data results
          fetchMore({ variables: { offset, limit: 3 } });
        }}
      >
        Load next 3 Pokemons
      </button>
    </>
  );
};