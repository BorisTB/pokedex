import {
  keepPreviousData,
  queryOptions,
  useQuery
} from '@tanstack/react-query';
import pokeApi from './poke.api';

export interface ListPokemonsParams {
  offset?: number;
  limit?: number;
}

export const listPokemons = ({ offset, limit }: ListPokemonsParams = {}) =>
  queryOptions({
    queryKey: ['listPokemons', { offset, limit }],
    queryFn: async () => {
      return pokeApi.listPokemons(offset, limit);
    },
    placeholderData: keepPreviousData
  });

export function useListPokemons(params?: ListPokemonsParams) {
  return useQuery(listPokemons(params));
}
