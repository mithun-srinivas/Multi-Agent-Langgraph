import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { config } from '../config.js';
import { WRITER_SYSTEM_PROMPT, createWriterPrompt } from '../prompts/writerPrompt.js';

export const writerNode = async (state) => {
  console.log('Writing...');

  if (!state.researchCompleted) {
    return { ...state, error: 'Research not completed' };
  }

  const model = new ChatGoogleGenerativeAI({
    apiKey: config.apiKey,
    model: config.model,
    temperature: 0.9,
  });

  try {
    const response = await model.invoke([
      new SystemMessage(WRITER_SYSTEM_PROMPT),
      new HumanMessage(createWriterPrompt(state.research, state.tone, state.authorContext)),
    ]);

    return { ...state, post: response.content, postGenerated: true };
  } catch (error) {
    return { ...state, error: error.message };
  }
};
