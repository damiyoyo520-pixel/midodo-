import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Film, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  ChevronRight,
  Star,
  Eye,
  Clock,
  Award,
  Trophy,
  Sparkles,
  Globe,
  Landmark,
  Palette,
  ArrowRight
} from 'lucide-react';

/**
 * Home 组件 - 剧本交易中心首页
 * G-Tech 视觉风格：Bento Grid 布局
 * 遵循政务红 + 科技感设计规范
 */

// Mock 数据
const mockScripts = [
  {
    id: '1',
    title: '绣娘传',
    theme: '非遗',
    category: '非遗专区',
    price: 399,
    views: 1856,
    rating: 4.9,
    author: '李文秀',
    description: '中国传统刺绣大师的人生传奇',
    poster: 'gradient-1',
    gradient: 'from-purple-600 via-pink-500 to-rose-500'
  },
  {
    id: '2',
    title: '京剧大师',
    theme: '非遗',
    category: '非遗专区',
    price: 499,
    views: 2141,
    rating: 4.8,
    author: '王德明',
    description: '京剧表演艺术家的传承之路',
    poster: 'gradient-2',
    gradient: 'from-red-600 via-orange-500 to-yellow-500'
  },
  {
    id: '3',
    title: '唐人街往事',
    theme: '海外',
    category: '海外专区',
    price: 349,
    views: 2356,
    rating: 4.7,
    author: '陈建国',
    description: '纽约唐人街的80年代往事',
    poster: 'gradient-3',
    gradient: 'from-blue-900 via-blue-700 to-cyan-500'
  },
  {
    id: '4',
    title: '西湖·千年情',
    theme: '文旅',
    category: '文旅专区',
    price: 369,
    views: 2621,
    rating: 4.9,
    author: '张晓月',
    description: '西湖边的千古爱情故事',
    poster: 'gradient-4',
    gradient: 'from-green-500 via-emerald-500 to-teal-500'
  },
  {
    id: '5',
    title: '东京物语',
    theme: '海外',
    category: '海外专区',
    price: 329,
    views: 1923,
    rating: 4.6,
    author: '佐藤健',
    description: '东京夜幕下的都市传奇',
    poster: 'gradient-5',
    gradient: 'from-gray-900 via-gray-800 to-gray-700'
  },
  {
    id: '6',
    title: '敦煌飞天',
    theme: '文旅',
    category: '文旅专区',
    price: 459,
    views: 2876,
    rating: 4.9,
    author: '赵艺术',
    description: '敦煌壁画中的飞天仙子',
    poster: 'gradient-6',
    gradient: 'from-amber-600 via-orange-500 to-yellow-500'
  },
  {
    id: '7',
    title: '星河彼岸',
    theme: '科幻',
    category: '剧本市场',
    price: 449,
    views: 1876,
    rating: 4.8,
    author: '刘星河',
    description: '跨越星际的爱情与冒险',
    poster: 'gradient-7',
    gradient: 'from-indigo-900 via-purple-800 to-pink-600'
  },
  {
    id: '8',
    title: '乡村教师',
    theme: '温暖',
    category: '剧本市场',
    price: 199,
    views: 3421,
    rating: 5.0,
    author: '马云飞',
    description: '大山深处教师的坚守与希望',
    poster: 'gradient-8',
    gradient: 'from-teal-400 via-emerald-500 to-green-500'
  }
];

const mockRequirements = [
  {
    id: '1',
    title: 'MCN机构定制微电影剧本',
    company: '星耀传媒集团',
    budget: '50,000 - 80,000',
    deadline: '15天',
    bids: 23,
    category: '定制创作',
    tags: ['微电影', '正能量', '品牌定制'],
    verified: true,
    urgent: true
  },
  {
    id: '2',
    title: '文旅景区宣传片剧本招标',
    company: '杭州西湖文化传媒',
    budget: '30,000 - 50,000',
    deadline: '10天',
    bids: 15,
    category: '文旅推广',
    tags: ['景区', '宣传', '文化'],
    verified: true,
    urgent: false
  },
  {
    id: '3',
    title: '短视频剧情脚本长期合作',
    company: '抖音官方MCN',
    budget: '8,000 - 15,000/集',
    deadline: '长期有效',
    bids: 156,
    category: '短视频',
    tags: ['短视频', '剧情', '长期'],
    verified: true,
    urgent: false
  },
  {
    id: '4',
    title: '非遗传承纪录片剧本',
    company: '国家非遗保护中心',
    budget: '100,000 - 150,000',
    deadline: '30天',
    bids: 8,
    category: '纪录片',
    tags: ['非遗', '纪录片', '政府项目'],
    verified: true,
    urgent: true
  }
];

