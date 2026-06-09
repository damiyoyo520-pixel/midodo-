#!/bin/bash

set -e

echo "🎬 欢迎使用短剧创作交易平台"
echo "=============================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker 未安装${NC}"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose 未安装${NC}"
    echo "请先安装 Docker Compose"
    exit 1
fi

echo -e "${GREEN}✅ Docker 环境检查通过${NC}"
echo ""

# 检查是否已有 .env 文件
if [ ! -f .env ]; then
    echo "📝 创建环境配置文件..."
    cat > .env << 'EOF'
# JWT 配置（请修改为随机字符串）
JWT_SECRET=change-this-in-production-to-a-random-string
CORS_ORIGIN=http://localhost
EOF
    echo -e "${GREEN}✅ .env 文件已创建${NC}"
else
    echo -e "${BLUE}ℹ️ .env 文件已存在${NC}"
fi

echo ""
echo "🚀 正在启动服务..."
echo ""

# 启动服务
docker-compose -f docker-compose.prod.yml up -d --build

echo ""
echo "⏳ 等待服务启动..."

# 等待服务启动
sleep 10

# 检查服务状态
echo ""
echo "📊 服务状态检查："
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 服务启动成功！"
echo ""
echo "🌐 访问地址："
echo "   前端应用: http://localhost"
echo "   后端 API: http://localhost:3000"
echo ""
echo "📋 下一步："
echo "   1. 打开浏览器访问 http://localhost"
echo "   2. 注册账号开始使用"
echo "   3. 阅读 DEPLOYMENT.md 了解更多"
echo ""
echo "🔍 查看日志："
echo "   docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "🛑 停止服务："
echo "   docker-compose -f docker-compose.prod.yml down"
echo ""
echo "祝您使用愉快！🎬"
