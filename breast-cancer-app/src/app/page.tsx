// src/app/page.tsx
"use client"; // Add this to mark the component as a Client Component

import React from "react";
import {
  ChakraProvider,
  ColorModeProvider,
  Box,
  Container,
} from "@chakra-ui/react";
import UploadPhoto from "../components/UploadPhoto";

const Home: React.FC = () => {
  return (
    <ChakraProvider>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true,
        }}
      >
        <UploadPhoto />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default Home;
