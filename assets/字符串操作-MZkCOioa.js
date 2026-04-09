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
## .substring(startIndex, endIndex)\r
\r
接收两个参数，一个起始索引和结束索引，来指定字符串范围，如果省略第二个参数，则截取到字符串末尾。\r
\r
.substring提取字符串的一部分，并返回一个新的字符串，而不修改原始字符串\r
\r
\`\`\`js\r
date.substring(0, 7) // 返回 "YYYY-MM"\r
\`\`\`\r
\r
## .substring(startIndex, length)\r
\r
接收两个参数，并返回从 startIndex 开始，长度为 length 的子字符串。如果省略第二个参数，则截取到字符串末尾。\r
\`\`\`js\r
const str = "Hello, World!";\r
\r
console.log(str.substring(0, 5)); // 输出: "Hello"\r
\r
console.log(str.substr(7, 5)); // 输出: "World"\r
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
\`\`\`\r
\r
## hello' 变成 'olleh'（字符串反转）\r
\r
\`\`\`js\r
const str = "hello";\r
const fn = () => {\r
  // 1. split('') 把 "hello" 变成 ["h", "e", "l", "l", "o"]\r
  // 2. reverse() 变成 ["o", "l", "l", "e", "h"]\r
  // 3. join('') 变成 "olleh"\r
  return str.split('').reverse().join('');\r
}\r
console.log(fn()); // "olleh"\r
\`\`\`\r
\r
## 统计字符频率\r
\r
### 方法一\r
\`\`\`js\r
const fn=()=>{\r
  const res={}\r
\r
  for(let char of str){\r
      if(res[char]){\r
          res[char]++\r
      }else{\r
          res[char]=1\r
      }\r
  }\r
  return res\r
}\r
\`\`\`\r
### 方法二\r
\r
\`\`\`js\r
const fn2=()=>{\r
  return arr=str.split('').reduce((acc,char)=>{\r
      acc[char]=(acc[char]||0)+1\r
      return acc\r
  },{})\r
  \r
}\r
\`\`\`\r
\r
## 解析字符串\r
\r
\`\`\`js\r
const urlParams = "?name=tom&age=20";\r
\`\`\`\r
将其解析为 { name: 'tom', age: '20' }\r
\r
### 方法一\r
\`\`\`js\r
const urlParams = "?name=tom&age=20"\r
const params=new URLSearchParams(urlParams)\r
console.log(params.get('name'));\r
console.log(Object.fromEntries(params));\r
\r
\`\`\`\r
\r
### 方法二·\r
\`\`\`js\r
const urlParams = "?name=tom&age=20"\r
\r
const decodeURL=()=>{\r
  const queryString=urlParams.slice(1)\r
\r
  const pairs=queryString.split('&')\r
\r
  return pairs.reduce((acc,item)=>{\r
      // item 分别是 "name=tom" 和 "age=20"\r
      // 按 "=" 切开 -> ["name", "tom"]\r
      const [key,value]=item.split('=')\r
      acc[key]=value// 存入对象 { name: 'tom' }\r
      return acc\r
  },{})\r
}\r
\`\`\``;export{r as default};
