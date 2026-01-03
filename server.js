
const express = require('express');
const path = require('path');
const app = express();

// Cloud Run 动态注入 PORT 环境变量，必须监听
const port = process.env.PORT || 8080;

// 托管所有静态文件
app.use(express.static(__dirname));

// 处理单页应用路由：所有请求返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 监听所有网络接口 (0.0.0.0)
app.listen(port, '0.0.0.0', () => {
  console.log(`宗师详批系统已就绪，监听端口: ${port}`);
});
