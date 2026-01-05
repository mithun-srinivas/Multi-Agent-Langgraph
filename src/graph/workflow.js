import { StateGraph, END, START } from '@langchain/langgraph';
import { WorkflowState } from './state.js';
import { researchNode } from '../agents/researchAgent.js';
import { writerNode } from '../agents/writerAgent.js';

export const createWorkflow = () => {
  const workflow = new StateGraph(WorkflowState);

  workflow.addNode('researcher', researchNode);
  workflow.addNode('writer', writerNode);

  workflow.addEdge(START, 'researcher');
  workflow.addEdge('researcher', 'writer');
  workflow.addEdge('writer', END);

  return workflow.compile();
};

export const runWorkflow = async (input) => {
  const workflow = createWorkflow();
  return await workflow.invoke({
    industry: input.industry,
    specificTopic: input.specificTopic || null,
    tone: input.tone || 'professional',
    authorContext: input.authorContext || '',
  });
};
