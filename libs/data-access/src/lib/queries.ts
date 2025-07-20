import { PokemonClient } from 'pokenode-ts';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';

const pokeApi = new PokemonClient();

export const queries = {
  getPokemons: ({ offset, limit }: { offset?: number; limit?: number } = {}) =>
    queryOptions({
      queryKey: ['getPokemons', { offset, limit }],
      queryFn: async () => {
        return pokeApi.listPokemons(offset, limit);
      },
      placeholderData: keepPreviousData
    }),
  getPokemonById: (pokemonId: number) =>
    queryOptions({
      queryKey: ['getPokemonById', pokemonId],
      queryFn: async () => {
        return pokeApi.getPokemonById(pokemonId);
      }
    })
};
