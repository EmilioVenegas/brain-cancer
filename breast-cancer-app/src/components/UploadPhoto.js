// src/components/UploadPhoto.js
// This component allows users to upload a mammography image,
// preview it, and check for cancer using a server-side analysis.

import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const UploadPhoto = () => {
  // State variables to store image data, image preview URL, and analysis result
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [result, setResult] = useState("");
  // Toast function for displaying notifications to the user
  const toast = useToast();

  // Event handler for when the user selects an image file
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Function to handle form submission when the user checks for cancer
  const handleSubmit = async () => {
    if (!image) {
      // Display an error toast if no image is uploaded
      toast({
        title: "No image uploaded",
        description: "Please upload an image to check.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Prepare form data with the selected image
    const formData = new FormData();
    formData.append("file", image);

    // Send the image for analysis

    // Handle the analysis result and display
  };

  // Render the upload form and preview
  return (
    <VStack spacing={5} padding={5}>
      <Heading>Upload a Mammography</Heading>
      <Box>
        {/* Hidden file input element */}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file-upload"
          style={{ display: "none" }}
        />

        {/* Button to trigger file input selection */}
        <Button
          as="label"
          htmlFor="file-upload"
          colorScheme="pink"
          cursor="pointer"
        >
          Choose File
        </Button>
        {/* Display file name if image is selected */}
        {imagePreview && <Text mt={2}>File: {image?.name}</Text>}
      </Box>
      {/* Display image preview */}
      {imagePreview && (
        <Image src={imagePreview} alt="Mammography Preview" boxSize="300px" />
      )}

      {/* Button for cancer analysis */}
      <Button colorScheme="pink" onClick={handleSubmit}>
        Check for Cancer
      </Button>

      {/* Display analysis result */}
      {result && (
        <Box mt={5} p={5} borderWidth="1px" borderRadius="lg" width="100%">
          <Text fontSize="lg">Result: {result}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default UploadPhoto;
