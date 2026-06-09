import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  Star, 
  Share2, 
  MessageCircle,
  Mail,
  Link as LinkIcon,
  Copy,
  ChevronRight,
  Film,
  ArrowRight,
  Phone,
  Heart,
  ShoppingBag,
  PenTool,
  Gift,
  ExternalLink
} from 'lucide-react';

/**
 * OrderSuccess 组件 - 订单成功页面
 * 优质的用户体验设计
 */

const OrderSuccess: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // 模拟订单数据
  const orderData = {
    orderId: `DH${Date.now().toString().slice(-10)}`,
    script: {
      id: id || '1',
      title: '绣娘传',
      author: '李文秀',
      description: '中国传统刺绣大师的人生传奇，展现非遗文化的魅力',
      gradient: 'from-purple-600 via-pink-500 to-rose-500'
    },
    price: 438.9,
    purchasedAt: new Date().toLocaleString('zh-CN'),
    downloadUrl: '/downloads/xiuniangzhuan.pdf'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://scripthub.com/scripts/${orderData.script.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // 模拟下载
    setTimeout(() => {
      setIsDownloading(false);
      alert('剧本下载成功！');
    }, 2000);
  };

  const shareOptions = [
    { 
      name: '微信', 
      icon: MessageCircle, 
      color: 'bg-green-500 hover:bg-green-600',
      action: () => alert('请截图分享到微信')
    },
    { 
      name: '微博', 
      icon: Share2, 
      color: 'bg-red-500 hover:bg-red-600',
      action: () => alert('分享到微博')
    },
    { 
      name: '邮箱', 
      icon: Mail, 
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => alert('发送到邮箱')
    },
    { 
      name: '复制链接', 
      icon: LinkIcon, 
      color: 'bg-gray-500 hover:bg-gray-600',
      action: handleCopyLink
    }
  ];

  const nextSteps = [
    {
      icon: Film,
      title: '继续浏览',
      description: '发现更多优质剧本',
      link: '/scripts',
      color: 'bg-purple-500'
    },
    {
      icon: ShoppingBag,
      title: '购买更多',
      description: '探索剧本市场',
      link: '/marketplace',
      color: 'bg-blue-500'
    },
    {
      icon: PenTool,
      title: '开始创作',
      description: '使用AI辅助创作',
      link: '/workspace',
      color: 'bg-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-gray via-white to-background-gray">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-text-primary">剧本交易中心</h1>
                  <p className="text-xs text-text-tertiary">Script Hub</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 成功提示 */}
        <div className="bg-white rounded border border-border p-8 mb-8 animate-bounce-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 成功动画 */}
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                🎉
              </div>
            </div>

            {/* 成功信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                支付成功！
              </h1>
              <p className="text-lg text-text-secondary mb-4">
                恭喜您成功购买剧本《{orderData.script.title}》
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-tertiary">
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded">
                  订单号：{orderData.orderId}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded">
                  下单时间：{orderData.purchasedAt}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded">
                  实付金额：¥{orderData.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* 下载按钮 */}
            <div className="flex-shrink-0">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center gap-2 px-6 py-3 text-white font-medium rounded transition-all ${
                  isDownloading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    下载中...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    下载剧本
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：评分和评论 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 评分系统 */}
            <div className="bg-white rounded border border-border p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                为剧本评分
              </h2>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="text-3xl transition-transform hover:scale-110"
                    >
                      {star <= (hoverRating || rating) ? (
                        <span className="text-yellow-400">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-text-secondary">
                    {rating > 0 ? `（${rating}星）` : '点击评分'}
                  </span>
                </div>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="分享您的购买体验，帮助其他买家做出更好的选择..."
                className="w-full h-32 p-4 border border-border rounded resize-none focus:outline-none focus:border-primary transition-colors"
              />

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-text-tertiary">
                  {comment.length}/500 字
                </p>
                <button className="px-6 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors">
                  提交评价
                </button>
              </div>
            </div>

            {/* 分享功能 */}
            <div className="bg-white rounded border border-border p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                分享给好友
              </h2>

              <p className="text-sm text-text-secondary mb-4">
                分享剧本给朋友，好友购买后您可获得佣金奖励
              </p>

              <div className="flex flex-wrap gap-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className={`flex items-center gap-2 px-4 py-2 ${option.color} text-white text-sm font-medium rounded transition-all`}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.name}
                    {option.name === '复制链接' && isCopied && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>

              {/* 邀请码 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-tertiary mb-1">我的邀请码</p>
                    <p className="text-2xl font-mono font-bold text-primary tracking-widest">
                      ABC123
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors">
                    复制邀请码
                  </button>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  好友通过您的邀请码注册，您将获得 5% 的购剧佣金
                </p>
              </div>
            </div>

            {/* 下一步引导 */}
            <div className="bg-white rounded border border-border p-6">
              <h2 className="text-lg font-bold text-text-primary mb-6">
                下一步
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nextSteps.map((step, index) => (
                  <Link
                    key={index}
                    to={step.link}
                    className="group p-6 border border-border rounded hover:shadow-lg hover:border-transparent transition-all"
                  >
                    <div className={`w-12 h-12 ${step.color} rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-text-tertiary mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <span>立即前往</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：剧本详情和客服 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 剧本卡片 */}
            <div className="bg-white rounded border border-border p-6 sticky top-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">购买详情</h3>

              {/* 剧本封面 */}
              <div className={`w-full aspect-[9/16] max-h-64 bg-gradient-to-br ${orderData.script.gradient} rounded mb-4 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center">
                  <Film className="w-12 h-12 text-white mx-auto mb-2 opacity-50" />
                  <span className="text-white text-xs opacity-75">9:16 Poster</span>
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-medium">
                  已购买
                </div>
              </div>

              <h4 className="font-bold text-text-primary mb-1">
                {orderData.script.title}
              </h4>
              <p className="text-sm text-text-secondary mb-4">
                作者：{orderData.script.author}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">订单编号</span>
                  <span className="text-text-secondary font-mono">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">支付金额</span>
                  <span className="text-text-secondary">¥{orderData.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">购买时间</span>
                  <span className="text-text-secondary">{orderData.purchasedAt}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">授权类型</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                    独家授权
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to={`/orders/${orderData.orderId}`}
                  className="flex items-center justify-between w-full py-2 px-4 border border-border rounded text-sm font-medium text-text-primary hover:bg-background-gray transition-colors"
                >
                  <span>查看订单详情</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="flex items-center justify-between w-full py-2 px-4 border border-border rounded text-sm font-medium text-text-primary hover:bg-background-gray transition-colors">
                  <span>查看我的收藏</span>
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 客服支持 */}
            <div className="bg-gradient-to-br from-primary to-primary-light rounded p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                客服支持
              </h3>
              <p className="text-sm text-white/90 mb-4">
                如有任何问题，我们的客服团队随时为您服务
              </p>
              <div className="space-y-3">
                <a href="tel:400-888-8888" className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors">
                  <Phone className="w-4 h-4" />
                  400-888-8888
                </a>
                <a href="mailto:support@scripthub.com" className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors">
                  <Mail className="w-4 h-4" />
                  support@scripthub.com
                </a>
                <button className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded hover:bg-white/30 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  在线客服
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 text-xs text-white/80">
                工作时间：周一至周日 9:00 - 21:00
              </div>
            </div>

            {/* 活动卡片 */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎁</span>
                <h3 className="font-bold">新人专享</h3>
              </div>
              <p className="text-sm text-white/90 mb-3">
                首次购买剧本立减 ¥50，点击领取优惠券
              </p>
              <button className="w-full py-2 bg-white text-orange-600 text-sm font-bold rounded hover:bg-orange-50 transition-colors">
                立即领取
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-text-tertiary">
          <p>© 2024 剧本交易中心 Script Hub. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderSuccess;
