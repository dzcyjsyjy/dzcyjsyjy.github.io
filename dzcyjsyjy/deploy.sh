#!/bin/bash

# 达州产业技术研究院官方网站 - 自动部署脚本
# 适用于 CentOS 7.x / Ubuntu 18.04+

set -e

echo "========================================="
echo "  达州产业技术研究院官方网站部署脚本"
echo "========================================="
echo ""

# 检测操作系统
if [ -f /etc/redhat-release ]; then
    OS="centos"
    echo "检测到操作系统: CentOS"
elif [ -f /etc/lsb-release ]; then
    OS="ubuntu"
    echo "检测到操作系统: Ubuntu"
else
    echo "不支持的操作系统！"
    exit 1
fi

echo ""
echo "步骤 1/6: 更新系统软件包..."
if [ "$OS" = "centos" ]; then
    yum update -y
else
    apt update && apt upgrade -y
fi

echo ""
echo "步骤 2/6: 安装Nginx..."
if [ "$OS" = "centos" ]; then
    yum install -y nginx
else
    apt install -y nginx
fi

echo ""
echo "步骤 3/6: 创建网站目录..."
mkdir -p /var/www/html
mkdir -p /var/log/nginx
mkdir -p /backup

echo ""
echo "步骤 4/6: 配置Nginx..."
# 备份原配置
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# 复制网站配置
if [ -f "./nginx.conf" ]; then
    cp ./nginx.conf /etc/nginx/conf.d/dzcyjsyjy.conf
    echo "Nginx配置文件已复制"
else
    echo "警告: 未找到nginx.conf文件，请手动配置"
fi

echo ""
echo "步骤 5/6: 设置防火墙..."
if [ "$OS" = "centos" ]; then
    if command -v firewall-cmd &> /dev/null; then
        systemctl start firewalld
        systemctl enable firewalld
        firewall-cmd --permanent --add-service=http
        firewall-cmd --permanent --add-service=https
        firewall-cmd --reload
        echo "防火墙已配置"
    fi
else
    if command -v ufw &> /dev/null; then
        ufw allow 'Nginx Full'
        ufw enable
        echo "防火墙已配置"
    fi
fi

echo ""
echo "步骤 6/6: 启动Nginx服务..."
systemctl start nginx
systemctl enable nginx
systemctl status nginx --no-pager

echo ""
echo "========================================="
echo "  基础环境部署完成！"
echo "========================================="
echo ""
echo "接下来请执行以下操作："
echo ""
echo "1. 上传网站文件到 /var/www/html/ 目录"
echo "   方法一: scp -r ./* root@服务器IP:/var/www/html/"
echo "   方法二: 使用FileZilla等FTP工具上传"
echo ""
echo "2. 修改Nginx配置中的域名"
echo "   vi /etc/nginx/conf.d/dzcyjsyjy.conf"
echo "   将 dzcyjsyjy.com 改为您的实际域名"
echo ""
echo "3. 重启Nginx服务"
echo "   systemctl restart nginx"
echo ""
echo "4. 配置域名解析"
echo "   在域名服务商控制台添加A记录指向服务器IP"
echo ""
echo "5. 申请SSL证书（可选）"
echo "   certbot --nginx -d www.您的域名.com -d 您的域名.com"
echo ""
echo "========================================="
echo "  网站访问地址"
echo "========================================="
echo "HTTP: http://服务器IP"
echo "HTTP: http://您的域名（解析生效后）"
echo ""
echo "如有问题，请查看日志："
echo "tail -f /var/log/nginx/error.log"
echo ""
