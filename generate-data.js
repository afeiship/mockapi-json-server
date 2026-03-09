const fs = require('fs');
const path = require('path');

// 配置
const POST_COUNT = 100;
const COMMENT_COUNT = 200;
const USER_COUNT = 20;
const CATEGORY_COUNT = 15;
const TAG_COUNT = 30;

// 示例数据模板
const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Ryan', 'Sarah', 'Tom', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zack'];
const lastNames = ['Johnson', 'Smith', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Torres'];

const topics = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'Vue.js', 'Angular', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs', 'Microservices', 'DevOps', 'CI/CD', 'Testing', 'Security', 'Performance', 'WebAssembly', 'Serverless', 'Mobile Development', 'iOS', 'Android', 'React Native', 'Flutter', 'Machine Learning', 'AI', 'Data Science', 'Blockchain', 'Web3', 'Cloud Computing', 'Edge Computing', 'IoT', 'Cybersecurity', 'Network Security', 'Cryptography', 'UI/UX Design', 'Product Design', 'User Research', 'Accessibility', 'SEO', 'Web Performance', 'Progressive Web Apps', 'Electron', 'Desktop Apps', 'Game Development', 'VR/AR', '3D Graphics', 'Computer Vision', 'Natural Language Processing', 'Big Data', 'Data Engineering', 'MLOps', 'Git', 'Version Control', 'Agile', 'Scrum', 'Kanban', 'Project Management', 'Leadership', 'Soft Skills', 'Career Development', 'Freelancing', 'Remote Work', 'Open Source', 'Community Building', 'Technical Writing', 'Public Speaking', 'Podcasting', 'Content Creation', 'Software Architecture', 'System Design', 'Distributed Systems', 'Concurrency', 'Parallel Computing', 'Algorithms', 'Data Structures', 'Problem Solving', 'Code Optimization', 'Refactoring', 'Design Patterns', 'Clean Code', 'SOLID Principles', 'Test-Driven Development', 'Behavior-Driven Development', 'Domain-Driven Design', 'Event-Driven Architecture', 'CQRS', 'Event Sourcing', 'Database Design', 'SQL', 'NoSQL', 'NewSQL', 'Graph Databases', 'Time-Series Databases', 'Search Engines', 'Elasticsearch', 'Solr', 'Message Queues', 'Kafka', 'RabbitMQ', 'gRPC', 'WebSocket', 'HTTP/2', 'HTTP/3', 'WebRTC', 'WebSockets', 'Real-time Communication', 'Webhooks', 'API Design', 'API Documentation', 'OpenAPI', 'Swagger'];

const categoryNames = [
  'Programming', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Cloud',
  'Database', 'Security', 'Testing', 'Design', 'Architecture', 'Data Science',
  'Machine Learning', 'Blockchain', 'Career', 'Tools'
];

const templates = [
  {
    title: 'Getting Started with {topic}',
    content: 'Learn the fundamentals of {topic} and how to get started with this powerful technology. This comprehensive guide covers everything you need to know as a beginner.'
  },
  {
    title: '{topic} Best Practices',
    content: 'Discover the best practices for {topic} that will help you write better code and build more robust applications. Essential tips from experienced developers.'
  },
  {
    title: 'Advanced {topic} Techniques',
    content: 'Take your {topic} skills to the next level with these advanced techniques and patterns. Perfect for developers who want to deepen their understanding.'
  },
  {
    title: '{topic} vs {topic2}',
    content: 'Compare {topic} and {topic2} to understand which approach is best for your next project. We cover the pros and cons of each technology.'
  },
  {
    title: 'Building a {topic} Application',
    content: 'Follow along as we build a complete application using {topic}. Learn practical skills and see real-world examples in action.'
  },
  {
    title: '{topic} Tutorial for Beginners',
    content: 'A step-by-step tutorial that teaches you {topic} from scratch. No prior experience required. Start your journey today!'
  },
  {
    title: 'Common {topic} Mistakes to Avoid',
    content: 'Learn from the mistakes others have made with {topic}. This guide covers common pitfalls and how to avoid them in your projects.'
  },
  {
    title: '{topic} Performance Optimization',
    content: 'Optimize your {topic} applications for maximum performance. Practical tips and techniques to make your code run faster and more efficiently.'
  },
  {
    title: '{topic} Security Guide',
    content: 'Secure your {topic} applications with this comprehensive security guide. Learn about common vulnerabilities and how to protect against them.'
  },
  {
    title: 'The Future of {topic}',
    content: 'Explore what\'s next for {topic} and how this technology is evolving. Stay ahead of the curve with insights from industry experts.'
  }
];

const commentTemplates = [
  'Great article! Really helpful for understanding {topic}.',
  'I\'ve been working with {topic} for a while, and this post covers all the important points.',
  'Finally! A clear explanation of {topic}. Thanks!',
  'This came at the perfect time. I\'m just starting with {topic}.',
  'Excellent guide on {topic}. The examples really helped.',
  'I wish I found this article sooner when learning {topic}.',
  'Very comprehensive coverage of {topic}. Well done!',
  'This changed how I think about {topic}. Thank you!',
  'Can you write more about {topic}? This was amazing.',
  'The best {topic} tutorial I\'ve read online.',
  'Practical and actionable advice for {topic} developers.',
  'I learned something new about {topic} from this post.',
  'This should be required reading for anyone learning {topic}.',
  'Clear, concise, and informative. Great {topic} content!',
  'I shared this with my team. We\'re all using {topic} now.'
];

// 工具函数
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateName() {
  return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
}

function generateEmail(name) {
  const [firstName, lastName] = name.toLowerCase().split(' ');
  const domains = ['example.com', 'test.com', 'demo.com', 'mail.com'];
  return `${firstName}.${lastName}@${getRandomItem(domains)}`;
}

function generatePosts(count) {
  const posts = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  for (let i = 1; i <= count; i++) {
    const topic = getRandomItem(topics);
    const topic2 = getRandomItem(topics.filter(t => t !== topic));
    const template = getRandomItem(templates);

    const title = template.title
      .replace('{topic}', topic)
      .replace('{topic2}', topic2);

    const content = template.content
      .replace('{topic}', topic)
      .replace('{topic2}', topic2);

    const authorIndex = getRandomNumber(0, USER_COUNT - 1);
    const author = `${firstNames[authorIndex % firstNames.length]} ${lastNames[authorIndex % lastNames.length]}`;

    posts.push({
      id: i.toString(),
      title,
      content,
      author,
      category: getRandomItem(categoryNames),
      views: getRandomNumber(500, 10000),
      createdAt: getRandomDate(startDate, endDate),
      published: Math.random() > 0.1, // 90% published
      likes: getRandomNumber(10, 500),
      featured: Math.random() > 0.8 // 20% featured
    });
  }

  return posts;
}

function generateComments(count, postIds) {
  const comments = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  for (let i = 1; i <= count; i++) {
    const postId = getRandomItem(postIds);
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const commentText = getRandomItem(commentTemplates).replace('{topic}', topic);

    comments.push({
      id: i.toString(),
      text: commentText,
      author: generateName(),
      postId,
      createdAt: getRandomDate(startDate, endDate),
      likes: getRandomNumber(0, 50),
      approved: Math.random() > 0.15 // 85% approved
    });
  }

  return comments;
}

function generateUsers(count) {
  const users = [];
  const roles = ['admin', 'author', 'editor', 'user'];

  for (let i = 1; i <= count; i++) {
    const name = generateName();
    users.push({
      id: i.toString(),
      name,
      email: generateEmail(name),
      role: getRandomItem(roles),
      avatar: `https://i.pravatar.cc/150?img=${i}`,
      bio: `Passionate ${getRandomItem(categoryNames).toLowerCase()} developer and writer.`,
      location: getRandomItem(['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto', 'Singapore']),
      website: Math.random() > 0.5 ? `https://${name.toLowerCase().replace(' ', '.')}.com` : null,
      github: Math.random() > 0.3 ? `https://github.com/${name.toLowerCase().replace(' ', '')}` : null,
      twitter: Math.random() > 0.4 ? `https://twitter.com/${name.toLowerCase().replace(' ', '')}` : null,
      createdAt: getRandomDate(new Date('2023-01-01'), new Date('2024-01-01')),
      followers: getRandomNumber(10, 5000),
      following: getRandomNumber(10, 1000)
    });
  }

  return users;
}

function generateCategories(count) {
  const categoryData = [];
  const descriptions = [
    'Essential concepts and best practices',
    'Building modern user interfaces',
    'Server-side development and APIs',
    'Mobile application development',
    'Infrastructure and deployment',
    'Cloud computing platforms',
    'Data storage and management',
    'Protecting applications and data',
    'Quality assurance and testing',
    'User experience and interface design',
    'System design and structure',
    'Data analysis and machine learning',
    'Artificial intelligence and automation',
    'Decentralized technologies',
    'Professional development'
  ];

  categoryNames.slice(0, count).forEach((categoryName, index) => {
    categoryData.push({
      id: (index + 1).toString(),
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      description: descriptions[index] || `All about ${categoryName}`,
      postCount: getRandomNumber(5, 20),
      icon: null,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    });
  });

  return categoryData;
}

function generateTags(count) {
  const tags = [];
  const allTopics = [...new Set(topics)].slice(0, count);

  allTopics.forEach((topic, index) => {
    tags.push({
      id: (index + 1).toString(),
      name: topic.toLowerCase().replace(/\s+/g, ''),
      slug: topic.toLowerCase().replace(/\s+/g, '-'),
      description: `${topic} related articles and resources`,
      postCount: getRandomNumber(1, 10),
      popularity: getRandomNumber(1, 100)
    });
  });

  return tags;
}

// 生成数据
console.log('Generating mock data...');

const posts = generatePosts(POST_COUNT);
const comments = generateComments(COMMENT_COUNT, posts.map(p => p.id));
const users = generateUsers(USER_COUNT);
const categories = generateCategories(CATEGORY_COUNT);
const tags = generateTags(TAG_COUNT);

const db = {
  posts,
  comments,
  users,
  categories,
  tags,
  profile: {
    name: 'Mock API Server',
    version: '2.0.0',
    description: 'A comprehensive mock API server with 100+ posts for testing and development',
    statistics: {
      totalPosts: POST_COUNT,
      totalComments: COMMENT_COUNT,
      totalUsers: USER_COUNT,
      totalCategories: CATEGORY_COUNT,
      totalTags: TAG_COUNT
    }
  }
};

// 保存到文件
const dbPath = path.join(__dirname, 'src/db.json');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log(`✅ Generated ${POST_COUNT} posts`);
console.log(`✅ Generated ${COMMENT_COUNT} comments`);
console.log(`✅ Generated ${USER_COUNT} users`);
console.log(`✅ Generated ${CATEGORY_COUNT} categories`);
console.log(`✅ Generated ${TAG_COUNT} tags`);
console.log(`\n📁 Data saved to ${dbPath}`);
console.log('\n🚀 Start the server with: npm start');