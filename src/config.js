import dotenv from 'dotenv';
dotenv.config();

export const config = {
  apiKey: process.env.GOOGLE_API_KEY,
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
};

export const validateConfig = () => {
  if (!config.apiKey) {
    throw new Error('GOOGLE_API_KEY is required. Set it in your .env file.');
  }
};
