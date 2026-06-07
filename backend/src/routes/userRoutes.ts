import express from 'express';
import { storage } from '../models/memoryStorage';

const router = express.Router();

// 获取用户信息
router.get('/:id', (req, res) => {
  try {
    const user = storage.users.get(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 更新用户信息
router.put('/:id', (req, res) => {
  try {
    const user = storage.users.get(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    const { username, bio, avatar } = req.body;
    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;
    user.updatedAt = new Date();

    storage.users.set(user._id, user);

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取用户创作的剧本
router.get('/:id/scripts', (req, res) => {
  try {
    const scripts = Array.from(storage.scripts.values()).filter(
      s => s.author === req.params.id
    );

    res.json({
      success: true,
      data: scripts,
    });
  } catch (error) {
    console.error('获取用户剧本错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
