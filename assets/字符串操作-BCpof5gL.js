const r=`# 字符串操作\r
\r
## 字符串截取\r
从 'Hello JavaScript' 中提取出 'Java'\r
\`\`\`js\r
const data = 'Hello JavaScript'\r
const res=data.slice(6,10)\r
\`\`\`\r
## 大小写转换\r
\`\`\`js\r
const data = 'Hello JavaScript'\r
const res1=data.toLocaleUpperCase()\r
\r
const re2=res1.toLocaleLowerCase()\r
console.log("🚀 ~ re2:", re2)\r
console.log("🚀 ~ res1:", res1)\r
\`\`\`\r
\r
## 首字母大写\r
将 'javascript' 变为 'Javascript'`;export{r as default};
