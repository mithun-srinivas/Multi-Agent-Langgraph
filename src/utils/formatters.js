export const formatPostWithStats = (post) => {
  const characterCount = post.length;
  const wordCount = post.split(/\s+/).filter(word => word.length > 0).length;
  const lineCount = post.split('\n').length;
  const emojiCount = (post.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;

  return {
    content: post,
    stats: {
      characterCount,
      wordCount,
      lineCount,
      emojiCount,
      isOptimalLength: characterCount >= 800 && characterCount <= 1500,
      isWithinLimit: characterCount <= 3000,
    },
  };
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const createBox = (title, content, width = 60) => {
  const topBorder = '╔' + '═'.repeat(width - 2) + '╗';
  const bottomBorder = '╚' + '═'.repeat(width - 2) + '╝';
  const titleLine = '║ ' + title.padEnd(width - 4) + ' ║';
  const separator = '╟' + '─'.repeat(width - 2) + '╢';
  
  const contentLines = content.split('\n').map(line => {
    const truncated = line.substring(0, width - 4);
    return '║ ' + truncated.padEnd(width - 4) + ' ║';
  });

  return [
    topBorder,
    titleLine,
    separator,
    ...contentLines,
    bottomBorder,
  ].join('\n');
};

export const logStep = (step, status, message = '') => {
  const icons = {
    start: '🔄',
    complete: '✅',
    error: '❌',
    info: 'ℹ️',
  };
  
  const icon = icons[status] || '•';
  const timestamp = new Date().toISOString().slice(11, 19);
  
  console.log(`[${timestamp}] ${icon} ${step}${message ? ': ' + message : ''}`);
};

export default {
  formatPostWithStats,
  truncateText,
  createBox,
  logStep,
};
