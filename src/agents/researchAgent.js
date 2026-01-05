import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { config } from '../config.js';
import { RESEARCH_SYSTEM_PROMPT, createResearchPrompt } from '../prompts/researchPrompt.js';

export const createResearchModel = () => {
  return new ChatGoogleGenerativeAI({
    apiKey: config.google.apiKey,
    model: config.google.model,
    temperature: config.agents.research.temperature,
    maxOutputTokens: config.agents.research.maxTokens,
  });
};

export const researchNode = async (state) => {
  console.log('🔍 Researching...');

  const model = createResearchModel();
  
  const messages = [
    new SystemMessage(RESEARCH_SYSTEM_PROMPT),
    new HumanMessage(createResearchPrompt(state.industry, state.specificTopic)),
  ];

  try {
    const response = await model.invoke(messages);
    const researchFindings = response.content;

    return {
      ...state,
      research: researchFindings,
      researchCompleted: true,
      errors: [],
    };
  } catch (error) {
    return {
      ...state,
      research: null,
      researchCompleted: false,
      errors: [...(state.errors || []), `Research error: ${error.message}`],
    };
  }
};

export const runResearch = async (industry, specificTopic = null) => {
  const state = { industry, specificTopic, errors: [] };
  const result = await researchNode(state);
  
  if (!result.researchCompleted) {
    throw new Error(result.errors.join(', '));
  }
  
  return result.research;
};

export default {
  createResearchModel,
  researchNode,
  runResearch,
};
