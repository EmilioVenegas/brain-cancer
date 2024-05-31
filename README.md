# CanserSense: AI-Powered Mammography Image Analyzer for Cancer Detection and Classification

By Emilio Venegas-Hernández.

## 📖 Project Overview

CancerSense employs deep learning techniques to develop a system for the classification of mammography images. Using the TensorFlow framework, Convolutional Neural Networks (CNNs) are built and trained to analyze and classify mammography images sourced from the INbreast, MIAS, and DDSM datasets. Preprocessing techniques are applied to ensure optimal image quality and feature extraction.

The trained model accurately classifies images into three categories: normal, benign, and malignant, providing a certainty percentage for each prediction. Additionally, a web application has been developed using React, Flask, and Chakra UI, allowing users to upload mammography images and receive classification results instantly.

This application aims to assist medical professionals and researchers in the early detection and diagnosis of breast cancer.

### Jupyter Notebook for Multi-Class Mammography Image Classification

[Go to Notebook](https://github.com/EmilioVenegas/breast-cancer-app/blob/main/CNN_breast_cancer.ipynb)

## 💻 Technologies Used

- TensorFlow
- Keras
- Flask
- Python
- Javascript
- React
- Chakra UI

## 📚 Workflow

### Image Upload:

- Users select and upload mammography images through a file input component, and the selected image is previewed on the screen.

### Form Submission and Image Analysis:

- When users click the "Check for Cancer" button, the application sends the selected image to the backend server for analysis.

### Backend Processing with Flask:

- The Flask server processes the uploaded image using a Convolutional Neural Network (CNN) model built with TensorFlow (Architecture based on model from BASEL ANAYA)
- The model analyzes the image and returns a classification result (normal, benign, or malignant) along with a probability score.

### Handling the Response:

- The response from the server contains the classification result and the probability score.
- These values are displayed on the UI, and a toast notification informs the user of the successful analysis.

### Result Visualization:

- The classification result and probability score are visually represented on the UI.
- The classification result is displayed with a color code indicating the category (normal, benign, or malignant).
- The probability score is shown using a circular progress bar, color-coded to indicate the level of certainty.

### Error Handling:

- If any errors occur during the image upload or analysis process, appropriate toast notifications inform the user of the issue.
- Error messages from the server response are captured and presented to the user for clarity.

## 🔍 Site Overview

The site offers a simple and intuitive interface for analyzing mammography images to detect cancer. Key features include:

Image Upload: Users can easily upload mammography images for analysis.

Analysis Initiation: With a single click, users can trigger the analysis process to determine if the uploaded image shows signs of cancer.

Result Display: Classification results (normal, benign, or malignant) and their associated probability scores are prominently displayed for easy interpretation.

Error Handling: Informative error messages guide users through any upload or analysis failures.

## 📖 Dataset

### Malign and benign mammograms

Malignant and benign mammograms from INbreast, MIAS, and DDSM datasets, were downloaded directly from Lin, Ting-Yu, and Huang, Mei-Ling.
_Dataset of Breast mammography images with Masses_
https://doi.org/10.17632/ywsbh3ndr8.2

### Normal mammograms

Normal mammograms were sourced from the DDSM webpage: http://www.eng.usf.edu/cvprg/Mammography/Database.html. However, the FTP service is currently not operational. Consequently, using BeautifulSoup (bs4) and PIL, thumbnails of all the normal datasets were extracted, resulting in a total of 2026 files. These files were then augmented and enhanced using CLAHE (Contrast Limited Adaptive Histogram Equalization).

Consult [Jupyter Notebook](https://github.com/EmilioVenegas/breast-cancer-app/blob/main/CNN_breast_cancer.ipynb) for more information on the methods used for extraction and enhancing from webpage of DDSM

### Get Dataset

Dataset of cropped and augmented mammograms was uploaded to [Kaggle](https://www.kaggle.com/datasets/emiliovenegas1/mammography-dataset-from-inbreast-mias-and-ddsm/data)

## 💼 Usage

```bash
$ flask run
$ npm dev run
```

## 📝 Contributing

Contributions are welcome! Please refer to the guidelines.
