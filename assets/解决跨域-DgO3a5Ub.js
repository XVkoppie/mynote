const n=`# 什么是跨域

处于浏览器同源策略的限制，浏览器会拒绝跨域请求
> 浏览器的同源策略，同源策略是浏览很重要的安全策略，会限制非同源的请求，避免受到攻击

> 同源的意思 域名，端口，协议 都相同 ,只要有一个不相同就属于跨域



vue: http://localhost:8080

springboot: http://localhost:8081 端口号不同

| 主机(http://www.xiaoman.com) | 是否跨域 | 原因 |
|------|----------|------|
| https://www.xiaoman.com | 是 | 协议不同 http https |
| http://www.xiaoman.com:8001 | 是 | 端口不同 80 8001 |
| http://www.baidu.com | 是 | 域名不同 xiaoman baidu |
| http://www.xiaoman.com/a.html | 否 | 协议 端口 域名 全部相同 |

> 浏览器会拦截非同源的请求，比如同源的请求是http://localhost:8080/list，但是请求的资源是http://localhost:8081/list，那么浏览器就会拦截这个请求。

前后端分离的项目里面，前端调用后端接口 会报一个错误：
> Access to XMLHttpRequest at 'http://localhost:8080' from origin 'http://localhost:8081/list' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
1. 大致意思是 'http://localhost:8080' 想访问 'http://localhost:8081/list' 时，被cors策略阻止了，请求的资源上不存在‘Access-Control-Allow-Origin’头，就导致报错。
请求中缺少http头信息，导致响应读取被阻止了，这个不是后端问题，是前端的问题。
2. 为什么浏览器会拦截：


> CORS 全名是 Cross-Origin Resource Sharing，跨域资源共享。
3. 解决方案：

01. 前后端协商jsonp

jsonp
- 原理就是通过script的src不受同源策略的限制，可以跨域请求数据，但是只能发送get请求
- 缺点：只能发送get请求，不安全，不容易维护
- 后端返回的是一个函数，这个函数必须在前端定义好，他会把值注入到函数的参数里

02. 前端解决使用代理dev

03. 后端解决 设置请求头

04. 运维解决nginx代理

`;export{n as default};
