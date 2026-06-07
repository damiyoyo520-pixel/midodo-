import { Router, Request, Response, NextFunction } from 'express';
import { Order } from '@/models/Order';
import { Script } from '@/models/Script';
import { AppError } from '@/middleware/errorHandler';
import { authenticate } from '@/middleware/auth';
import { logger } from '@/utils/logger';

const router = Router();

router.use(authenticate);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { scriptId } = req.body;

    if (!scriptId) {
      return next(new AppError('Script ID is required', 400));
    }

    const script = await Script.findById(scriptId);
    if (!script) {
      return next(new AppError('Script not found', 404));
    }

    const existingOrder = await Order.findOne({
      user: req.user._id,
      script: scriptId,
      status: { $in: ['paid', 'pending'] },
    });

    if (existingOrder) {
      if (existingOrder.status === 'paid') {
        return next(new AppError('You have already purchased this script', 400));
      }
      return res.status(200).json({
        success: true,
        data: existingOrder,
      });
    }

    const serviceFee = Math.round(script.price * 0.1);
    const totalAmount = script.price + serviceFee;

    const order = await Order.create({
      user: req.user._id,
      script: scriptId,
      amount: script.price,
      serviceFee,
      totalAmount,
      status: 'pending',
    });

    logger.info(`New order created: ${order.orderNumber} by ${req.user.username}`);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const filter: any = { user: req.user._id };
    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('script', 'title image price'),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('script');

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/pay', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentMethod } = req.body;
    
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    if (order.status !== 'pending') {
      return next(new AppError('Order is not pending', 400));
    }

    order.status = 'paid';
    order.paymentMethod = paymentMethod || 'wechat';
    order.paidAt = new Date();
    order.paymentTime = new Date();
    await order.save();

    await Script.findByIdAndUpdate(order.script, {
      $inc: { sales: 1 },
    });

    logger.info(`Order paid: ${order.orderNumber} by ${req.user.username}`);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
