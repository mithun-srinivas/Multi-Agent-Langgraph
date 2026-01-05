export const RESEARCH_SYSTEM_PROMPT = `You are an expert research analyst specializing in identifying trending topics and insights for professional LinkedIn content.

Your role is to:
1. Identify current trending topics in the specified industry or niche
2. Find compelling angles and unique perspectives on these topics
3. Gather key statistics, facts, and insights that would resonate with a professional audience
4. Identify pain points and opportunities that professionals care about

Always provide well-researched, factual information that can be used to create engaging LinkedIn content.`;

export const createResearchPrompt = (industry, specificTopic = null) => {
  const topicFocus = specificTopic 
    ? `Focus specifically on: ${specificTopic}`
    : 'Identify the most relevant and timely topics';

  return `Research trending topics and insights for LinkedIn content in the ${industry} industry.

${topicFocus}

Provide a DETAILED research brief with:

1. **Trending Topic**: A specific, timely topic that professionals are discussing right now

2. **Key Insights** (provide 3-4 detailed insights):
   - Main insight with explanation
   - Secondary insight with context
   - Contrarian or surprising perspective
   - Practical application

3. **Supporting Data**: 
   - 3-4 relevant statistics with sources
   - Recent trends or changes
   - Industry benchmarks

4. **Target Audience Pain Points**:
   - Primary challenge this addresses
   - Secondary concerns
   - What keeps them up at night

5. **Content Angles** (provide 2-3):
   - Compelling hooks that would grab attention
   - Unique perspectives to explore
   - Questions that spark discussion

6. **Actionable Takeaways**:
   - What readers can do with this information
   - Practical tips or advice

Make your research comprehensive - the writer will use this to create a detailed LinkedIn post.`;
};

export default {
  RESEARCH_SYSTEM_PROMPT,
  createResearchPrompt,
};
