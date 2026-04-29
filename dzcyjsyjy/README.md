# 达州产业技术研究院官方网站

## 📁 项目结构

```
dzcyjsyjy/
├── index.html              # 网站主页
├── styles.css              # 样式文件
├── script.js               # 交互脚本
├── images/                 # 图片资源
│   ├── maguochun.jpg       # 马国春院长头像
│   └── 达州产业技术研究院logo.jpg  # 研究院标志
├── 部署指南.md              # 详细部署文档
├── nginx.conf              # Nginx配置文件
├── deploy.sh               # 自动部署脚本
├── backup.sh               # 自动备份脚本
└── README.md               # 本文件
```

## 🚀 快速开始

### 本地预览

1. 在项目目录下启动本地服务器：
```bash
python -m http.server 8000
```

2. 打开浏览器访问：http://localhost:8000

### 服务器部署

#### 方法一：自动部署（推荐）

1. 上传整个项目到服务器：
```bash
scp -r D:\达州产业技术研究院官方网站\dzcyjsyjy root@服务器IP:/root/
```

2. 连接服务器并执行部署脚本：
```bash
ssh root@服务器IP
cd /root/dzcyjsyjy
chmod +x deploy.sh
./deploy.sh
```

3. 按照提示完成后续配置

#### 方法二：手动部署

请参考 `部署指南.md` 文档中的详细步骤。

## 📋 部署清单

- [x] 网站开发完成
- [x] 创建部署文档
- [x] 创建Nginx配置文件
- [x] 创建自动部署脚本
- [x] 创建备份脚本
- [ ] 购买域名
- [ ] 购买服务器
- [ ] 完成备案
- [ ] 部署上线

## 🔧 配置说明

### Nginx配置

配置文件位置：`nginx.conf`

需要修改的内容：
- `server_name`: 改为您的实际域名
- `root`: 网站文件路径（默认为 `/var/www/html`）
- SSL证书路径（申请SSL后配置）

### 自动备份

设置定时备份：
```bash
# 编辑定时任务
crontab -e

# 添加以下内容（每天凌晨2点执行备份）
0 2 * * * /root/dzcyjsyjy/backup.sh >> /var/log/backup.log 2>&1
```

## 📊 网站功能

- ✅ 响应式设计，支持各种设备
- ✅ 顶部通知公告滚动条
- ✅ 数据统计展示（带动画效果）
- ✅ 新闻动态标签页切换
- ✅ 组织架构树状图（可展开/收起）
- ✅ 留言表单
- ✅ SEO优化

## 🎨 技术栈

- **前端**：HTML5 + CSS3 + JavaScript
- **字体**：Google Fonts (Noto Sans SC)
- **图标**：Font Awesome 6.4.0
- **服务器**：Nginx
- **SSL**：Let's Encrypt (免费)

## 📞 技术支持

如有问题，请查看：
- 部署指南：`部署指南.md`
- Nginx日志：`/var/log/nginx/error.log`
- 备份日志：`/var/log/backup.log`

## 📝 更新日志

### v1.0.0 (2026-04-10)
- 完成网站基础功能开发
- 添加官方公告栏
- 优化页面布局
- 创建部署文档和脚本

---

**达州产业技术研究院**  
创新驱动发展 · 科技引领未来
