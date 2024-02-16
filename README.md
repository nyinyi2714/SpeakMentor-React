# SpeakMentor

This repository contains the source code for a web application designed to assist users in improving their English pronunciation. The app empowers users to record themselves speaking English words and receive targeted feedback on their pronunciation at the syllable level.

**Note:**
Currently, the app is under maintenance for switching from SpeechSuper API to Microsoft Azure services for speech analysis.


## Key Features

1. **Speech recording and playback:**
Users can record their pronunciations of English words and listen back to them for comparison.

2. **Syllable-level feedback:**
The app utilizes advanced speech analysis technology to identify and pinpoint mispronounced syllables within each word.

3. **Text-to-speech functionality:**
Users can input text and instantly hear the correct pronunciation thanks to Google Text to Speech API integration.

4. **Responsive design:**
The app seamlessly adapts to different screen sizes, ensuring optimal user experience across mobile and desktop devices.

## Technology Stack

- **Frontend:** React.js
- **Hosting:** AWS Amplify
- **Speech Recognition:** React Speech Recognition
- **Speech Analysis:** Microsoft Azure Speech Analysis
- **Text-to-Speech:** Google Text to Speech API

## Prerequisites

Before you begin, make sure you have the following software installed on your system:

- **Node.js:** [Download and install Node.js here.](https://nodejs.org/)

## Setting Up Environment Variables

To configure environment-specific settings for your app, create a `.env` file in the root directory of your project.

**Sample .env file structure:**

    ```dotenv
    REACT_APP_GOOGLE_TTS_KEY=
    REACT_APP_AZURE_SPEECH_KEY=
    REACT_APP_AZURE_SPEECH_REGION=
    REACT_APP_AZURE_SPEECH_ENDPOINT=

## Getting Started
To run the application locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/SpeakMentor.git

2. **Install Dependencies:**

    ```bash
    cd SpeakMentor-React
    npm install

3. **Start the Development Server:**
    ```bash 
    npm start

This will start the development server and open the app in your default web browser at http://localhost:3000.