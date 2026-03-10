const n=`# websocket \r
\r
## 💡 面试常见问题\r
**Q1: WebSocket和HTTP有什么区别？**\r
**Q2: 什么场景下应该使用WebSocket？**\r
**Q1: WebSocket的readyState有哪几种状态？分别代表什么？**\r
**Q2: WebSocket.onmessage事件中的event.data是什么类型？**。\r
---\r
\r
## 第一步：WebSocket 基础概念\r
\r
### 💡 面试常见问题\r
**Q1: WebSocket和HTTP有什么区别？**\r
**Q2: 什么场景下应该使用WebSocket？**\r
\r
### 📚 核心知识点\r
1. **WebSocket是什么？**\r
   - 一种网络通信协议，提供**全双工**通信通道\r
   - 与HTTP不同：HTTP是请求-响应模式，WebSocket是持久连接\r
   - 适合实时应用：聊天、实时通知、股票行情等\r
\r
2. **为什么需要WebSocket？**\r
   - 传统轮询（Polling）效率低\r
   - 长轮询（Long-Polling）不够实时\r
   - WebSocket真正实现低延迟双向通信\r
\r
3. **WebSocket VS HTTP**\r
   \`\`\`\r
   HTTP: 客户端请求 → 服务器响应 → 连接关闭\r
   WebSocket: 握手 → 持久连接 → 双向实时通信\r
   \`\`\`\r
## 第二步：WebSocket API 基础\r
\r
### 💡 面试常见问题\r
**Q1: WebSocket的readyState有哪几种状态？分别代表什么？**\r
**Q2: WebSocket.onmessage事件中的event.data是什么类型？**。\r
\r
###  WebSocket 客户端API\r
\r
#### 1. 创建WebSocket连接\r
\`\`\`javascript\r
// 创建WebSocket连接\r
const socket = new WebSocket('ws://localhost:8080');\r
\r
// 或者使用wss（WebSocket Secure）\r
// const socket = new WebSocket('wss://your-domain.com');\r
\`\`\`\r
\r
#### 2. WebSocket 事件\r
WebSocket对象有四个主要事件：\r
\r
\`\`\`javascript\r
// 连接建立时触发\r
socket.onopen = function(event) {\r
    console.log('连接已建立', event);\r
};\r
\r
// 接收到消息时触发\r
socket.onmessage = function(event) {\r
    console.log('收到消息:', event.data);\r
};\r
\r
// 连接关闭时触发\r
socket.onclose = function(event) {\r
    console.log('连接关闭', event.code, event.reason);\r
};\r
\r
// 发生错误时触发\r
socket.onerror = function(error) {\r
    console.error('WebSocket错误:', error);\r
};\r
\`\`\`\r
### event.data 的类型取决于服务器发送的数据：\r
\r
- 字符串 - 最常见，服务器发送文本时\r
\r
- ArrayBuffer - 服务器发送二进制数据时\r
\r
- Blob - 服务器发送文件等大数据时\r
\r
\`\`\`javascript\r
socket.onmessage = function(event) {\r
    if (typeof event.data === 'string') {\r
        console.log('收到字符串:', event.data);\r
    } else if (event.data instanceof ArrayBuffer) {\r
        console.log('收到二进制数据');\r
    } else if (event.data instanceof Blob) {\r
        console.log('收到Blob数据');\r
    }\r
};\r
\`\`\`\r
#### 3. WebSocket 方法\r
\`\`\`javascript\r
// 发送数据\r
socket.send('Hello Server!');\r
\r
// 可以发送多种类型的数据\r
socket.send(JSON.stringify({ type: 'message', content: 'Hello' }));\r
\r
// 关闭连接\r
socket.close(1000, '正常关闭'); // 1000是正常关闭的状态码\r
\`\`\`\r
\r
#### 4. WebSocket 状态\r
\`\`\`javascript\r
// 查看连接状态\r
console.log(socket.readyState);\r
\r
// readyState的可能值：\r
// 0: CONNECTING - 连接尚未建立\r
// 1: OPEN - 连接已建立，可以通信\r
// 2: CLOSING - 连接正在关闭\r
// 3: CLOSED - 连接已关闭或无法打开\r
\`\`\`\r
\r
\r
\r
## 🔍 练习任务\r
1. 创建一个简单的HTML页面，实现上述的WebSocket连接示例\r
2. 尝试发送不同类型的数据：字符串、JSON、ArrayBuffer\r
\r
---\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
## 基础聊天室\r
server.js\r
\`\`\`js\r
const WebSocket =require('ws')\r
const wss=new WebSocket.Server({port:8080})\r
\r
// 1. 在 8080 端口启动 WebSocket 服务器\r
console.log("WebSocket 服务器已启动，监听 8080 端口...");\r
\r
// 2. 监听连接事件\r
wss.on('connection',(ws)=>{\r
    console.log('有新客户连接上了',wss.clients.size);\r
    \r
    //3. 监听客户端发来的消息\r
    ws.on('message',(data)=>{\r
        const message=data.toString()\r
        console.log(\`收到消息\${message}\`);\r
        // wss.clients 存储了当前所有连接着的客户端\r
        // 为什么这么写：如果你只用 ws.send()，那是“复读机”（只给发消息的人回话）。\r
\r
        // 原理：wss.clients 是一个集合，\r
        // 里面装着所有正在连接的用户。我们要实现聊天室，\r
        // 就必须像发传单一样，遍历每一个人，给他们每个人都发一遍。\r
        wss.clients.forEach((client)=>{\r
             // 我们只发给处于“开启状态”的客户端\r
             if(client.readyState===1){\r
                client.send(message)\r
             }\r
        })\r
        \r
    })\r
})\r
\r
wss.on('close',()=>{\r
    console.log("客户端断开了连接",wss.clients.size);\r
})\r
\`\`\`\r
前端\r
\`\`\`html\r
<script setup lang="ts">\r
import {onMounted, onUnmounted, ref} from 'vue'\r
const inputMsg=ref('')\r
const messages=ref([])\r
let socket=null\r
onMounted(()=>{\r
  socket=new WebSocket('ws://localhost:8080')\r
\r
  // 2. 监听连接成功\r
  socket.onopen=()=>{\r
    console.log('连接服务器成功！');\r
  }\r
\r
  // 3. 监听服务器发回的消息\r
\r
  // 干嘛的：这是最核心的。它是“被动触发”的。\r
  // 只要服务器广播了消息，浏览器接收到后，就会自动执行这个函数。\r
  // messages.value.push(event.data)：把收到的新消息塞进 Vue 的响应式数组里，\r
  // 页面就会自动刷新显示出新消息。\r
  socket.onmessage=(event)=>{\r
    messages.value.push(event.data)\r
  }\r
\r
  // 4. 监听错误\r
  socket.onerror=(err)=>{\r
    console.log('连接报错',err);\r
  }\r
\r
})\r
\r
const sendMsg=()=>{\r
  if(socket&&inputMsg.value){\r
    const msg=\`用户\${Math.floor(Math.random()*100)}:\${inputMsg.value}\`\r
    socket.send(msg)\r
    inputMsg.value=''\r
  }\r
}\r
\r
onUnmounted(()=>{\r
  socket?.close()\r
})\r
<\/script>\r
\r
<template>\r
  <input type="text" v-model="inputMsg">\r
  <button style="padding:0 10px;" @click="sendMsg">发 送</button>\r
\r
  <div style="margin-top: 20px;">\r
    <h4>消息记录：</h4>\r
    <ul>\r
      <li v-for="(item,index) in messages" :key="index">{{ item }}</li>\r
    </ul>\r
  </div>\r
</template>\r
\r
<style scoped>\r
\r
</style>\r
\`\`\``;export{n as default};
