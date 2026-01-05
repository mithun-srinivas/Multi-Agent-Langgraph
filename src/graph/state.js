import { Annotation } from '@langchain/langgraph';

export const WorkflowState = Annotation.Root({
  industry: Annotation({ reducer: (_, y) => y, default: () => '' }),
  specificTopic: Annotation({ reducer: (_, y) => y, default: () => null }),
  tone: Annotation({ reducer: (_, y) => y, default: () => 'professional' }),
  authorContext: Annotation({ reducer: (_, y) => y, default: () => '' }),
  research: Annotation({ reducer: (_, y) => y, default: () => null }),
  researchCompleted: Annotation({ reducer: (_, y) => y, default: () => false }),
  post: Annotation({ reducer: (_, y) => y, default: () => null }),
  postGenerated: Annotation({ reducer: (_, y) => y, default: () => false }),
  error: Annotation({ reducer: (_, y) => y, default: () => null }),
});
