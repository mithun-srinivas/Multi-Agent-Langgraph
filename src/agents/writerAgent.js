import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { config } from '../config.js';
import { 
  WRITER_SYSTEM_PROMPT, 
  createWriterPrompt, 
  createRefinementPrompt 
} from '../prompts/writerPrompt.js';

export const createWriterModel = () => {
  return new ChatGoogleGenerativeAI({
    apiKey: config.google.apiKey,
    model: config.google.model,
    temperature: config.agents.writer.temperature,
    maxOutputTokens: config.agents.writer.maxTokens,
  });
};

export const writerNode = async (state) => {
  console.log('✍️  Writing...');

  if (!state.researchCompleted || !state.research) {
    return {
      ...state,
      post: null,
      postGenerated: false,
      errors: [...(state.errors || []), 'Research must be completed before writing'],
    };
  }

  const model = createWriterModel();
  
  const messages = [
    new SystemMessage(WRITER_SYSTEM_PROMPT),
    new HumanMessage(createWriterPrompt(
      state.research,
      state.tone || 'professional yet approachable',
      state.authorContext || ''
    )),
  ];

  try {
    const response = await model.invoke(messages);
    const linkedinPost = response.content;

    return {
      ...state,
      post: linkedinPost,
      postGenerated: true,
    };
  } catch (error) {
    return {
      ...state,
      post: null,
      postGenerated: false,
      errors: [...(state.errors || []), `Writer error: ${error.message}`],
    };
  }
};

export const refineNode = async (state) => {
  console.log('🔄 Refining...');

  if (!state.post || !state.feedback) {
    return {
      ...state,
      errors: [...(state.errors || []), 'Post and feedback required for refinement'],
    };
  }

  const model = createWriterModel();
  
  const messages = [
    new SystemMessage(WRITER_SYSTEM_PROMPT),
    new HumanMessage(createRefinementPrompt(state.post, state.feedback)),
  ];

  try {
    const response = await model.invoke(messages);
    const refinedPost = response.content;

    return {
      ...state,
      post: refinedPost,
      refinementCount: (state.refinementCount || 0) + 1,
    };
  } catch (error) {
    return {
      ...state,
      errors: [...(state.errors || []), `Refinement error: ${error.message}`],
    };
  }
};

export const writePost = async (research, tone, authorContext) => {
  const state = { 
    research, 
    researchCompleted: true, 
    tone, 
    authorContext,
    errors: [] 
  };
  const result = await writerNode(state);
  
  if (!result.postGenerated) {
    throw new Error(result.errors.join(', '));
  }
  
  return result.post;
};

export default {
  createWriterModel,
  writerNode,
  refineNode,
  writePost,
};
