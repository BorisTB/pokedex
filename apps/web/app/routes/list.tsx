import type { Route } from './+types/list';
import { prefsCookie } from '../cookies.server';
import {
  getPokemonByName,
  getQueryClient,
  listPokemons,
  useListPokemons
} from '@pokedex/data-access';
import {
  dehydrate,
  HydrationBoundary,
  useQueryClient
} from '@tanstack/react-query';
import { data, useFetcher, useNavigate } from 'react-router';
import { DataTable } from 'mantine-datatable';
import { Container } from '@mantine/core';
import { useCallback } from 'react';

const LIMIT_OPTIONS = [10, 20, 50];
const DEFAULT_LIMIT = LIMIT_OPTIONS[1];

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefsCookie.parse(cookieHeader)) || {};

  const page = cookie.page || 1;
  const limit = cookie.limit || DEFAULT_LIMIT;

  const queryClient = getQueryClient();
  const queryOptions = listPokemons({ offset: page, limit: limit });

  queryClient.prefetchQuery(queryOptions);

  return { qcState: dehydrate(queryClient), page, limit };
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefsCookie.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const prevPage = cookie.page || 1;
  const prevLimit = cookie.limit || DEFAULT_LIMIT;

  const page = formData.get('page');
  cookie.page = Number(page) || 1;

  const limit = formData.get('limit');
  cookie.limit = Number(limit) || DEFAULT_LIMIT;

  if (cookie.limit > prevLimit) {
    const d = cookie.limit / prevLimit;
    cookie.page = Math.max(1, Math.ceil(prevPage / d));
  }

  return data(
    { page, limit },
    {
      headers: {
        'Set-Cookie': await prefsCookie.serialize(cookie)
      }
    }
  );
}

export interface ListProps {
  page: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (limit: number) => void;
  onRowClick: (recordId: string) => void;
}

function List({
  page,
  limit,
  onLimitChange,
  onPageChange,
  onRowClick
}: ListProps) {
  const { data, isFetching } = useListPokemons({
    offset: (page - 1) * limit,
    limit
  });

  return (
    <DataTable
      height={450}
      withTableBorder
      textSelectionDisabled
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      loaderType="dots"
      fetching={isFetching}
      idAccessor="name"
      totalRecords={data?.count}
      page={page}
      onPageChange={onPageChange}
      recordsPerPage={limit}
      recordsPerPageOptions={LIMIT_OPTIONS}
      onRecordsPerPageChange={onLimitChange}
      records={data?.results || []}
      columns={[{ accessor: 'name' }]}
      onRowClick={({ record }) => onRowClick(record.name)}
    />
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
    <Container size={840} my={80}>
      <HydrationBoundary state={qcState}>
        <List
          page={page}
          limit={limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          onRowClick={onRowClick}
        />
      </HydrationBoundary>
    </Container>
  );
}
