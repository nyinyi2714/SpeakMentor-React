const config = {
  backendUrl: "http://18.119.99.102",
  dictionaryAPI: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  speechSuperAppKey: process.env.REACT_APP_SPEECHSUPER_API_KEY,
  speechSuperSecretKey: process.env.REACT_APP_SPEECHSUPER_SECRET_KEY,
  googleTTSKey: process.env.REACT_APP_GOOGLE_TTS_KEY,
  azureSpeechKey: process.env.REACT_APP_AZURE_SPEECH_KEY,
  azureRegionKey: process.env.REACT_APP_AZURE_SPEECH_REGION,
  azureEndpoint: process.env.REACT_APP_AZURE_SPEECH_ENDPOINT,
  stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
};

export default config;