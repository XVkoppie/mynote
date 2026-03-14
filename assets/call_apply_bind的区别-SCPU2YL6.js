const n=`# call,apply,bind的区别

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
\`\`\`

## 1. 技巧一：借用构造函数 (使用 \`call\`)

在早期的 JavaScript 继承实现中，我们经常利用 \`call\` 来实现属性的继承。这能让你在一个对象中执行另一个对象的初始化逻辑。

\`\`\`javascript
function Animal(name) {
  this.name = name;
  this.eat = function() { console.log(this.name + " is eating."); };
}

function Cat(name, color) {
  // 核心：把 Animal 的属性“借”到 Cat 实例身上
  Animal.call(this, name); 
  this.color = color;
}

const myCat = new Cat('招财', '金色');
console.log(myCat.name); // "招财"
myCat.eat();             // "招财 is eating."

\`\`\`

## 2. 技巧二：偏函数与参数复用 (使用 \`bind\`)

\`bind\` 不仅仅能绑定 \`this\`，它还可以**预设参数**。这种技术被称为“柯里化”的一种简化形式。

假设你正在写一个电商后台，需要频繁计算打折后的价格：

\`\`\`javascript
function calculatePrice(tax, discount, price) {
  return price * (1 + tax) * (1 - discount);
}

// 场景：在某个特定地区，税率固定为 0.05
// 我们预设第一个参数 tax = 0.05
const applyLocalTax = calculatePrice.bind(null, 0.05);

// 场景：针对老用户，再预设一个 10% 的折扣
const vipsPrice = applyLocalTax.bind(null, 0.1);

console.log(vipsPrice(100)); // 0.05 税和 0.1 折扣自动应用，只需传价格

\`\`\`

## 3. 一个有趣的底层细节：多次 bind

如果你连续对一个函数进行 \`bind\`，结果会怎样？

\`\`\`javascript
function whoAmI() {
  console.log(this.name);
}

const obj1 = { name: '对象A' };
const obj2 = { name: '对象B' };

const boundFn = whoAmI.bind(obj1).bind(obj2);
boundFn(); // 输出：对象A

\`\`\`
**为什么？**
因为 \`bind\` 的底层实现类似于闭包封装。第二次 \`bind\` 绑定的是第一次 \`bind\` 返回的那个包装函数，而包装函数内部的 \`this\` 已经在第一次被锁死了。所以：**\`bind\` 只有第一次有效。**

ES6 引入的 **展开运算符 (\`...\`)** 和 **箭头函数**，让 \`call\`、\`apply\` 甚至 \`bind\` 的很多场景变得不再那么“笨重”
## 1. 替代 \`apply\`：使用展开运算符 (\`...\`)

以前我们想把数组元素当作参数传给函数，必须用 \`apply\`。现在，\`...\` 直接搞定。

| 场景 | 传统写法 (\`apply\`) | 现代写法 (\`...\`) |
| --- | --- | --- |
| **求数组最大值** | \`Math.max.apply(null, arr)\` | \`Math.max(...arr)\` |
| **合并数组** | \`arr1.push.apply(arr1, arr2)\` | \`arr1.push(...arr2)\` |
| **解构传参** | \`func.apply(this, args)\` | \`func(...args)\` |

**优势：** 代码更短，且不需要传那个烦人的 \`null\` 或 \`undefined\` 作为第一个参数。

## 2. 替代 \`bind\`：使用箭头函数

在 ES6 之前，我们在定时器或回调函数里经常要 \`bind(this)\`，否则 \`this\` 就丢了。箭头函数自带 **“词法作用域绑定”**，它会捕获定义时所在的 \`this\`。

#### 传统做法 (需要 bind)：

\`\`\`javascript
function Timer() {
  this.seconds = 0;
  setInterval(function() {
    this.seconds++; // 这里的 this 指向 window/undefined，报错！
  }.bind(this), 1000); 
}

\`\`\`

#### 现代做法 (自动绑定)：

\`\`\`javascript
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++; // 箭头函数没有自己的 this，直接用外层的
  }, 1000);
}

\`\`\`
`;export{n as default};
