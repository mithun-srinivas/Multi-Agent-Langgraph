import { Annotation } from '@langchain/langgraph';

export const WorkflowState = Annotation.Root({
  industry: Annotation({
    reducer: (_, y) => y,
    default: () => '',
  }),
  specificTopic: Annotation({
    reducer: (_, y) => y,
    default: () => null,
  }),
  tone: Annotation({
    reducer: (_, y) => y,
    default: () => 'professional yet approachable',
  }),
  authorContext: Annotation({
    reducer: (_, y) => y,
    default: () => '',
  }),

  research: Annotation({
    reducer: (_, y) => y,
    default: () => null,
  }),
  researchCompleted: Annotation({
    reducer: (_, y) => y,
    default: () => false,
  }),

  post: Annotation({
    reducer: (_, y) => y,
    default: () => null,
  }),
  postGenerated: Annotation({
    reducer: (_, y) => y,
    default: () => false,
  }),

  feedback: Annotation({
    reducer: (_, y) => y,
    default: () => null,
  }),
  refinementCount: Annotation({
    reducer: (_, y) => y,
    default: () => 0,
  }),

  errors: Annotation({
    reducer: (x, y) => [...x, ...y],
    default: () => [],
  }),
});

export const createInitialState = (input = {}) => ({
  industry: input.industry || '',
  specificTopic: input.specificTopic || null,
  tone: input.tone || 'professional yet approachable',
  authorContext: input.authorContext || '',
  research: null,
  researchCompleted: false,
  post: null,
  postGenerated: false,
  feedback: null,
  refinementCount: 0,
  errors: [],
});

export default {
  WorkflowState,
  createInitialState,
};
