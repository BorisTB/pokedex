import type { Route } from './+types/$name';
import {
  getPokemonByName,
  getQueryClient,
  useGetPokemonByName
} from '@pokedex/data-access';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Container } from '@mantine/core';

export async function loader({ params }: Route.LoaderArgs) {
  const { pokemonName } = params;

  const queryClient = getQueryClient();
  const queryOptions = getPokemonByName(pokemonName);

  queryClient.prefetchQuery(queryOptions);

  return { qcState: dehydrate(queryClient), pokemonName };
}

export interface PokemonProfileProps {
  name: string;
}

function PokemonProfile({ name }: PokemonProfileProps) {
  const { data, isFetching } = useGetPokemonByName(name);

  return (
    <div>
      <div>{data?.name}</div>
      <div>{data?.height}</div>
      <div>
        {data?.abilities?.map((ability) => (
          <div key={ability.ability.name}>
            <div>{ability.ability.name}</div>
            <div>{ability.slot}</div>
            <div>{ability.is_hidden}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PokemonProfilePage({
  loaderData
}: Route.ComponentProps) {
  const { qcState, pokemonName } = loaderData;

  return (
    <Container size={840} my={80}>
      <Link to="/">BACK</Link>
      <HydrationBoundary state={qcState}>
        <PokemonProfile name={pokemonName} />
      </HydrationBoundary>
    </Container>
  );
}
