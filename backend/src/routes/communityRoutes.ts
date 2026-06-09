import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storage, Post } from '../models/memoryStorage';

const router = express.Router();

// 获取社区帖子列表
router.get('/posts', (req, res) => {
  try {
    const posts = Array.from(storage.posts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('获取帖子列表错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取帖子详情
router.get('/posts/:id', (req, res) => {
  try {
    const post = storage.posts.get(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: '帖子不存在' });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('获取帖子详情错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 创建帖子
router.post('/posts', (req, res) => {
  try {
    const { title, content, author, authorName, authorAvatar, tags } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ success: false, message: '缺少必要字段' });
    }

    const newPost: Post = {
      _id: uuidv4(),
      title,
      content,
      author,
      authorName: authorName || '匿名用户',
      authorAvatar,
      likes: 0,
      comments: 0,
      tags: tags || [],
      createdAt: new Date(),
    };

    storage.posts.set(newPost._id, newPost);

    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error('创建帖子错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
