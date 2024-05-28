import React from "react";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import UploadPhoto from "./components/UploadPhoto";

function App() {
  return (
    <ChakraProvider>
      <Box bg="gray.100" minHeight="100vh" py={10}>
        <Container maxW="container.md" centerContent>
          <UploadPhoto />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
