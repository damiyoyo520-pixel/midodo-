import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'creator' | 'admin';
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Script {
  _id: string;
  title: string;
  description: string;
  genre: string;
  author: string;
  authorName: string;
  poster: string;
  price: number;
  content: string;
  isPublished: boolean;
  views: number;
  sales: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Order {
  _id: string;
  userId: string;
  scriptId: string;
  scriptTitle: string;
  scriptPoster: string;
  amount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Review {
  _id: string;
  scriptId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: Date;
}

const storage = {
  users: new Map<string, User>(),
  scripts: new Map<string, Script>(),
  orders: new Map<string, Order>(),
  reviews: new Map<string, Review>(),
  posts: new Map<string, Post>(),
};

async function initSampleData() {
  console.log('初始化示例数据...');

  const hashedPassword = await bcrypt.hash('123456', 10);
  const sampleUsers = [
    {
      _id: uuidv4(),
      username: 'demo',
      email: 'demo@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      role: 'creator' as const,
      bio: '热爱创作的短剧编剧',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: uuidv4(),
      username: 'creator1',
      email: 'creator1@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creator1',
      role: 'creator' as const,
      bio: '专业编剧，擅长悬疑题材',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  sampleUsers.forEach(user => storage.users.set(user._id, user));

  const scriptTitles = [
    '绣娘传', '京剧大师', '景德镇瓷', '少林功夫',
    '唐人街往事', '东京物语', '巴黎之恋', '新加坡梦',
    '西湖·千年情', '长安十二时辰', '丽江古城', '敦煌飞天',
    '野孩子', '暗夜追踪', '星河彼岸', '乡村教师'
  ];

  const genres = ['非遗', '非遗', '非遗', '非遗',
                '海外', '海外', '海外', '海外',
                '文旅', '文旅', '文旅', '文旅',
                '其他', '其他', '其他', '其他'];

  const sampleScripts = [];
  for (let i = 0; i < scriptTitles.length; i++) {
    const title = scriptTitles[i];
    const genre = genres[i];
    const authorIndex = i % 2;
    const poster = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epic%20movie%20poster%20hollywood%20style&image_size=square_hd';
    
    sampleScripts.push({
      _id: uuidv4(),
      title: title,
      description: '精彩的短剧剧本',
      genre: genre,
      author: sampleUsers[authorIndex]._id,
      authorName: sampleUsers[authorIndex].username,
      poster: poster,
      price: 99,
      content: '剧本内容...',
      isPublished: true,
      views: 1000 + i * 100,
      sales: 50 + i * 10,
      rating: 4.5 + i * 0.1,
      reviewCount: 20 + i * 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  sampleScripts.forEach(script => storage.scripts.set(script._id, script));

  const samplePosts = [
    { _id: uuidv4(), title: '如何创作引人入胜的短剧剧本？', content: '分享一些剧本创作的心得和技巧...', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, authorAvatar: sampleUsers[0].avatar, likes: 156, comments: 42, tags: ['创作技巧', '经验分享'], createdAt: new Date(Date.now() - 86400000) },
    { _id: uuidv4(), title: '短剧市场趋势分析 2026', content: '分析当前短剧市场的发展趋势...', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, authorAvatar: sampleUsers[1].avatar, likes: 234, comments: 67, tags: ['市场分析', '行业动态'], createdAt: new Date(Date.now() - 172800000) },
  ];

  samplePosts.forEach(post => storage.posts.set(post._id, post));

  console.log('示例数据初始化完成');
  console.log('- 用户: ' + storage.users.size + ' 个');
  console.log('- 剧本: ' + storage.scripts.size + ' 个');
  console.log('- 帖子: ' + storage.posts.size + ' 个');
  console.log('');
  console.log('测试账号:');
  console.log('  用户名: demo');
  console.log('  密码: 123456');
}

export { storage, initSampleData, User, Script, Order, Review, Post };
