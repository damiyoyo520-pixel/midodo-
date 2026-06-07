import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Film, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Download,
  Clock,
  ChevronRight,
  CreditCard,
  Wechat,
  Alipay,
  Wallet,
  Copy,
  Lock,
  Gift,
  Info
} from 'lucide-react';

/**
 * OrderConfirm 组件 - 订单确认页面
 * 完善的订单审核系统
 */

type PaymentType = 'wechat' | 'alipay' | 'card' | 'platform';

const OrderConfirm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>('wechat');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  // 模拟订单数据
  const orderData = {
    orderId: `DH${Date.now().toString().slice(-10)}`,
    script: {
      id: id || '1',
      title: '绣娘传',
      author: '李文秀',
      description: '中国传统刺绣大师的人生传奇，展现非遗文化的魅力',
      wordCount: 32000,
     授权类型: '独家授权',
      category: '非遗',
      gradient: 'from-purple-600 via-pink-500 to-rose-500'
    },
    pricing: {
      scriptPrice: 399,
      platformFee: 39.9,
      discount: 0,
      total: 438.9
    },
    createdAt: new Date().toLocaleString('zh-CN')
  };

  const paymentMethods = [
    {
      id: 'wechat' as PaymentType,
      name: '微信支付',
      icon: Wechat,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      selectedBorder: 'border-green-500',
      description: '推荐'
    },
    {
      id: 'alipay' as PaymentType,
      name: '支付宝',
      icon: Alipay,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      selectedBorder: 'border-blue-500',
      description: '安全'
    },
    {
      id: 'card' as PaymentType,
      name: '银行卡',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      selectedBorder: 'border-purple-500',
      description: '转账'
    },
    {
      id: 'platform' as PaymentType,
      name: '平台余额',
      icon: Wallet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      selectedBorder: 'border-orange-500',
      description: '余额 ¥1,280.00'
    }
  ];

  const handleConfirmOrder = () => {
    if (!agreedToTerms) {
      alert('请阅读并同意服务协议');
      return;
    }
    navigate(`/payment/${id}`);
  };

  return (
    <div className="min-h-screen bg-background-grayLight">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              ← 返回
            </button>
            <h1 className="text-xl font-bold text-text-primary">确认订单</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：订单确认表单 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 剧本信息 */}
            <div className="bg-white rounded border border-border p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Film className="w-5 h-5 text-primary" />
                剧本信息
              </h2>
              
              <div className="flex gap-6">
                {/* 剧本封面 */}
                <div className={`w-32 h-44 bg-gradient-to-br ${orderData.script.gradient} rounded flex-shrink-0 flex items-center justify-center`}>
                  <span className="text-white text-xs opacity-75">9:16 Poster</span>
                </div>

                {/* 剧本详情 */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {orderData.script.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    作者：{orderData.script.author}
                  </p>
                  <p className="text-sm text-text-tertiary mb-4 line-clamp-2">
                    {orderData.script.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-tertiary">字数：</span>
                      <span className="text-text-secondary">{orderData.script.wordCount.toLocaleString()} 字</span>
                    </div>
                    <div>
                      <span className="text-text-tertiary">授权类型：</span>
                      <span className="text-text-secondary">{orderData.script.授权类型}</span>
                    </div>
                    <div>
                      <span className="text-text-tertiary">分类：</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                        {orderData.script.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-tertiary">交付方式：</span>
                      <span className="text-text-secondary">电子版立即交付</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 费用明细 */}
            <div className="bg-white rounded border border-border p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4">费用明细</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-text-primary">剧本费用</p>
                    <p className="text-xs text-text-tertiary">基础授权费用</p>
                  </div>
                  <p className="text-lg font-bold text-text-primary">
                    ¥{orderData.pricing.scriptPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-text-primary">平台服务费</p>
                    <p className="text-xs text-text-tertiary">平台抽佣 10%</p>
                  </div>
                  <p className="text-lg font-bold text-text-primary">
                    ¥{orderData.pricing.platformFee.toFixed(2)}
                  </p>
                </div>

                {orderData.pricing.discount > 0 && (
                  <div className="flex items-center justify-between py-3 border-b border-border text-green-600">
                    <div>
                      <p className="text-sm font-medium">优惠折扣</p>
                      <p className="text-xs text-green-600">新人专享</p>
                    </div>
                    <p className="text-lg font-bold">
                      -¥{orderData.pricing.discount.toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between py-4 bg-primary/5 rounded px-4">
                  <p className="text-lg font-bold text-text-primary">应付总额</p>
                  <p className="text-2xl font-bold text-primary">
                    ¥{orderData.pricing.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* 支付方式 */}
            <div className="bg-white rounded border border-border p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4">选择支付方式</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`relative p-4 border-2 rounded transition-all ${
                      selectedPayment === method.id
                        ? `${method.selectedBorder} ${method.bgColor}`
                        : `${method.borderColor} hover:${method.bgColor}`
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3" />
                      </div>
                    )}
                    <method.icon className={`w-8 h-8 ${method.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium text-text-primary">{method.name}</p>
                    <p className="text-xs text-text-tertiary mt-1">{method.description}</p>
                  </button>
                ))}
              </div>

              {selectedPayment === 'platform' && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-800">
                      平台余额不足，建议使用其他支付方式
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 服务协议 */}
            <div className="bg-white rounded border border-border p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <div className="flex-1">
                  <label htmlFor="agreement" className="text-sm text-text-secondary cursor-pointer">
                    我已阅读并同意
                    <button 
                      onClick={() => setShowAgreement(!showAgreement)}
                      className="text-primary hover:text-primary-dark ml-1"
                    >
                      《剧本交易中心服务协议》
                    </button>
                    、
                    <Link to="/help/copyright" className="text-primary hover:text-primary-dark ml-1">
                      《版权授权协议》
                    </Link>
                    和
                    <Link to="/help/refund" className="text-primary hover:text-primary-dark ml-1">
                      《退款政策》
                    </Link>
                  </label>

                  {showAgreement && (
                    <div className="mt-4 p-4 bg-background-gray rounded text-sm text-text-secondary space-y-3">
                      <h4 className="font-bold text-text-primary">服务协议</h4>
                      <p>
                        1. 购买成功后，剧本电子版将立即发送至您的账户。
                      </p>
                      <p>
                        2. 独家授权剧本购买后，您获得该剧本的独家使用权，包括但不限于改编、拍摄、发行等权利。
                      </p>
                      <p>
                        3. 非独家授权剧本购买后，您获得该剧本在约定范围内的使用权。
                      </p>
                      <p>
                        4. 购买后不支持退款，但可享受平台提供的售后服务。
                      </p>
                      <p>
                        5. 平台收取10%服务费，用于平台运营和版权保护。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded border border-border p-6 sticky top-6">
              <h3 className="text-lg font-bold text-text-primary mb-6">订单摘要</h3>

              {/* 订单号 */}
              <div className="mb-6 p-4 bg-background-gray rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-tertiary">订单编号</span>
                  <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors">
                    <Copy className="w-3 h-3" />
                    复制
                  </button>
                </div>
                <p className="text-sm font-mono text-text-primary">{orderData.orderId}</p>
              </div>

              {/* 剧本预览 */}
              <div className="mb-6">
                <div className={`w-full aspect-[9/16] max-h-48 bg-gradient-to-br ${orderData.script.gradient} rounded flex items-center justify-center`}>
                  <span className="text-white text-xs opacity-75">9:16</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">剧本费用</span>
                  <span className="text-text-primary font-medium">¥{orderData.pricing.scriptPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">平台服务费</span>
                  <span className="text-text-primary font-medium">¥{orderData.pricing.platformFee}</span>
                </div>
                {orderData.pricing.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>优惠</span>
                    <span className="font-medium">-¥{orderData.pricing.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-3 border-t border-border">
                  <span className="text-text-secondary">应付总额</span>
                  <span className="text-xl font-bold text-primary">¥{orderData.pricing.total}</span>
                </div>
              </div>

              {/* 确认按钮 */}
              <button
                onClick={handleConfirmOrder}
                className="w-full py-3 bg-primary text-white text-base font-medium rounded hover:bg-primary-dark transition-colors mb-4"
              >
                确认支付
              </button>

              {/* 安全保障 */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">资金安全</p>
                    <p className="text-xs text-text-tertiary">平台托管保障</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                    <Download className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">即时交付</p>
                    <p className="text-xs text-text-tertiary">支付成功立即发货</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center">
                    <Lock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">版权保护</p>
                    <p className="text-xs text-text-tertiary">官方认证授权</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                    <Gift className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">售后保障</p>
                    <p className="text-xs text-text-tertiary">7×24客服支持</p>
                  </div>
                </div>
              </div>

              {/* 下单时间 */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-text-tertiary">
                  <Clock className="w-3 h-3" />
                  <span>下单时间：{orderData.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
