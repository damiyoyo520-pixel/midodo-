import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storage, Order } from '../models/memoryStorage';

const router = express.Router();

// 创建订单
router.post('/', (req, res) => {
  try {
    const { userId, scriptId, paymentMethod } = req.body;

    const script = storage.scripts.get(scriptId);
    if (!script) {
      return res.status(404).json({ success: false, message: '剧本不存在' });
    }

    const newOrder: Order = {
      _id: uuidv4(),
      userId,
      scriptId,
      scriptTitle: script.title,
      scriptPoster: script.poster,
      amount: script.price,
      status: 'pending',
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storage.orders.set(newOrder._id, newOrder);

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    console.error('创建订单错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 支付订单
router.post('/:id/pay', (req, res) => {
  try {
    const order = storage.orders.get(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' });
    }

    // 更新订单状态
    order.status = 'paid';
    order.updatedAt = new Date();
    storage.orders.set(order._id, order);

    // 更新剧本销量
    const script = storage.scripts.get(order.scriptId);
    if (script) {
      script.sales += 1;
      storage.scripts.set(script._id, script);
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('支付订单错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取用户订单
router.get('/user/:userId', (req, res) => {
  try {
    const orders = Array.from(storage.orders.values()).filter(
      o => o.userId === req.params.userId
    );

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('获取订单错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取订单详情
router.get('/:id', (req, res) => {
  try {
    const order = storage.orders.get(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('获取订单详情错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
