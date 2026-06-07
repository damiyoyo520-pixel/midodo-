import express from 'express';
import { storage } from '../models/memoryStorage';

const router = express.Router();

// 海外专区
router.get('/global', (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    const scripts = Array.from(storage.scripts.values()).filter(
      s => s.genre === '海外' && s.isPublished
    );

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedScripts = scripts.slice(startIndex, startIndex + limitNum);

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
    console.error('获取海外专区剧本错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 文旅专区
router.get('/culture', (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    const scripts = Array.from(storage.scripts.values()).filter(
      s => s.genre === '文旅' && s.isPublished
    );

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedScripts = scripts.slice(startIndex, startIndex + limitNum);

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
    console.error('获取文旅专区剧本错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 非遗专区
router.get('/heritage', (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    const scripts = Array.from(storage.scripts.values()).filter(
      s => s.genre === '非遗' && s.isPublished
    );

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedScripts = scripts.slice(startIndex, startIndex + limitNum);

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
    console.error('获取非遗专区剧本错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
