import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Wechat, 
  Alipay, 
  CreditCard, 
  Globe,
  Copy, 
  CheckCircle,
  Clock,
  Shield,
  Lock,
  AlertCircle,
  Phone,
  Mail,
  ChevronRight,
  Qrcode,
  Info,
  RefreshCw
} from 'lucide-react';

/**
 * Payment 组件 - 支付页面
 * 完整的二维码支付系统
 */

type PaymentMethod = 'wechat' | 'alipay' | 'card' | 'international';

const Payment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('wechat');
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30分钟倒计时
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 模拟订单数据
  const orderData = {
    orderId: `DH${Date.now().toString().slice(-10)}`,
    scriptName: '绣娘传',
    scriptAuthor: '李文秀',
    price: 399,
    platformFee: 39.9,
    total: 438.9,
    createdAt: new Date().toLocaleString('zh-CN')
  };

  // 倒计时逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 复制功能
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // 模拟支付
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate(`/order/success/${id}`);
    }, 2000);
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const paymentMethods = [
    {
      id: 'wechat' as PaymentMethod,
      name: '微信支付',
      icon: Wechat,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      instruction: [
        '打开手机微信',
        '扫描左侧二维码',
        '确认支付'
      ]
    },
    {
      id: 'alipay' as PaymentMethod,
      name: '支付宝',
      icon: Alipay,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      instruction: [
        '打开支付宝APP',
        '扫描左侧二维码',
        '完成支付'
      ]
    },
    {
      id: 'card' as PaymentMethod,
      name: '银行卡支付',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      instruction: null // 银行卡显示账号信息
    },
    {
      id: 'international' as PaymentMethod,
      name: '境外支付',
      icon: Globe,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      instruction: null // 境外支付显示IBAN
    }
  ];

  return (
    <div className="min-h-screen bg-background-grayLight">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                ← 返回
              </button>
              <h1 className="text-xl font-bold text-text-primary">订单支付</h1>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                剩余支付时间：<span className="font-bold">{formatTime(timeLeft)}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：支付二维码 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded border border-border p-8">
              <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <Qrcode className="w-5 h-5 text-primary" />
                选择支付方式
              </h2>

              {/* 支付方式选择 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded transition-all ${
                      selectedMethod === method.id
                        ? `${method.borderColor} ${method.bgColor}`
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <method.icon className={`w-8 h-8 ${method.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium text-text-primary">{method.name}</p>
                  </button>
                ))}
              </div>

              {/* 二维码显示区域 */}
              {selectedMethod === 'wechat' || selectedMethod === 'alipay' ? (
                <div className="flex items-start gap-8">
                  {/* 二维码 */}
                  <div className="flex-shrink-0">
                    <div className="w-64 h-64 bg-white border-2 border-border rounded flex items-center justify-center">
                      {/* 模拟二维码 */}
                      <div className="text-center">
                        <Qrcode className="w-32 h-32 text-text-primary mx-auto mb-2" />
                        <p className="text-xs text-text-tertiary">
                          {selectedMethod === 'wechat' ? '微信' : '支付宝'}收款码
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        刷新二维码
                      </button>
                    </div>
                  </div>

                  {/* 操作指引 */}
                  <div className="flex-1">
                    <div className="bg-background-gray rounded p-6">
                      <h3 className="font-bold text-text-primary mb-4">支付步骤</h3>
                      <ul className="space-y-4">
                        {paymentMethods
                          .find((m) => m.id === selectedMethod)
                          ?.instruction?.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center flex-shrink-0">
                                {index + 1}
                              </div>
                              <span className="text-sm text-text-secondary pt-0.5">{step}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">支付提示</p>
                          <p className="text-blue-700">
                            请在<span className="font-bold">{formatTime(timeLeft)}</span>内完成支付，超时后订单将自动取消。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedMethod === 'card' ? (
                /* 银行卡支付 */
                <div className="space-y-6">
                  <div className="bg-background-gray rounded p-6">
                    <h3 className="font-bold text-text-primary mb-4">收款账户信息</h3>
                    <div className="space-y-3">
                      {[
                        { label: '收款方名称', value: '剧本交易中心 Script Hub', key: 'name' },
                        { label: '银行名称', value: '中国工商银行北京分行', key: 'bank' },
                        { label: '银行账号', value: '6222 **** **** 8888', key: 'account' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <span className="text-sm text-text-secondary">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-text-primary">{item.value}</span>
                            <button
                              onClick={() => handleCopy(item.value, item.key)}
                              className="p-1 text-text-tertiary hover:text-primary transition-colors"
                            >
                              {copied === item.key ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">转账须知</p>
                        <ul className="space-y-1 text-blue-700">
                          <li>• 转账时请在备注中填写订单号：<span className="font-bold">{orderData.orderId}</span></li>
                          <li>• 转账完成后，请保留凭证并联系客服确认</li>
                          <li>• 平台将在确认收款后自动发送剧本下载链接</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* 境外支付 */
                <div className="space-y-6">
                  <div className="bg-background-gray rounded p-6">
                    <h3 className="font-bold text-text-primary mb-4">国际汇款信息</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Beneficiary Name', value: 'Script Hub Technology Co., Ltd.', key: 'beneficiary' },
                        { label: 'Bank Name', value: 'Industrial and Commercial Bank of China', key: 'bankName' },
                        { label: 'Bank Address', value: 'No.1 Fuxingmennei Street, Beijing, China', key: 'bankAddr' },
                        { label: 'IBAN', value: 'CN12 3456 7890 1234 5678 9012 345', key: 'iban' },
                        { label: 'SWIFT/BIC', value: 'ICBKCNBJBJM', key: 'swift' },
                        { label: 'Reference', value: `Order: ${orderData.orderId}`, key: 'ref' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <span className="text-sm text-text-secondary">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-text-primary">{item.value}</span>
                            <button
                              onClick={() => handleCopy(item.value, item.key)}
                              className="p-1 text-text-tertiary hover:text-primary transition-colors"
                            >
                              {copied === item.key ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-medium mb-1">国际汇款提示</p>
                        <ul className="space-y-1">
                          <li>• 国际汇款可能需要2-5个工作日到账</li>
                          <li>• 请确保填写正确的SWIFT代码和IBAN</li>
                          <li>• 汇款时请在备注中注明订单号以便快速确认</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 安全保障 */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">资金安全</p>
                      <p className="text-xs text-text-tertiary">托管保障</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">SSL加密</p>
                      <p className="text-xs text-text-tertiary">数据传输安全</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">即时交付</p>
                      <p className="text-xs text-text-tertiary">支付成功后自动发货</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded border border-border p-6 sticky top-6">
              <h3 className="text-lg font-bold text-text-primary mb-6">订单摘要</h3>

              {/* 剧本信息 */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">封面</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary mb-1">{orderData.scriptName}</h4>
                  <p className="text-sm text-text-secondary mb-2">作者：{orderData.scriptAuthor}</p>
                  <p className="text-xs text-text-tertiary">授权类型：独家授权</p>
                </div>
              </div>

              {/* 费用明细 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">剧本费用</span>
                  <span className="text-text-primary font-medium">¥{orderData.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">平台服务费 (10%)</span>
                  <span className="text-text-primary font-medium">¥{orderData.platformFee}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-border">
                  <span className="text-text-secondary">应付总额</span>
                  <span className="text-xl font-bold text-primary">¥{orderData.total}</span>
                </div>
              </div>

              {/* 订单信息 */}
              <div className="space-y-2 mb-6 p-4 bg-background-gray rounded text-xs">
                <div className="flex justify-between">
                  <span className="text-text-tertiary">订单编号</span>
                  <span className="text-text-secondary font-mono">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">下单时间</span>
                  <span className="text-text-secondary">{orderData.createdAt}</span>
                </div>
              </div>

              {/* 支付按钮 */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || timeLeft === 0}
                className={`w-full py-3 rounded font-medium transition-colors ${
                  isProcessing || timeLeft === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    支付处理中...
                  </span>
                ) : timeLeft === 0 ? (
                  '支付已超时'
                ) : (
                  '确认支付'
                )}
              </button>

              {/* 客服支持 */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-text-tertiary text-center mb-3">支付遇到问题？</p>
                <div className="flex items-center justify-center gap-4">
                  <a href="tel:400-888-8888" className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors">
                    <Phone className="w-4 h-4" />
                    400-888-8888
                  </a>
                  <a href="mailto:support@scripthub.com" className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors">
                    <Mail className="w-4 h-4" />
                    在线客服
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
