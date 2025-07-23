import { QueryProvider } from '@pokedex/data-access';

export interface ProvidersProps {
  children?: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
