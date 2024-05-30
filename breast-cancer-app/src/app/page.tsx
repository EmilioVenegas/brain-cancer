// src/app/page.tsx
"use client";

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
