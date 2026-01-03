
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// 托管当前目录下所有的静态文件
app.use(express.static(__dirname));

// 所有的请求都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`宗师详批系统运行在端口: ${port}`);
});
