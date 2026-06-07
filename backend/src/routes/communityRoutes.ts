import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      posts: [
        {
          id: '1',
          title: '欢迎来到短剧创作社区',
          content: '这里是短剧创作者的交流平台',
          author: 'admin',
          createdAt: new Date().toISOString(),
        },
      ],
    },
  });
});

export default router;
