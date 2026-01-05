import fs from 'node:fs';
import { validateConfig } from './config.js';
import { runWorkflow } from './graph/workflow.js';

const main = async () => {
  console.log('Generating LinkedIn post...');

  try {
    validateConfig();
    
    const result = await runWorkflow({
      industry: 'artificial intelligence',
      specificTopic: 'AI-powered productivity tools and their impact on remote work',
      tone: 'inspirational',
      authorContext: 'A tech professional passionate about the future of work',
    });

    if (result.postGenerated) {
      console.log('\n' + result.post);
      
      if (!fs.existsSync('./output')) fs.mkdirSync('./output');
      const filename = `./output/post-${Date.now()}.txt`;
      fs.writeFileSync(filename, result.post);
      console.log(`\nSaved to: ${filename}`);
    } else {
      console.error('Failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
