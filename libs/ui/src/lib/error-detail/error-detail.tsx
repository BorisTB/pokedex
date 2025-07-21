import { Box, Code, Container, Text, Title } from '@mantine/core';

export interface ErrorDetailProps {
  message?: string;
  details?: string;
  stack?: string;
}

export function ErrorDetail({ message, details, stack }: ErrorDetailProps) {
  return (
    <Container component="main" pt="xl" p="md" mx="auto">
      <Title>{message}</Title>
      <Text>{details}</Text>
      {stack && (
        <Box component="pre" w="100%" style={{ overflowX: 'auto' }} p="md">
          <Code>{stack}</Code>
        </Box>
      )}
    </Container>
  );
}
