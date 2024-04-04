const config = {
  backendUrl: "http://54.173.235.5:8000",
  dictionaryAPI: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  googleTTSKey: process.env.REACT_APP_GOOGLE_TTS_KEY,
  azureSpeechKey: process.env.REACT_APP_AZURE_SPEECH_KEY,
  azureRegionKey: process.env.REACT_APP_AZURE_SPEECH_REGION,
  azureEndpoint: process.env.REACT_APP_AZURE_SPEECH_ENDPOINT,
  stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
};

export default config;