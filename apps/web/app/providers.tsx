import { QueryProvider } from '@pokedex/data-access';
import { ThemeProvider } from '@pokedex/ui';

export interface ProvidersProps {
  children?: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
}
