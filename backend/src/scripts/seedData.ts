import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Script } from '../models/Script';

dotenv.config();

const SCRIPTS_DATA = [
  {
    title: '绣娘传奇',
    description: '讲述江南绣娘传承非遗刺绣技艺的感人故事',
    genre: '非遗',
    price: 399,
    wordCount: 15000,
    tags: ['非遗', '刺绣', '传统'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3',
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    ratingCount: 128,
  },
  {
    title: '京剧大师',
    description: '一代京剧名角的艺术人生与传承之路',
    genre: '非遗',
    price: 499,
    wordCount: 20000,
    tags: ['非遗', '京剧', '传统艺术'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20Opera%20performer%20red%20gold%20face%20paint%20traditional%20costume%20epic%20lighting%20Hollywood%20movie%20poster&image_size=portrait_4_3',
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    ratingCount: 95,
  },
  {
    title: '唐人街往事',
    description: '1980年代纽约唐人街的华人奋斗史',
    genre: '海外',
    price: 349,
    wordCount: 18000,
    tags: ['海外', '唐人街', '奋斗'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20Chinatown%20neon%20lights%20rainy%20night%201980s%20style%20Hollywood%20movie%20poster%20cinematic&image_size=portrait_4_3',
    isPublished: true,
    isFeatured: true,
    rating: 4.7,
    ratingCount: 156,
  },
  {
    title: '东京物语',
    description: '现代都市中异国青年的爱情与梦想',
    genre: '海外',
    price: 329,
    wordCount: 16000,
    tags: ['海外', '日本', '都市'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tokyo%20night%20neon%20lights%20fashionable%20woman%20silhouette%20blue%20lighting%20cyberpunk%20movie%20poster&image_size=portrait_4_3',
    isPublished: true,
    isFeatured: false,
    rating: 4.6,
    ratingCount: 89,
  },
  {
    title: '西湖千年情',
    description: '西子湖畔跨越千年的爱情传说',
    genre: '文旅',
    price: 369,
    wordCount: 22000,
    tags: ['文旅', '西湖', '爱情'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=West%20Lake%20China%20elegant%20woman%20traditional%20costume%20lotus%20water%20mist%20romantic%20movie%20poster&image_size=portrait_4_3',
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    ratingCount: 234,
  },
  {
    title: '敦煌飞天',
    description: '敦煌莫高窟壁画中的飞天传说与现代守护者',
    genre: '文旅',
    price: 459,
    wordCount: 25000,
    tags: ['文旅', '敦煌', '文化遗产'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dunhuang%20flying%20apsaras%20goddess%20golden%20silk%20mural%20epic%20movie%20poster%20Chinese%20traditional&image_size=portrait_4_3',
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    ratingCount: 167,
  },
];

async function seedDatabase() {
  try {
    console.log('🔌 连接数据库...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drama_platform');
    console.log('✅ 数据库连接成功');

    console.log('🧹 清理现有数据...');
    await User.deleteMany({});
    await Script.deleteMany({});
    console.log('✅ 数据清理完成');

    console.log('👤 创建测试用户...');
    const testUser = await User.create({
      email: 'test@example.com',
      username: '测试用户',
      password: 'test123456',
      role: 'user',
      isActive: true,
      isVerified: true,
    });
    console.log('✅ 测试用户创建成功');

    console.log('📝 创建测试剧本...');
    const scripts = await Promise.all(
      SCRIPTS_DATA.map(scriptData => 
        Script.create({
          ...scriptData,
          author: testUser._id,
        })
      )
    );
    console.log(`✅ ${scripts.length} 个剧本创建成功`);

    console.log('🎉 数据库初始化完成！');
    console.log('\n📋 测试账号信息:');
    console.log('   邮箱: test@example.com');
    console.log('   密码: test123456');
    console.log('\n🚀 您现在可以启动应用进行测试了！');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  }
}

seedDatabase();
