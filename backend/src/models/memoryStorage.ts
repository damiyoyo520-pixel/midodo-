// 内存存储模型 - 临时替代 MongoDB
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

// 内存存储
const storage = {
  users: new Map<string, User>(),
  scripts: new Map<string, Script>(),
  orders: new Map<string, Order>(),
  reviews: new Map<string, Review>(),
  posts: new Map<string, Post>(),
};

// 初始化示例数据
async function initSampleData() {
  console.log('初始化示例数据...');

  // 创建示例用户
  const hashedPassword = await bcrypt.hash('123456', 10);
  const sampleUsers: User[] = [
    {
      _id: uuidv4(),
      username: 'demo',
      email: 'demo@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      role: 'creator',
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
      role: 'creator',
      bio: '专业编剧，擅长悬疑题材',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  sampleUsers.forEach(user => storage.users.set(user._id, user));

  // 好莱坞风格海报描述
  const hollywoodPosters = {
    '绣娘传': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%2C%20elegant%20woman%2C%20purple%20silk%2C%20dramatic%20lighting%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '京剧大师': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20opera%20performer%2C%20red%20and%20gold%20face%20paint%2C%20traditional%20costume%2C%20epic%20lighting%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '景德镇瓷': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20and%20white%20porcelain%2C%20master%20craftsman%2C%20dramatic%20lighting%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '少林功夫': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shaolin%20monk%2C%20martial%20arts%20pose%2C%20orange%20temple%20background%2C%20epic%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '唐人街往事': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20Chinatown%2C%20neon%20lights%2C%20rainy%20night%2C%201980s%20style%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '东京物语': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tokyo%20night%20scene%2C%20neon%20lights%2C%20stylish%20woman%20silhouette%2C%20blue%20lighting%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '巴黎之恋': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Paris%20Eiffel%20Tower%2C%20romantic%20silhouette%2C%20golden%20sunset%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '新加坡梦': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Singapore%20city%20skyline%2C%20modern%20skyscrapers%2C%20business%20professional%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '西湖·千年情': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=West%20Lake%2C%20elegant%20woman%2C%20traditional%20clothing%2C%20lotus%20flowers%2C%20mist%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '长安十二时辰': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tang%20Dynasty%20palace%2C%20ancient%20Chinese%20warrior%2C%20golden%20lighting%2C%20epic%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '丽江古城': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lijiang%20ancient%20town%2C%20Naxi%20woman%2C%20traditional%20costume%2C%20night%20lanterns%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '敦煌飞天': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dunhuang%20flying%20apsara%2C%20golden%20silk%2C%20fresco%20style%2C%20epic%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '野孩子': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wolf%20pack%2C%20wilderness%20survival%2C%20dark%20atmosphere%2C%20epic%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '暗夜追踪': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=detective%2C%20dark%20silhouette%2C%20rainy%20night%2C%20mysterious%20shadows%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '星河彼岸': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spaceship%2C%20galaxy%2C%20alien%20planet%2C%20science%20fiction%20epic%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
    '乡村教师': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rural%20teacher%20classroom%2C%20children%27s%20hope%2C%20warm%20sunlight%2C%20cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
  };

  // 创建示例剧本
  const sampleScripts: Script[] = [
    { _id: uuidv4(), title: '绣娘传', description: '讲述中国传统刺绣艺术传承的感人故事', genre: '非遗', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['绣娘传'], price: 99, content: '剧本内容...', isPublished: true, views: 1280, sales: 56, rating: 4.8, reviewCount: 23, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '京剧大师', description: '京剧艺术大师的传奇人生', genre: '非遗', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['京剧大师'], price: 128, content: '剧本内容...', isPublished: true, views: 2100, sales: 89, rating: 4.9, reviewCount: 45, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '景德镇瓷', description: '景德镇瓷器制作工艺的传承故事', genre: '非遗', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['景德镇瓷'], price: 88, content: '剧本内容...', isPublished: true, views: 980, sales: 42, rating: 4.7, reviewCount: 18, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '少林功夫', description: '少林武僧的成长历程', genre: '非遗', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['少林功夫'], price: 158, content: '剧本内容...', isPublished: true, views: 3200, sales: 156, rating: 4.9, reviewCount: 78, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '唐人街往事', description: '纽约唐人街的时代变迁', genre: '海外', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['唐人街往事'], price: 118, content: '剧本内容...', isPublished: true, views: 1800, sales: 67, rating: 4.6, reviewCount: 34, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '东京物语', description: '现代都市中的情感纠葛', genre: '海外', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['东京物语'], price: 99, content: '剧本内容...', isPublished: true, views: 1500, sales: 52, rating: 4.5, reviewCount: 28, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '巴黎之恋', description: '浪漫之都的爱情故事', genre: '海外', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['巴黎之恋'], price: 88, content: '剧本内容...', isPublished: true, views: 2200, sales: 98, rating: 4.7, reviewCount: 41, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '新加坡梦', description: '亚洲金融中心的创业故事', genre: '海外', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['新加坡梦'], price: 128, content: '剧本内容...', isPublished: true, views: 1400, sales: 45, rating: 4.6, reviewCount: 22, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '西湖·千年情', description: '杭州西湖的千年爱情传说', genre: '文旅', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['西湖·千年情'], price: 108, content: '剧本内容...', isPublished: true, views: 2800, sales: 134, rating: 4.8, reviewCount: 56, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '长安十二时辰', description: '盛唐长安的悬疑探案', genre: '文旅', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['长安十二时辰'], price: 168, content: '剧本内容...', isPublished: true, views: 4500, sales: 267, rating: 4.9, reviewCount: 98, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '丽江古城', description: '丽江古城的民族风情', genre: '文旅', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['丽江古城'], price: 98, content: '剧本内容...', isPublished: true, views: 1900, sales: 78, rating: 4.7, reviewCount: 36, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '敦煌飞天', description: '敦煌莫高窟的艺术传奇', genre: '文旅', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['敦煌飞天'], price: 138, content: '剧本内容...', isPublished: true, views: 2400, sales: 112, rating: 4.8, reviewCount: 52, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '野孩子', description: '荒野中成长的故事', genre: '其他', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['野孩子'], price: 78, content: '剧本内容...', isPublished: true, views: 1600, sales: 62, rating: 4.5, reviewCount: 26, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '暗夜追踪', description: '悬疑侦探故事', genre: '其他', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['暗夜追踪'], price: 118, content: '剧本内容...', isPublished: true, views: 2700, sales: 134, rating: 4.8, reviewCount: 67, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '星河彼岸', description: '科幻宇宙探索', genre: '其他', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, poster: hollywoodPosters['星河彼岸'], price: 148, content: '剧本内容...', isPublished: true, views: 3100, sales: 189, rating: 4.9, reviewCount: 89, createdAt: new Date(), updatedAt: new Date() },
    { _id: uuidv4(), title: '乡村教师', description: '乡村教育的感人故事', genre: '其他', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, poster: hollywoodPosters['乡村教师'], price: 68, content: '剧本内容...', isPublished: true, views: 2300, sales: 98, rating: 4.7, reviewCount: 45, createdAt: new Date(), updatedAt: new Date() },
  ];

  sampleScripts.forEach(script => storage.scripts.set(script._id, script));

  // 创建示例社区帖子
  const samplePosts: Post[] = [
    { _id: uuidv4(), title: '如何创作引人入胜的短剧剧本？', content: '分享一些剧本创作的心得和技巧...', author: sampleUsers[0]._id, authorName: sampleUsers[0].username, authorAvatar: sampleUsers[0].avatar, likes: 156, comments: 42, tags: ['创作技巧', '经验分享'], createdAt: new Date(Date.now() - 86400000) },
    { _id: uuidv4(), title: '短剧市场趋势分析 2026', content: '分析当前短剧市场的发展趋势...', author: sampleUsers[1]._id, authorName: sampleUsers[1].username, authorAvatar: sampleUsers[1].avatar, likes: 234, comments: 67, tags: ['市场分析', '行业动态'], createdAt: new Date(Date.now() - 172800000) },
  ];

  samplePosts.forEach(post => storage.posts.set(post._id, post));

  console.log('✅ 示例数据初始化完成');
  console.log(`- 用户: ${storage.users.size} 个`);
  console.log(`- 剧本: ${storage.scripts.size} 个`);
  console.log(`- 帖子: ${storage.posts.size} 个`);
  console.log('');
  console.log('📝 测试账号:');
  console.log('   用户名: demo');
  console.log('   密码: 123456');
}

export { storage, initSampleData, User, Script, Order, Review, Post };
