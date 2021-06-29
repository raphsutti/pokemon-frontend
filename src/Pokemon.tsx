import { gql, useQuery } from "@apollo/client";

const GET_POKEMON = gql`
  query GetPokemons($offset: Int!, $limit: Int!) {
    getPokemons(offset: $offset, limit: $limit) {
      results {
        name
        pokemonDetail {
          id
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
  id: number;
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
    variables: { offset: 0, limit: 10 },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data?.getPokemons) return <p>Nothing</p>;

  const { results } = data.getPokemons;

  return (
    <>
      {results.map(({ name, pokemonDetail }) => (
        <div>
          <tr style={{ textAlign: "center" }} key={name}>
            <td>id: {pokemonDetail.id}</td>
            <td>{name}</td>
            <td>height: {pokemonDetail.height}</td>
            <td>weight: {pokemonDetail.weight}</td>
          </tr>
          <tr>
            <td>
              <img alt="pokemon sprite" src={pokemonDetail.sprite} />
            </td>

            <td>
              <img alt="pokemon sprite back" src={pokemonDetail.spriteBack} />
            </td>
            <td>
              <img alt="pokemon shiny sprite" src={pokemonDetail.spriteShiny} />
            </td>
            <td>
              <img
                alt="pokemon shiny sprite back"
                src={pokemonDetail.spriteShinyBack}
              />
            </td>
          </tr>
        </div>
      ))}
      <div style={{ margin: "0 60px" }}>
        <button
          style={{ height: "30px", width: "200px" }}
          onClick={() => {
            fetchMore({
              variables: { offset: data.getPokemons.results.length },
            });
          }}
        >
          Load next 10 Pokemons
        </button>
      </div>
    </>
  );
};
