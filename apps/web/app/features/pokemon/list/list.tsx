import { LIMIT_OPTIONS, useListPokemons } from '@pokedex/data-access';
import { DataTable } from 'mantine-datatable';

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
