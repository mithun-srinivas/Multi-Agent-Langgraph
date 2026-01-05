export const WRITER_SYSTEM_PROMPT = `You are an expert LinkedIn content creator. You write detailed, engaging posts.

CRITICAL RULES YOU MUST FOLLOW:
1. Every post MUST be 800-1500 characters long (count them!)
2. Every post MUST have 2-3 paragraphs separated by blank lines
3. Use line breaks between paragraphs for readability
4. Each paragraph should be 3-5 sentences
5. Always include a hook, body, and call-to-action

Your posts are known for being substantial, valuable, and well-formatted.`;

export const createWriterPrompt = (research, tone = 'professional yet approachable', authorContext = '') => {
  const authorInfo = authorContext 
    ? `\nAuthor Context: ${authorContext}`
    : '';

  return `Write a LinkedIn post based on this research:

${research}

STRICT REQUIREMENTS:
- Tone: ${tone}
- Length: 800-1500 characters (THIS IS MANDATORY - count your characters!)
- Format: 2-3 paragraphs with BLANK LINES between them
- Include 2-3 emojis
- End with an engaging question${authorInfo}

EXAMPLE FORMAT (follow this structure):

🚀 [Hook - A bold opening statement or question that grabs attention. Make it compelling and relevant to professionals. This should make people stop scrolling.]

[Body paragraph 1 - Expand on the topic. Share insights, statistics, or personal observations. Explain why this matters. Add specific examples or data points. Make it valuable and informative. This paragraph should be substantial.]

[Body paragraph 2 - Continue developing your point. Add more value, tips, or perspectives. Include actionable advice or thought-provoking insights. Connect it to the reader's experience.]

💡 [Call to action - End with a question or invitation for discussion. What do you think? Have you experienced this? Share your thoughts below!]

NOW WRITE THE FULL POST (remember: 800-1500 characters, multiple paragraphs with line breaks):`;
};

export const createRefinementPrompt = (originalPost, feedback) => {
  return `Refine the following LinkedIn post based on the feedback provided:

ORIGINAL POST:
${originalPost}

FEEDBACK:
${feedback}

Please improve the post while maintaining its core message and authenticity.
Keep the post between 800-1500 characters with proper line breaks between paragraphs.`;
};

export default {
  WRITER_SYSTEM_PROMPT,
  createWriterPrompt,
  createRefinementPrompt,
};
