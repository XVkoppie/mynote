const r=`# async/await\r
\r
## 1. async/await 是什么？解决了什么问题？\r
\r
- 答案要点：基于 Promise的一个语法糖\r
\r
- 解决的问题：\r
\r
解决回调地狱（Callback Hell）\r
\r
使异步代码看起来像同步代码，提高可读性\r
\r
更好的错误处理（try/catch）\r
## 2. async 函数返回值是什么？\r
\`\`\`js\r
async function foo() {\r
    return 42;\r
}\r
// 等价于\r
function foo() {\r
    return Promise.resolve(42);\r
}\r
\`\`\`\r
## 3. await 可以单独使用吗？\r
\r
不能\r
\r
\`\`\`js\r
// 错误\r
function foo() {\r
    await somePromise(); // SyntaxError\r
}\r
\r
// 正确\r
async function foo() {\r
    await somePromise();\r
}\r
\`\`\`\r
## 4. async/await 的错误处理方式？\r
\`\`\`js\r
// 方式1：try-catch\r
async function fetchData() {\r
    try {\r
        const data = await fetchAPI();\r
    } catch (error) {\r
        console.error(error);\r
    }\r
}\r
\r
// 方式2：Promise.catch\r
async function fetchData() {\r
    const data = await fetchAPI().catch(error => {\r
        console.error(error);\r
    });\r
}\r
\r
// 方式3：外层catch\r
fetchData().catch(error => console.error(error));\r
\`\`\``;export{r as default};
