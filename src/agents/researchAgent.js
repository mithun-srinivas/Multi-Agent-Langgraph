import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { config } from '../config.js';
import { RESEARCH_SYSTEM_PROMPT, createResearchPrompt } from '../prompts/researchPrompt.js';

export const researchNode = async (state) => {
  console.log('Researching...');

  const model = new ChatGoogleGenerativeAI({
    apiKey: config.apiKey,
    model: config.model,
    temperature: 0.7,
  });

  try {
    const response = await model.invoke([
      new SystemMessage(RESEARCH_SYSTEM_PROMPT),
      new HumanMessage(createResearchPrompt(state.industry, state.specificTopic)),
    ]);

    return { ...state, research: response.content, researchCompleted: true };
  } catch (error) {
    return { ...state, error: error.message };
  }
};
