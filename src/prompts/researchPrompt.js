export const RESEARCH_SYSTEM_PROMPT = `You are an expert research analyst for LinkedIn content. Identify trending topics, key insights, and statistics for the given industry.`;

export const createResearchPrompt = (industry, specificTopic) => {
  const focus = specificTopic ? `Focus on: ${specificTopic}` : 'Identify relevant trending topics';
  
  return `Research for LinkedIn content in the ${industry} industry.
${focus}

Provide:
1. Trending Topic
2. 3-4 Key Insights
3. Supporting Statistics
4. Content Angles`;
};
