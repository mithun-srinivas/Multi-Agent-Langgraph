import { StateGraph, END, START } from '@langchain/langgraph';
import { WorkflowState } from './state.js';
import { researchNode } from '../agents/researchAgent.js';
import { writerNode, refineNode } from '../agents/writerAgent.js';

export const NODES = {
  RESEARCH: 'researcher',
  WRITE: 'writer',
  REFINE: 'refiner',
};

const shouldContinueAfterResearch = (state) => {
  if (state.researchCompleted && state.research) {
    return NODES.WRITE;
  }
  return END;
};

const shouldRefine = (state) => {
  if (state.feedback && state.refinementCount < 3) {
    return NODES.REFINE;
  }
  return END;
};

export const createWorkflow = () => {
  const workflow = new StateGraph(WorkflowState);

  workflow.addNode(NODES.RESEARCH, researchNode);
  workflow.addNode(NODES.WRITE, writerNode);
  workflow.addNode(NODES.REFINE, refineNode);

  workflow.addEdge(START, NODES.RESEARCH);

  workflow.addConditionalEdges(
    NODES.RESEARCH,
    shouldContinueAfterResearch,
    {
      [NODES.WRITE]: NODES.WRITE,
      [END]: END,
    }
  );

  workflow.addConditionalEdges(
    NODES.WRITE,
    shouldRefine,
    {
      [NODES.REFINE]: NODES.REFINE,
      [END]: END,
    }
  );

  workflow.addConditionalEdges(
    NODES.REFINE,
    shouldRefine,
    {
      [NODES.REFINE]: NODES.REFINE,
      [END]: END,
    }
  );

  return workflow.compile();
};

export const runWorkflow = async (input) => {
  const workflow = createWorkflow();
  
  const result = await workflow.invoke({
    industry: input.industry,
    specificTopic: input.specificTopic || null,
    tone: input.tone || 'professional yet approachable',
    authorContext: input.authorContext || '',
    errors: [],
  });

  return result;
};

export async function* streamWorkflow(input) {
  const workflow = createWorkflow();
  
  const stream = await workflow.stream({
    industry: input.industry,
    specificTopic: input.specificTopic || null,
    tone: input.tone || 'professional yet approachable',
    authorContext: input.authorContext || '',
    errors: [],
  });

  for await (const state of stream) {
    yield state;
  }
}

export default {
  createWorkflow,
  runWorkflow,
  streamWorkflow,
  NODES,
};
