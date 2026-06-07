import { Router } from 'express';

const router = Router();

router.get('/stats', async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      users: 12847,
      scripts: 8392,
      transactions: 5621,
      zones: {
        海外: 1234,
        文旅: 2567,
        非遗: 1891,
      },
    },
  });
});

export default router;
