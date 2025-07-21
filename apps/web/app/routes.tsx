import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./routes/list.tsx'),
  route('detail/:pokemonName', './routes/$name.tsx')
] satisfies RouteConfig;
