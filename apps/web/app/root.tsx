import {
  isRouteErrorResponse,
  Links,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'react-router';
import type { Route } from './+types/root';
import Providers from './providers';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { AppLayout, ErrorDetail, ThemeProvider } from '@pokedex/ui';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

export const meta: MetaFunction = () => [
  {
    title: 'Pokedex'
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Providers>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return <ErrorDetail message={message} details={details} stack={stack} />;
}
