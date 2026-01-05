export const WRITER_SYSTEM_PROMPT = `You are an expert LinkedIn content creator. Write engaging posts that are 800-1500 characters with 2-3 paragraphs.`;

export const createWriterPrompt = (research, tone, authorContext) => {
  return `Write a LinkedIn post based on this research:

${research}

Requirements:
- Tone: ${tone || 'professional yet approachable'}
- Length: 800-1500 characters
- Format: 2-3 paragraphs with blank lines
- End with an engaging question
${authorContext ? `- Author context: ${authorContext}` : ''}`;
};
