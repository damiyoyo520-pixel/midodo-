import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storage, Script } from '../models/memoryStorage';

const router = express.Router();

// 获取剧本列表
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 12, genre, search } = req.query;
    let scripts = Array.from(storage.scripts.values()).filter(s => s.isPublished);

    // 按类型筛选
    if (genre) {
      scripts = scripts.filter(s => s.genre === genre);
    }

    // 搜索筛选
    if (search) {
      const searchLower = (search as string).toLowerCase();
      scripts = scripts.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower)
      );
    }

    // 分页
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedScripts = scripts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        scripts: paginatedScripts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: scripts.length,
          pages: Math.ceil(scripts.length / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('获取剧本列表错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取精选剧本
router.get('/featured', (req, res) => {
  try {
    const scripts = Array.from(storage.scripts.values())
      .filter(s => s.isPublished)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 8);

    res.json({
      success: true,
      data: scripts,
    });
  } catch (error) {
    console.error('获取精选剧本错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取剧本详情
router.get('/:id', (req, res) => {
  try {
    const script = storage.scripts.get(req.params.id);

    if (!script) {
      return res.status(404).json({ 
        success: false, 
        message: '剧本不存在' 
      });
    }

    // 增加浏览量
    script.views += 1;
    storage.scripts.set(script._id, script);

    res.json({
      success: true,
      data: script,
    });
  } catch (error) {
    console.error('获取剧本详情错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 创建剧本
router.post('/', (req, res) => {
  try {
    const { title, description, genre, poster, price, content, author, authorName } = req.body;

    if (!title || !description || !genre || !price || !author) {
      return res.status(400).json({ 
        success: false, 
        message: '缺少必要字段' 
      });
    }

    const newScript: Script = {
      _id: uuidv4(),
      title,
      description,
      genre,
      author,
      authorName: authorName || '匿名作者',
      poster: poster || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20movie%20poster%2C%20no%20text&image_size=square_hd',
      price,
      content: content || '',
      isPublished: true,
      views: 0,
      sales: 0,
      rating: 5,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storage.scripts.set(newScript._id, newScript);

    res.status(201).json({
      success: true,
      data: newScript,
    });
  } catch (error) {
    console.error('创建剧本错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
