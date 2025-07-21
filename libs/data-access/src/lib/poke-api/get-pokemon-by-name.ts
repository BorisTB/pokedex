import {
  queryOptions,
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query';
import pokeApi from './poke.api';

export type PokemonName = string;

export const getPokemonByName = (pokemonName: PokemonName) =>
  queryOptions({
    queryKey: ['getPokemonByName', pokemonName],
    queryFn: async () => {
      return pokeApi.getPokemonByName(pokemonName);
    },
    throwOnError: true
  });

export function useGetPokemonByName(pokemonName: PokemonName) {
  return useQuery(getPokemonByName(pokemonName));
}

export function useSuspenseGetPokemonByName(pokemonName: PokemonName) {
  return useSuspenseQuery(getPokemonByName(pokemonName));
}
