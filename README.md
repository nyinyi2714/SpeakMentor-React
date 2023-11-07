#SpeakMentor.io README
Welcome to SpeakMentor.io! This is a simple guide to help you clone and run the application on your local machine.

##Prerequisites
Before you begin, make sure you have the following software installed on your system:

Node.js: Download and install Node.js
##Clone the Repository
Open your terminal or command prompt.
Navigate to the directory where you want to clone the repository.
cd /path/to/your/directory
##Clone the repository from GitHub using the following command:
git clone https://github.com/nyinyi2714/check-pronunciation-frontend.git

Change your working directory to the cloned repository:
cd check-pronunciation-frontend
##Setting Up Environment Variables
To configure environment-specific settings for your app, create a .env file in the root directory of your project.

Sample .env file structure:

REACT_APP_SPEECHSUPER_APP_KEY=appKey
REACT_APP_SPEECHSUPER_SECRET_KEY=secretKey
Replace appKey and secretKey with the actual app key and secret key.

Install Dependencies
Before running the app, you need to install its dependencies. In the project's root directory, run the following command:

npm install
This command will read the package.json file and install all the necessary packages.

Running the App
To start the development server and run the app locally, use the following command:

npm start
This will start the development server and open your app in your default web browser at http://localhost:3000.
