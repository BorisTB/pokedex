import { useGetPokemonByName } from '@pokedex/data-access';

export interface PokemonDetailProps {
  name: string;
}

export function PokemonDetail({ name }: PokemonDetailProps) {
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
