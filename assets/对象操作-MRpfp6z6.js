const n=`# 对象操作\r
\r
## 遍历对象属性\r
\r
### for...in循环\r
\`\`\`js\r
const user = {name: 'Tom', age: 18, city: 'Shanghai'};\r
\r
for (let key in user) {\r
  console.log(\`\${key}: \${user[key]}\`);\r
}\r
\`\`\`\r
\r
### 使用 Object.entries()\r
\`\`\`js\r
const user = {name: 'Tom', age: 18, city: 'Shanghai'}\r
    const fn=()=>{\r
        Object.entries(user).forEach(([key,value])=>{\r
            console.log(\`\${key}: \${value}\`);\r
        })\r
    }   \r
\`\`\`\r
## 检查对象中是否存在某个属性\r
\r
### 使用 in 运算符\r
\r
\`\`\`js\r
const user = {name: 'Tom', age: 18, city: 'Shanghai'};\r
\r
if ('gender' in user) {\r
  console.log('gender 属性存在');\r
} else {\r
  console.log('gender 属性不存在');\r
}\r
\`\`\`\r
### 使用 hasOwnProperty()\r
\`\`\`js\r
if (user.hasOwnProperty('name')) {\r
  console.log('name 属性存在于对象自身');\r
}\r
\`\`\`\r
\r
### 使用Object.hasOwn()\r
\r
\`\`\`js\r
const fn=()=>{\r
    if(Object.hasOwn(user,'name')){\r
        console.log('name 属性存在于对象自身');\r
    }\r
}\r
\`\`\``;export{n as default};
