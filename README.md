# Multi-Agent LinkedIn Post Generator

A modular, multi-agent application that generates engaging LinkedIn posts using **LangGraph JS** and **Google Gemini** models.

## 🏗️ Architecture

This application uses two specialized AI agents orchestrated by LangGraph:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   User Input    │────▶│ Research Agent  │────▶│  Writer Agent   │
│   (Industry,    │     │ (Finds trending │     │ (Creates post)  │
│    Topic)       │     │  topics)        │     │                 │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │                        │
                              ▼                        ▼
                        ┌─────────────────────────────────┐
                        │         Final LinkedIn Post      │
                        └─────────────────────────────────┘
```

### Agents

1. **Research Agent** 🔍
   - Identifies trending topics in the specified industry
   - Gathers key insights, statistics, and pain points
   - Creates compelling content hooks

2. **Writer Agent** ✍️
   - Transforms research into engaging LinkedIn posts
   - Applies best practices for LinkedIn engagement
   - Supports multiple tones and writing styles

## 📁 Project Structure

```
multi-agent-linkedin-post-generator/
├── src/
│   ├── index.js              # Main entry point
│   ├── config.js             # Configuration management
│   ├── agents/
│   │   ├── researchAgent.js  # Research agent implementation
│   │   └── writerAgent.js    # Writer agent implementation
│   ├── graph/
│   │   ├── state.js          # State schema definition
│   │   └── workflow.js       # LangGraph workflow
│   ├── prompts/
│   │   ├── researchPrompt.js # Research agent prompts
│   │   └── writerPrompt.js   # Writer agent prompts
│   └── utils/
│       └── formatters.js     # Utility functions
├── env.sample                # Environment variables template
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the sample environment file and add your API key:

```bash
cp env.sample .env
```

Edit `.env` and add your Google Gemini API key:

```
GOOGLE_API_KEY=your_api_key_here
```

> 🔑 Get your API key from: https://aistudio.google.com/app/apikey

### 3. Run the Application

```bash
npm start
```

## 💻 Usage

### Basic Usage

```javascript
import { generateLinkedInPost } from './src/index.js';

const result = await generateLinkedInPost({
  industry: 'technology',
  specificTopic: 'AI automation in software development',
  tone: 'inspirational',
  authorContext: 'A senior developer with 10 years of experience',
});

console.log(result.post);
```

### Available Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `industry` | string | Target industry (required) | - |
| `specificTopic` | string | Specific topic to focus on | Auto-selected |
| `tone` | string | Writing tone | "professional yet approachable" |
| `authorContext` | string | Context about the author | - |

### Tone Options

- `professional` - Business-focused, formal
- `casual` - Friendly, conversational
- `inspirational` - Motivational, uplifting
- `educational` - Informative, teaching-focused
- `thought-provoking` - Challenges conventional thinking

### Using Individual Agents

You can also use the agents independently:

```javascript
import { runResearch } from './src/agents/researchAgent.js';
import { writePost } from './src/agents/writerAgent.js';

// Run research only
const research = await runResearch('fintech', 'digital payments');

// Write from existing research
const post = await writePost(research, 'professional');
```

### Streaming Updates

```javascript
import { generateLinkedInPostStream } from './src/index.js';

for await (const update of generateLinkedInPostStream({
  industry: 'marketing',
})) {
  console.log('Update:', update);
}
```

## 🔧 Configuration

Configuration can be customized in `src/config.js`:

```javascript
export const config = {
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-1.5-flash', // or 'gemini-1.5-pro'
  },
  agents: {
    research: {
      temperature: 0.7,  // Higher = more creative
      maxTokens: 2048,
    },
    writer: {
      temperature: 0.8,
      maxTokens: 1024,
    },
  },
};
```

## 📊 Workflow States

The LangGraph workflow manages these states:

| State | Description |
|-------|-------------|
| `industry` | Input industry for research |
| `specificTopic` | Optional specific focus |
| `research` | Research findings from agent |
| `post` | Generated LinkedIn post |
| `errors` | Any errors encountered |

## 🎯 Example Output

```
╔══════════════════════════════════════════════════════════════╗
║    📋 FINAL LINKEDIN POST                                    ║
╚══════════════════════════════════════════════════════════════╝

🚀 Here's what nobody tells you about AI tools...

They don't replace your skills. They amplify them.

Last month, I started using AI assistants for my daily workflow.
The result? I'm not working less. I'm thinking MORE.

Here's what actually changed:
→ Code reviews: 2 hours → 45 minutes
→ Documentation: Manual → Automated first drafts
→ Problem-solving: Same time, but deeper analysis

The secret? AI handles the routine. I focus on the complex.

3 things I learned:
1. AI is a multiplier, not a replacement
2. The best prompts come from domain expertise
3. Creativity isn't automated—it's unleashed

What's your experience with AI tools? 
Drop a comment below 👇

#AI #Productivity #FutureOfWork #TechLeadership
```

## 🛠️ Extending the Application

### Adding a New Agent

1. Create agent file in `src/agents/`
2. Define prompts in `src/prompts/`
3. Add node to workflow in `src/graph/workflow.js`
4. Update state schema if needed

### Custom Prompts

Modify prompts in `src/prompts/` to customize agent behavior:

```javascript
// src/prompts/customPrompt.js
export const CUSTOM_SYSTEM_PROMPT = `Your custom instructions...`;
```

## 📚 Dependencies

- `@langchain/langgraph` - Multi-agent orchestration
- `@langchain/google-genai` - Gemini model integration
- `@langchain/core` - Core LangChain utilities
- `dotenv` - Environment variable management

## 📄 License

MIT

