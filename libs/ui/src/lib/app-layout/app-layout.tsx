import React from 'react';
import { Container } from '@mantine/core';

export interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container size={840} my={80}>
      {children}
    </Container>
  );
}
