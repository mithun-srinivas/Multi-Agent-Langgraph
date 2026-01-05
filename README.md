# Multi-Agent LinkedIn Post Generator

A multi-agent application that generates LinkedIn posts using LangGraph JS and Google Gemini.

## Architecture

Two AI agents orchestrated by LangGraph:

```
User Input -> Research Agent -> Writer Agent -> LinkedIn Post
```

- **Research Agent** - Finds trending topics and insights for the given industry
- **Writer Agent** - Creates engaging LinkedIn posts from research

## Project Structure

```
src/
├── index.js              # Main entry point
├── config.js             # Configuration
├── agents/
│   ├── researchAgent.js  # Research agent
│   └── writerAgent.js    # Writer agent
├── graph/
│   ├── state.js          # State schema
│   └── workflow.js       # LangGraph workflow
└── prompts/
    ├── researchPrompt.js # Research prompts
    └── writerPrompt.js   # Writer prompts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file with your API key:

```
GOOGLE_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

3. Run:

```bash
npm start
```

## Configuration

Edit `src/index.js` to change the input:

```javascript
const result = await runWorkflow({
  industry: 'artificial intelligence',
  specificTopic: 'AI-powered productivity tools',
  tone: 'inspirational',
  authorContext: 'A tech professional',
});
```

### Options

| Option | Description |
|--------|-------------|
| `industry` | Target industry (required) |
| `specificTopic` | Specific topic to focus on |
| `tone` | Writing tone (professional, casual, inspirational) |
| `authorContext` | Context about the author |

## Output

Posts are saved to `./output/post-{timestamp}.txt`

## Dependencies

- `@langchain/langgraph` - Multi-agent orchestration
- `@langchain/google-genai` - Gemini model integration
- `@langchain/core` - Core LangChain utilities
- `dotenv` - Environment variable management
