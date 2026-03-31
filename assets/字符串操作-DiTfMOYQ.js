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
将 'javascript' 变为 'Javascript'\r
\r
## .substring\r
.substring提取字符串的一部分，并返回一个新的字符串，而不修改原始字符串\r
\r
\`\`\`js\r
date.substring(0, 7) // 返回 "YYYY-MM"\r
\`\`\`\r
\r
## .startsWith\r
这些会被匹配\r
\`\`\`js\r
 "2024-01-15".startsWith("2024-01")   //true\r
 "2024-01-20".startsWith("2024-01")   //true\r
\`\`\`\r
  这些不会被匹配\r
\`\`\`js\r
 "2024-02-10".startsWith("2024-01")   //false\r
 "2023-12-25".startsWith("2024-01")   //false\r
\`\`\``;export{r as default};
