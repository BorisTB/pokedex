import { queryOptions, useQuery } from '@tanstack/react-query';
import pokeApi from './poke.api';

export type PokemonId = number;

export const getPokemonById = (pokemonId: PokemonId) =>
  queryOptions({
    queryKey: ['getPokemonById', pokemonId],
    queryFn: async () => {
      return pokeApi.getPokemonById(pokemonId);
    }
  });

export function useGetPokemonById(pokemonId: PokemonId) {
  return useQuery(getPokemonById(pokemonId));
}
