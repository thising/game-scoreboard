# ScoreTrack - 游戏积分记录板

一个简洁的移动端Web应用，用于记录和管理游戏/活动积分。

## 功能特性

- ✨ 快速创建活动（2-10人）
- 📝 实时录入每轮积分
- ⚖️ 自动校验积分平衡（每轮总和必须为0）
- 📊 实时排行榜和统计
- 🏆 自动判定胜者
- 📱 生成分享长图
- 🌙 支持深色/浅色/自动模式
- ⏰ 自动结束（1小时无新轮次）
- 💡 首页随机展示扑克智慧语录（中英文对照）

## 技术栈

- Vanilla JavaScript（无框架依赖）
- Tailwind CSS CDN
- Material Symbols 图标
- html2canvas（截图分享）
- LocalStorage 本地存储

## 文件结构

```
src/
├── index.html          # 主应用（单页应用）
├── js/
│   ├── app.js          # 业务逻辑
│   ├── storage.js      # 存储封装
│   └── quotes.js       # 扑克语录模块
├── data/
│   └── poker-quotes.json # 100条扑克语录（中英文对照）
└── README.md           # 说明文档
```

## 快速开始

### 本地测试

直接在浏览器中打开 `index.html` 即可使用。

```bash
open index.html
```

### 部署到服务器

1. 将 `src/` 目录下的所有文件上传到Web服务器的任意目录
2. 确保可以通过HTTPS访问（html2canvas需要）
3. 访问 `index.html`

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/game-scoreboard/src;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 使用说明

1. **创建活动**: 点击"开始新活动"，设置名称、人数、玩家昵称、积分单位
2. **录入积分**: 点击"录入本轮"，使用 +/- 按钮调整每位玩家的得分变化
3. **平衡校验**: 每轮积分总和必须为0，否则无法保存
4. **查看排行**: 实时查看排行榜和统计数据
5. **结束活动**: 点击"结束活动"生成最终结果
6. **分享结果**: 在活动结果页点击"生成分享图片"

## 扑克语录功能

首页底部会随机展示一条精选扑克语录，包含：
- 💡 灯泡图标标识
- 🇨🇳 中文语录
- 🇺🇸 英文原文对照
- 👤 名人作者署名

语录涵盖 Doyle Brunson、Phil Hellmuth、Stu Ungar 等传奇玩家的经典名言，以及《赌王之王》等电影台词。每次刷新页面随机展示不同语录。

## 浏览器支持

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## 注意事项

- 所有数据存储在浏览器 localStorage 中
- 清除浏览器数据会导致记录丢失
- 分享图片功能需要HTTPS环境
- 最大支持1000轮

## 许可证

MIT
