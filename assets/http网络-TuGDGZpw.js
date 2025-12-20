const n=`# HTTP/HTTPS 协议详解

## HTTP 概述
HTTP (HyperText Transfer Protocol) 是一种超文本传输协议，主要特点包括：
- **C/S 模式**：需要客户端发起请求，服务端响应
- **灵活**：可传输多种数据类型 (通过 Content-Type 标识)
- **简单快速**：基于请求-响应模型的轻量级协议
- **无连接**：每次连接只处理一个请求，响应后断开
- **无状态**：不记录之前的请求状态
- **明文传输**：不安全

## HTTPS 安全机制
HTTPS = HTTP + SSL/TLS
- 解决 HTTP 明文传输的安全问题
- 主要功能：
  - 验证服务器身份
  - 加密浏览器与服务器之间的通信
- 加密流程示例：uu.com → encode → 乱码 → decode → uu.com


## HTTP 状态码分类

### 1XX 信息响应
🟢 请求处理中
- \`100 Continue\`：已收到部分请求，等待剩余部分

### 2XX 成功响应
🟢 请求成功
- \`200 OK\`：请求成功
- \`201 Created\`：资源创建成功
- \`202 Accepted\`：已接受但未处理
- \`204 No Content\`：无返回内容

### 3XX 重定向
🔴 需要进一步操作
- \`301 Moved Permanently\`：永久重定向(网站换域名了)
- \`302 Found\`：临时重定向（如未登录跳转登录页）
- \`304 Not Modified\`：使用缓存资源

### 4XX 客户端错误
🔴 请求错误
- \`400 Bad Request\`：错误请求
- \`401 Unauthorized\`：未授权(需要登录/验证身份)
- \`403 Forbidden\`：禁止访问(登录了但权限不够)
- \`404 Not Found\`：资源不存在
- \`405 Method Not Allowed\`：请求方法不对
- \`408 Request Timeout\`：请求超时
- \`451 Unavailable For Legal Reasons\`：法律限制

### 5XX 服务端错误
🔴 服务器错误
- \`500 Internal Server Error\`：服务器内部错误
- \`502 Bad Gateway\`：网关错误
- \`503 Service Unavailable\`：服务不可用（超载/维护）
- \`505 HTTP Version Not Supported\`：不支持的HTTP版本`;export{n as default};
