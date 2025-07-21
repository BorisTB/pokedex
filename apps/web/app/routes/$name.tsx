import type { Route } from './+types/$name';
import { getPokemonByName, getQueryClient } from '@pokedex/data-access';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Link } from 'react-router';
import {
  PokemonDetail,
  PokemonDetailSkeleton
} from '../features/pokemon/detail';
import { Suspense } from 'react';
import { BasicErrorBoundary } from '../error/basic-error-boundary';
import { Divider } from '@mantine/core';

export async function loader({ params }: Route.LoaderArgs) {
  const { pokemonName } = params;

  const queryClient = getQueryClient();
  const queryOptions = getPokemonByName(pokemonName);

  queryClient.prefetchQuery(queryOptions);

  return { qcState: dehydrate(queryClient), pokemonName };
}

export default function PokemonProfilePage({
  loaderData
}: Route.ComponentProps) {
  const { qcState, pokemonName } = loaderData;

  return (
    <HydrationBoundary state={qcState}>
      <Link to="/">{`<- Back to list`}</Link>
      <Divider />
      <BasicErrorBoundary>
        <Suspense fallback={<PokemonDetailSkeleton />}>
          <PokemonDetail name={pokemonName} />
        </Suspense>
      </BasicErrorBoundary>
    </HydrationBoundary>
  );
}
