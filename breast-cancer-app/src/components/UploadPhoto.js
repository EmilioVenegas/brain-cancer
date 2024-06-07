import React, { useState } from "react";
import {
  Link,
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
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon, AttachmentIcon } from "@chakra-ui/icons";
import axios from "axios";

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

      const classification = {
        0: "_NORMAL",
        1: "Ependimoma",
        2: "Germinoma",
        3: "Granuloma",
        4: "Neurocitoma",
        5: "Schwannoma",
        6: "Astrocitoma",
        7: "Ganglioglioma",
        8: "Glioblastoma",
        9: "Meduloblastoma",
        10: "Oligodendroglioma",
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
    <Flex
      bgImage="url('brain.jpg')"
      height="110vh"
      bgPosition="center"
      bgSize="cover"
      p={5}
      justifyContent="center"
    >
      <VStack
        borderRadius="1.5rem"
        spacing={5}
        padding={5}
        height="100%"
        backdropFilter="blur(200px) brightness(105%)"
        maxWidth="50rem"
      >
        {/* <Button size="xs" onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Button> */}
        <HStack spacing={0}>
          <Image borderRadius="full" boxSize="80px" src="logo.png" alt="logo" />
          <VStack spacing={0}>
            <Heading textAlign="center" fontSize="3.5rem">
              NeuroScan
            </Heading>
            <Heading textAlign="center" fontSize="1.2rem">
              AI-Powered Brain MRI Analyzer
            </Heading>
          </VStack>
        </HStack>
        <Box
          justifyContent="center"
          width="38rem"
          maxWidth="100%"
          alignItems="center"
        >
          <Text textAlign="center" fontSize="0.8rem">
            NeuroScan is a web application that utilizes Convolutional Neural
            Networks (CNNs) for MRI brain scan analysis. Upload your MRI images
            to receive instant probabilities for tumor classification,
            distinguishing between various types such as ependymoma, germinoma,
            glioblastoma, and identifying normal scans.
          </Text>

          <Text textAlign="center" fontSize="0.6rem" color="gray.500">
            NeuroScan uses MRI brain images from various reputable datasets,
            enhanced with advanced preprocessing techniques. The dataset is
            resized to 227x227 pixels.
            <Link href="https://doi.org/10.17632/ywsbh3ndr8.2" isExternal>
              Dataset of Brain MRI images with Tumors
            </Link>
          </Text>
        </Box>

        <Flex flexDir="column" justifyContent="center" alignItems="center">
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
            fontColor="black"
            // colorScheme="white"
            backgroundColor="rgba(255,255,255,0.4)"
            cursor="pointer"
            size="sm"
            leftIcon={<AttachmentIcon />}
          >
            Upload brain MRI of region of interest
          </Button>
          {/* Display file name if image is selected */}
          {imagePreview && (
            <Text mt={2} textAlign="center" fontSize="0.5rem">
              File: {image?.name}
            </Text>
          )}
        </Flex>
        {/* Display image preview */}
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="MRI Preview"
            boxSize="227px"
            borderRadius="1rem"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          />
        )}
        {/* Button for cancer analysis */}
        {imagePreview && (
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="pink"
            onClick={handleSubmit}
          >
            Check for Cancer and classification
          </Button>
        )}
        {/* Display analysis result */}
        {result && (
          <Flex
            bg={colorMode}
            borderRadius="1.5rem"
            borderColor="gray.300"
            backgroundColor="rgba(255,255,255,0.7)"
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
    </Flex>
  );
};

export default UploadPhoto;
