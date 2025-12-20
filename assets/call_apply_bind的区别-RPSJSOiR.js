const e=`# call,apply,bind的区别

共同点：
1. 可以改变this指向
语法：函数.call(),函数.apply(),函数.bind()
## call()
- 立即执行函数

- 参数逐个传递
\`\`\`js
function greet(name, age) {
  console.log(\`Hello \${name}, you are \${age} years old. I'm \${this.role}\`);
}

const context = { role: 'developer' };

greet.call(context, 'Alice', 25); // 立即执行
// 输出: Hello Alice, you are 25 years old. I'm developer
\`\`\`
##  apply()
- 立即执行函数

- 参数以数组形式传递
\`\`\`js
function greet(name, age) {
  console.log(\`Hello \${name}, you are \${age} years old. I'm \${this.role}\`);
}

const context = { role: 'developer' };

greet.apply(context, ['Alice', 25]); // 立即执行
// 输出: Hello Alice, you are 25 years old. I'm developer
\`\`\`
## bind()
- 不立即执行，而是返回一个新函数

- 参数可以分次传递（柯里化）

- 语法：func.bind(thisArg, arg1, arg2, ...)
\`\`\`js
function greet(name, age) {
  console.log(\`Hello \${name}, you are \${age} years old. I'm \${this.role}\`);
}

const context = { role: 'developer' };

const boundGreet = greet.bind(context, 'Alice'); // 返回新函数，不执行
boundGreet(25); // 稍后执行
// 输出: Hello Alice, you are 25 years old. I'm developer
\`\`\``;export{e as default};
