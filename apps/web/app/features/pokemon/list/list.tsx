import { LIMIT_OPTIONS, useListPokemons } from '@pokedex/data-access';
import { DataTable } from 'mantine-datatable';
import { useMounted } from '@mantine/hooks';
import { NamedAPIResourceList } from 'pokenode-ts';

export interface PokemonListProps {
  page: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (limit: number) => void;
  onRowClick: (recordId: string) => void;
}

export function PokemonList({
  page,
  limit,
  onLimitChange,
  onPageChange,
  onRowClick
}: PokemonListProps) {
  const { data, isFetching } = useListPokemons({
    offset: (page - 1) * limit,
    limit
  });

  const mounted = useMounted();

  const records: NamedAPIResourceList['results'] =
    mounted && data?.results ? data.results : [];
  const fetching = isFetching || !mounted;
  const totalRecords = mounted ? data?.count : 0;

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
      fetching={fetching}
      idAccessor="name"
      totalRecords={totalRecords}
      page={page}
      onPageChange={onPageChange}
      recordsPerPage={limit}
      recordsPerPageOptions={LIMIT_OPTIONS}
      onRecordsPerPageChange={onLimitChange}
      records={records}
      columns={[{ accessor: 'name' }]}
      onRowClick={({ record }) => onRowClick(record.name)}
    />
  );
}
