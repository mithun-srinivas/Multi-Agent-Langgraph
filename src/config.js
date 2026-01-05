import dotenv from 'dotenv';

dotenv.config();

export const config = {
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  },

  agents: {
    research: {
      name: 'ResearchAgent',
      temperature: 0.7,
      maxTokens: 2048,
    },
    writer: {
      name: 'WriterAgent',
      temperature: 0.9,
      maxTokens: 4096,
    },
  },

  linkedin: {
    maxLength: 3000,
    idealLength: 1500,
  },
};

export const validateConfig = () => {
  if (!config.google.apiKey) {
    throw new Error(
      'GOOGLE_API_KEY is required. Please set it in your .env file.\n' +
      'Get your API key from: https://aistudio.google.com/app/apikey'
    );
  }
  return true;
};

export default config;
