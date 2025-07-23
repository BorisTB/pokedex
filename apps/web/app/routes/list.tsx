import type { Route } from './+types/list';
import {
  extractUserPrefs,
  getPokemonByName,
  getQueryClient,
  listPokemons,
  serializeUserPrefs,
  updateUserPrefs
} from '@pokedex/data-access';
import {
  dehydrate,
  HydrationBoundary,
  useQueryClient
} from '@tanstack/react-query';
import { data, useFetcher, useNavigate } from 'react-router';
import { useCallback } from 'react';
import { PokemonList } from '../features/pokemon/list';
import { BasicErrorBoundary } from '../error/basic-error-boundary';

export async function loader({ request }: Route.LoaderArgs) {
  const { page, limit } = await extractUserPrefs(request);

  const queryClient = getQueryClient();
  const queryOptions = listPokemons({
    offset: (page - 1) * limit,
    limit: limit
  });

  queryClient.prefetchQuery(queryOptions);

  return { qcState: dehydrate(queryClient), page, limit };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const page = formData.get('page');
  const limit = formData.get('limit');

  const cookie = await updateUserPrefs(request, { page, limit });

  return data(
    { page, limit },
    {
      headers: {
        'Set-Cookie': await serializeUserPrefs(cookie)
      }
    }
  );
}

export default function ListPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const queryClient = useQueryClient();
  const { qcState, page, limit } = loaderData;

  const onPageChange = (newPage: number) => {
    fetcher.submit({ page: newPage, limit }, { method: 'POST' });
  };

  const onLimitChange = (newLimit: number) => {
    fetcher.submit({ limit: newLimit, page }, { method: 'POST' });
  };

  const onRowClick = useCallback(
    (pokemonName: string) => {
      queryClient.prefetchQuery(getPokemonByName(pokemonName));
      navigate(`detail/${pokemonName}`);
    },
    [navigate, queryClient]
  );

  return (
    <HydrationBoundary state={qcState}>
      <BasicErrorBoundary>
        <PokemonList
          page={page}
          limit={limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          onRowClick={onRowClick}
        />
      </BasicErrorBoundary>
    </HydrationBoundary>
  );
}
