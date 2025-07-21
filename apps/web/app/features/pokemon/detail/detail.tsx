import { Badge, Card, Center, Group, Skeleton, Text } from '@mantine/core';
import { useSuspenseGetPokemonByName } from '@pokedex/data-access';

import classes from './detail.module.css';

export interface PokemonDetailProps {
  name: string;
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const { data } = useSuspenseGetPokemonByName(name);

  const types = data.types.map((type) => (
    <Center key={type.type.name}>
      <Badge variant="outline">{type.type.name}</Badge>
    </Center>
  ));

  const abilities = data.abilities.map((ability) => (
    <Center key={ability.ability.name}>
      <Badge variant="outline" color="gray">
        {ability.ability.name}
      </Badge>
    </Center>
  ));

  const stats = data.stats.map((stat) => (
    <Center key={stat.stat.name}>
      <Badge variant="outline" color="grape">
        {stat.stat.name}: {stat.base_stat}
      </Badge>
    </Center>
  ));

  return (
    <Card w={320} withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <div>
          <Text fw={500}>{data.name}</Text>
        </div>
        {types}
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Abilities
        </Text>

        <Group gap={8} mb={-8}>
          {abilities}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Stats
        </Text>

        <Group gap={8} mb={-8}>
          {stats}
        </Group>
      </Card.Section>
    </Card>
  );
}

export function PokemonDetailSkeleton() {
  return (
    <Card w={320} withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <div>
          <Skeleton />
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Abilities
        </Text>

        <Group gap={8} mb={-8}>
          <Skeleton />
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Stats
        </Text>

        <Group gap={8} mb={-8}>
          <Skeleton />
        </Group>
      </Card.Section>
    </Card>
  );
}
