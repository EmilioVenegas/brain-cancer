import React, { useState } from "react";
import {
  Link,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Button,
  Image,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { px } from "framer-motion";

const UploadPhoto = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Hook to toggle color mode

  // State variables to store image data, image preview URL, and analysis result
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [result, setResult] = useState("");
  const [probability, setProbability] = useState("");
  // Toast function for displaying notifications to the user
  const toast = useToast();
  const getColor = (probability) => {
    if (probability > 75) {
      return "green.400";
    } else if (probability > 50) {
      return "orange.400";
    } else {
      return "red.400";
    }
  };
  // Determine the color based on diagnosis result
  const getResultColor = (result) => {
    switch (result) {
      case "Normal":
        return "blue.500";
      case "Benign":
        return "green.500";
      case "Malign":
        return "red.600";
      default:
        return "gray.400";
    }
  };

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

    try {
      // Send the image for analysis to the local server using Axios
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 5000,
        }
      );

      // Handle the analysis result and display
      console.log(response);

      const clasification = {
        0: "Normal",
        1: "Benign",
        2: "Malign",
      };

      setResult(clasification[response.data.prediction]);
      setProbability((response.data.probability * 100).toFixed(1));

      // Assuming the response data contains a message or relevant data
      toast({
        title: "Image analysis successful",
        // description: response.data.prediction, // Adjust according to your response structure
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle errors and display an error toast
      console.log(error);
      toast({
        title: "Error uploading image",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Send the image for analysis

    // Handle the analysis result and display
  };

  // Render the upload form and preview
  return (
    <VStack spacing={5} padding={5}>
      <Button size="xs" onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
      <Heading textAlign="center">
        CancerSense: AI-Powered Mammography Analyzer
      </Heading>
      <Box justifyContent="center" width="50%" alignItems="center">
        <Text textAlign="justify">
          CancerSense is an advanced web application utilizing Convolutional
          Neural Networks (CNNs) for mammography analysis. Upload your
          mammography images to receive instant probabilities for cancer
          detection, distinguishing between benign and malignant tumors, and
          identifying normal scans.
        </Text>
        <Text textAlign="justify">
          CancerSense uses mammography images from INbreast, MIAS, and DDSM
          datasets, enhanced with preprocessing techniques. The dataset is
          resized to 227x227 pixels. <br />
          Credit: Lin, Ting-Yu, and Huang, Mei-Ling.
          <Link href="https://doi.org/10.17632/ywsbh3ndr8.2" isExternal>
            Dataset of Breast mammography images with Masses
          </Link>
        </Text>
      </Box>

      <Box justifyContent="center" alignItems="center">
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
          Upload Mammography
        </Button>
        {/* Display file name if image is selected */}
        {imagePreview && (
          <Text mt={2} maxWidth="15rem" fontSize="xs">
            File: {image?.name}
          </Text>
        )}
      </Box>
      {/* Display image preview */}
      {imagePreview && (
        <Image
          src={imagePreview}
          alt="Mammography Preview"
          boxSize="227px"
          borderRadius="1rem"
        />
      )}
      {/* Button for cancer analysis */}
      {imagePreview && (
        <Button colorScheme="pink" onClick={handleSubmit}>
          Check for Cancer
        </Button>
      )}
      {/* Display analysis result */}
      {result && (
        <Flex
          bg={colorMode}
          borderRadius="1.5rem"
          borderColor="gray.300"
          borderWidth="1px"
          p="1rem"
          alignItems="center"
        >
          <Box>
            <Stat>
              <StatLabel>Result</StatLabel>
              <StatNumber fontSize="2.5rem" color={getResultColor(result)}>
                {result}
              </StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>
          </Box>
          <Flex alignItems="center">
            <Box ml={10}>
              <Stat>
                <StatLabel>Certainty</StatLabel>
              </Stat>
              <CircularProgress
                value={probability}
                color={getColor(probability)}
                thickness="10px"
                size="4.2rem"
              >
                <CircularProgressLabel fontSize="0.8rem" fontWeight="bold">
                  {probability}%
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
          </Flex>
        </Flex>
      )}
    </VStack>
  );
};

export default UploadPhoto;
