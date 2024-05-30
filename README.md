# Image-Captioning-Project

By Emilio Venegas-Hernández.

## 📖 Project Overview

This project employs deep learning techniques to develop a system for the classification of mammography images. Using the TensorFlow framework, Convolutional Neural Networks (CNNs) are built and trained to analyze and classify mammography images sourced from the INbreast, MIAS, and DDSM datasets. Preprocessing techniques are applied to ensure optimal image quality and feature extraction.

The trained model accurately classifies images into three categories: normal, benign, and malignant, providing a certainty percentage for each prediction. Additionally, a web application has been developed using React, Flask, and Chakra UI, allowing users to upload mammography images and receive classification results instantly.

This application aims to assist medical professionals and researchers in the early detection and diagnosis of breast cancer.

## 💻 Technologies Used

- TensorFlow
- Flask
- Python
- Javascript

## 📚 Workflow

### User Interface with React and Chakra UI:

-The application provides a user-friendly interface built with React and styled using Chakra UI components.
-Users can upload a mammography image, view image previews, and initiate cancer analysis.

### Image Upload:

-Users select and upload mammography images through a file input component, and the selected image is previewed on the screen.

### Form Submission and Image Analysis:

-When users click the "Check for Cancer" button, the application sends the selected image to the backend server for analysis.

### Backend Processing with Flask:

-The Flask server processes the uploaded image using a Convolutional Neural Network (CNN) model built with TensorFlow.
-The model analyzes the image and returns a classification result (normal, benign, or malignant) along with a probability score.

### Handling the Response:

-The response from the server contains the classification result and the probability score.
-These values are displayed on the UI, and a toast notification informs the user of the successful analysis.

### Result Visualization:

-The classification result and probability score are visually represented on the UI.
-The classification result is displayed with a color code indicating the category (normal, benign, or malignant).
-The probability score is shown using a circular progress bar, color-coded to indicate the level of certainty.

### Error Handling:

-If any errors occur during the image upload or analysis process, appropriate toast notifications inform the user of the issue.
-Error messages from the server response are captured and presented to the user for clarity.

## 🔍 Site Overview

The site offers a simple and intuitive interface for analyzing mammography images to detect cancer. Key features include:

Image Upload: Users can easily upload mammography images for analysis.

Analysis Initiation: With a single click, users can trigger the analysis process to determine if the uploaded image shows signs of cancer.

Result Display: Classification results (normal, benign, or malignant) and their associated probability scores are prominently displayed for easy interpretation.

Error Handling: Informative error messages guide users through any upload or analysis failures.

## 💼 Usage

```bash
$ flask run
$ npm dev run
```

## 📝 Contributing

Contributions are welcome! Please refer to the guidelines.
