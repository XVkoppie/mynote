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
\`\`\`\r
\r
## 合并对象\r
\r
\r
给定 obj1 = {a: 1} 和 obj2 = {b: 2}，将它们合并成一个新对象 {a: 1, b: 2}\r
\r
### 方法1\r
\`\`\`js\r
const obj1 = {a: 1} \r
const obj2 = {b: 2}\r
const merged={...obj1,...obj2}\r
\`\`\`\r
\r
### 方法2\r
\`\`\`js\r
const obj1 = {a: 1} \r
const obj2 = {b: 2}\r
const merged=Object.assign({},obj1,obj2)\r
\`\`\`\r
\r
## 删除属性\r
从 user 对象中安全地删除 age 属性，且不影响原对象（返回一个新对象）\r
\r
\`\`\`js\r
const user = {name: 'Tom', age: 18, city: 'Shanghai'};\r
\r
const {city,...newUser}=user\r
\r
console.log(newUser);// {name: 'Tom', city: 'Shanghai'}\r
console.log(user);// 原对象依然是 {name: 'Tom', age: 18, ...}\r
\`\`\`\r
\r
## 对象重命名\r
将 const data = {oldName: 'Alice', age: 20} 中的 oldName 键名改为 newName\r
\r
### 解构赋值\r
\`\`\`js\r
const data = {oldName: 'Alice', age: 20};\r
\r
// 这里的 oldName: newName 意思是：提取 oldName 的值，并命名为变量 newName\r
const { oldName: newName, ...rest } = data;\r
\r
// 重新组合成新对象\r
const newData = { newName, ...rest };\r
\r
console.log(newData); // {newName: 'Alice', age: 20}\r
console.log(data);    // 原对象保持不变\r
\`\`\`\r
\r
`;export{n as default};
