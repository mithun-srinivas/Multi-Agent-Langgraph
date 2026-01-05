import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateConfig } from './config.js';
import { runWorkflow, streamWorkflow } from './graph/workflow.js';
import { runResearch } from './agents/researchAgent.js';
import { writePost } from './agents/writerAgent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateLinkedInPost = async (options) => {
  validateConfig();
  
  const result = await runWorkflow(options);
  
  return {
    success: result.postGenerated,
    post: result.post,
    research: result.research,
    errors: result.errors,
  };
};

export async function* generateLinkedInPostStream(options) {
  validateConfig();
  
  for await (const update of streamWorkflow(options)) {
    yield update;
  }
}

const savePostToFile = (post, filename = null) => {
  const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-').slice(0, 19);
  const outputFilename = filename || `linkedin-post-${timestamp}.txt`;
  const outputDir = path.resolve(__dirname, '../output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, outputFilename);
  
  const fileContent = `LinkedIn Post
Generated: ${new Date().toLocaleString()}
${'─'.repeat(50)}

${post}

${'─'.repeat(50)}
Character Count: ${post.length}
`;

  fs.writeFileSync(outputPath, fileContent, 'utf8');
  return outputPath;
};

const runDemo = async () => {
  console.log('🚀 Generating LinkedIn post...');

  try {
    const result = await generateLinkedInPost({
      industry: 'artificial intelligence',
      specificTopic: 'AI-powered productivity tools and their impact on remote work',
      tone: 'inspirational and thought-provoking',
      authorContext: 'A tech professional passionate about the future of work',
    });

    if (result.success) {
      console.log('\n' + result.post);
      const savedPath = savePostToFile(result.post);
      console.log(`\n✅ Saved to: ${savedPath}`);
    } else {
      console.error('❌ Failed:', result.errors.join(', '));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

export { runResearch, writePost, runWorkflow, streamWorkflow, savePostToFile };

runDemo();
