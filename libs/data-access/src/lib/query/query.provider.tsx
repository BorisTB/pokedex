import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './query-client';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