const Home: React.FC = () => {
  const [searchTab, setSearchTab] = useState<'script' | 'requirement'>('script');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background-grayLight">
      {/* 官方比赛横幅 */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary animate-glow-pulse">
        <div className="max-w-8xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-3 text-white">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">
              📢 首届全国短剧创作大赛正式开启！百万奖金池，等你来战！
            </span>
            <Link 
              to="/competition" 
              className="ml-4 px-4 py-1.5 bg-white text-primary text-sm font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              立即报名
            </Link>
          </div>
        </div>
      </div>

      {/* 顶部导航 */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary tracking-tight">
                  剧本交易中心
                </h1>
                <p className="text-xs text-text-tertiary -mt-0.5">
                  Script Hub
                </p>
              </div>
            </Link>

            {/* 导航菜单 */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/home" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">
                首页
              </Link>
              <Link to="/scripts" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                剧本市场
              </Link>
              <Link to="/marketplace" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                需求大厅
              </Link>
              <Link to="/workspace" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                创作中心
              </Link>
              <Link to="/community" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                社区
              </Link>
            </nav>

            {/* 用户操作 */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-text-tertiary hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link 
                to="/workspace" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
              >
                <Zap className="w-4 h-4" />
                开始创作
              </Link>
              <Link 
                to="/login" 
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                登录
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero 区域 */}
      <section className="bg-white border-b border-border">
        <div className="max-w-8xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
              短剧产业的
              <span className="text-primary"> 交易闭环 </span>
              平台
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              连接创作者与市场，提供剧本交易、定制创作、会员分销的一站式服务
            </p>
          </div>

          {/* 双轨搜索区 */}
          <div className="max-w-4xl mx-auto">
            {/* 搜索 Tab */}
            <div className="flex items-center justify-center gap-1 mb-6 bg-background-gray rounded p-1">
              <button
                onClick={() => setSearchTab('script')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-all ${
                  searchTab === 'script'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Film className="w-4 h-4" />
                搜剧本
              </button>
              <button
                onClick={() => setSearchTab('requirement')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-all ${
                  searchTab === 'requirement'
                    ? 'bg-white text-accent shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                搜需求
              </button>
            </div>

            {/* 搜索框 */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchTab === 'script' 
                  ? '搜索剧本名称、类型、作者...' 
                  : '搜索需求名称、公司、类型...'
                }
                className="w-full px-6 py-4 pr-32 text-base bg-white border-2 border-border rounded focus:border-primary focus:outline-none transition-colors"
              />
              <button className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 text-white text-sm font-medium rounded transition-colors ${
                searchTab === 'script' 
                  ? 'bg-primary hover:bg-primary-dark' 
                  : 'bg-accent hover:bg-accent-dark'
              }`}>
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* 热门标签 */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-sm text-text-tertiary">热门：</span>
              {['都市情感', '悬疑推理', '古装历史', '科幻冒险', '非遗文化'].map((tag) => (
                <button 
                  key={tag}
                  className="px-3 py-1 text-xs text-text-secondary bg-background-gray rounded hover:bg-primary hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 三大专区入口 */}
      <section className="bg-white border-b border-border">
        <div className="max-w-8xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 海外专区 */}
            <Link 
              to="/zone/global"
              className="group relative overflow-hidden rounded bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 p-8 h-48 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <Globe className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">海外专区</h3>
                <p className="text-blue-100 text-sm">全球剧本，创意无界</p>
                <div className="mt-4 flex items-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>探索海外剧本</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-5 rounded-full" />
            </Link>

            {/* 文旅专区 */}
            <Link 
              to="/zone/culture"
              className="group relative overflow-hidden rounded bg-gradient-to-br from-amber-700 via-orange-600 to-yellow-500 p-8 h-48 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <Landmark className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">文旅专区</h3>
                <p className="text-amber-100 text-sm">文化旅行，精彩故事</p>
                <div className="mt-4 flex items-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>探索文旅剧本</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-5 rounded-full" />
            </Link>

            {/* 非遗专区 */}
            <Link 
              to="/zone/heritage"
              className="group relative overflow-hidden rounded bg-gradient-to-br from-purple-700 via-pink-600 to-rose-500 p-8 h-48 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <Palette className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">非遗专区</h3>
                <p className="text-purple-100 text-sm">传统工艺，匠心传承</p>
                <div className="mt-4 flex items-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>探索非遗剧本</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-5 rounded-full" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid 布局区 */}
      <section className="bg-background-grayLight">
        <div className="max-w-8xl mx-auto px-6 py-12">
          <div className="grid grid-cols-12 gap-6">
            {/* 左侧：最新上架剧本 (8列) */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <h3 className="text-xl font-bold text-text-primary">最新上架剧本</h3>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                      HOT
                    </span>
                  </div>
                  <Link 
                    to="/scripts"
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    查看全部
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="p-6">
                  {/* Bento Grid: 剧本展示 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mockScripts.map((script, index) => (
                      <Link
                        key={script.id}
                        to={`/scripts/${script.id}`}
                        className={`group rounded border border-border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                          index === 0 || index === 5 ? 'md:col-span-2' : ''
                        }`}
                      >
                        {/* 剧本海报 (9:16 竖屏) */}
                        <div className={`aspect-[9/16] bg-gradient-to-br ${script.gradient} relative overflow-hidden`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Film className="w-12 h-12 text-white opacity-20" />
                          </div>
                          {/* 标签 */}
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-1 bg-white/90 text-xs font-medium text-text-primary rounded">
                              {script.category}
                            </span>
                          </div>
                          {/* 价格 */}
                          <div className="absolute bottom-2 right-2">
                            <span className="px-2 py-1 bg-primary text-xs font-bold text-white rounded">
                              ¥{script.price}
                            </span>
                          </div>
                        </div>

                        {/* 剧本信息 */}
                        <div className="p-3">
                          <h4 className="font-semibold text-text-primary text-sm mb-1 group-hover:text-primary transition-colors">
                            {script.title}
                          </h4>
                          <p className="text-xs text-text-tertiary mb-2 line-clamp-1">
                            {script.description}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-text-tertiary">
                              <Eye className="w-3 h-3" />
                              <span>{script.views}</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{script.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：B端需求 (4列) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded border border-border sticky top-20">
                <div className="p-6 border-b border-border flex items-center gap-3">
                  <div className="w-1 h-6 bg-accent rounded-full" />
                  <h3 className="text-xl font-bold text-text-primary">高净值B端需求</h3>
                </div>

                <div className="p-4 space-y-4">
                  {mockRequirements.map((req) => (
                    <Link
                      key={req.id}
                      to={`/marketplace`}
                      className="block p-4 border border-border rounded hover:border-accent hover:shadow-md transition-all"
                    >
                      {/* 标题和标签 */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="font-semibold text-text-primary text-sm flex-1">
                          {req.title}
                        </h4>
                        {req.urgent && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded shrink-0">
                            紧急
                          </span>
                        )}
                      </div>

                      {/* 公司信息 */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-accent/10 rounded flex items-center justify-center">
                          <Briefcase className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-xs text-text-secondary">{req.company}</span>
                        {req.verified && (
                          <Shield className="w-3 h-3 text-green-500" />
                        )}
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {req.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-background-gray text-xs text-text-tertiary rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 底部信息 */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-text-tertiary">预算</p>
                            <p className="text-sm font-bold text-accent">{req.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs text-text-tertiary">截止</p>
                            <p className="text-sm font-medium text-text-secondary">{req.deadline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-tertiary">
                          <Users className="w-3 h-3" />
                          <span>{req.bids}人投标</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="p-4 border-t border-border">
                  <Link
                    to="/marketplace"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white text-sm font-medium rounded hover:bg-accent-dark transition-colors"
                  >
                    查看全部需求
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="bg-white border-b border-border">
        <div className="max-w-8xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '注册创作者', value: '12,847', icon: Users, trend: '+12.5%' },
              { label: '上架剧本', value: '8,392', icon: Film, trend: '+8.3%' },
              { label: '完成交易', value: '5,621', icon: TrendingUp, trend: '+15.7%' },
              { label: '平台抽佣', value: '¥2.3M', icon: Award, trend: '+10.2%' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium">{stat.trend} ↑</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特色功能 */}
      <section className="bg-background-grayLight">
        <div className="max-w-8xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">平台核心优势</h3>
            <p className="text-text-secondary">一站式解决剧本创作、交易、授权全流程</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: '安全交易',
                description: '资金托管、版权保护、专业法律支持'
              },
              {
                icon: Zap,
                title: '高效创作',
                description: 'AI辅助创作、云端协作、模板市场'
              },
              {
                icon: Users,
                title: '分销体系',
                description: '邀请返利、会员折扣、佣金分成'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded border border-border p-6 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h4>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-text-primary mb-4">产品服务</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link to="/scripts" className="hover:text-primary">剧本市场</Link></li>
                <li><Link to="/marketplace" className="hover:text-primary">需求大厅</Link></li>
                <li><Link to="/workspace" className="hover:text-primary">创作中心</Link></li>
                <li><Link to="/templates" className="hover:text-primary">模板市场</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-text-primary mb-4">交易保障</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link to="/help/trading" className="hover:text-primary">交易规则</Link></li>
                <li><Link to="/help/copyright" className="hover:text-primary">版权保护</Link></li>
                <li><Link to="/help/appeal" className="hover:text-primary">纠纷处理</Link></li>
                <li><Link to="/help/agreement" className="hover:text-primary">用户协议</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-text-primary mb-4">帮助中心</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link to="/help/creator" className="hover:text-primary">创作者指南</Link></li>
                <li><Link to="/help/buyer" className="hover:text-primary">买家指南</Link></li>
                <li><Link to="/help/payment" className="hover:text-primary">支付帮助</Link></li>
                <li><Link to="/help/contact" className="hover:text-primary">联系客服</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-text-primary mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>客服热线：400-888-8888</li>
                <li>商务合作：bd@scripthub.com</li>
                <li>工作时间：9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-text-tertiary">
            <p>© 2024 剧本交易中心 Script Hub. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
