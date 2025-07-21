import {
  createTheme,
  MantineProvider,
  MantineThemeOverride
} from '@mantine/core';

export const defaultTheme = createTheme({});

export interface ThemeProviderProps {
  theme?: MantineThemeOverride;
  children?: React.ReactNode;
}

export function ThemeProvider({
  theme = defaultTheme,
  children
}: ThemeProviderProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
