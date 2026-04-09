const n=`# 闭包-Closure

## 1.闭包是什么

在 JavaScript 中，当一个内部函数引用了其外部函数中的变量时，即使外部函数已经执行完毕并返回，内部函数依然可以访问这些变量。这种“函数及其相关的引用环境”的组合，就叫闭包。

核心逻辑： 正常情况下，函数执行完后，内部变量会被垃圾回收。但如果内部函数被外部引用了，为了保证内部函数还能运行，引擎必须让这些变量继续“活”在内存里。


闭包是一个函数加上创建函数的作用域的连接，闭包关闭了函数的自由变量
闭包 = 内部函数 + 引用的外层函数变量

闭包可以实现数据的私有

外部可以使用变量，但是不能修改

## 2.闭包可以解决什么问题

函数柯里化，私有全局变量，封装类和模块

### 函数柯里化

其实就是：接收部分参数，返回一个处理剩余参数的函数

它通过‘预置’一部分参数，返回一个新函数，从而实现了参数复用和逻辑解耦。这在函数式编程中非常常见，比如在开发中常见的 bind 方法实现、或者是高阶组件的逻辑封装，都能看到它的影子

假设你要写一个日志函数，通常包含：日志级别、出现位置、具体消息。

\`\`\`js
// 普通函数：每次都要传 "DEBUG" 和 "App.js"
log("DEBUG", "App.js", "用户点击了按钮");
log("DEBUG", "App.js", "页面加载完成");

// 柯里化：
const logger = (level) => (file) => (msg) => {
    console.log(\`[\${level}] 在 \${file} 中: \${msg}\`);
};

// 先固定 "DEBUG" 级别和 "App.js" 文件名
const debugInApp = logger("DEBUG")("App.js");

// 之后只需要传消息内容，极其简洁
debugInApp("用户点击了按钮"); 
debugInApp("页面加载完成");
\`\`\`

如果面试官让你当场写一个能让 add(1)(2)(3) 运行的代码，这是最简单的实现

\`\`\`js
const add = a => b => c => a + b + c;

console.log(add(1)(2)(3)); // 6
\`\`\`
## 封装私有变量

\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 私有变量，外部无法直接访问
  
  return {
    deposit: function(amount) {
      balance += amount;
      return \`存款成功，当前余额：\${balance}\`;
    },
    withdraw: function(amount) {
      if (amount > balance) {
        return '余额不足';
      }
      balance -= amount;
      return \`取款成功，当前余额：\${balance}\`;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
console.log(myAccount.deposit(500)); // "存款成功，当前余额：1500"
console.log(myAccount.withdraw(200)); // "取款成功，当前余额：1300"

// 无法直接访问balance，保护了数据
console.log(myAccount.balance); // undefined
\`\`\`

## 闭包带来的问题，怎么解决

## 例子4：内存泄漏问题

\`\`\`javascript
function createHeavyObject() {
  const bigData = new Array(1000000).fill('这是很大的数据');
  
  return function() {
    console.log('我持有着bigData的引用，即使没人用我也不会被回收');
    // 这里仍然可以访问bigData
  };
}

let leakyFunction = createHeavyObject();

// 即使我们不再需要这个函数，它也不会被回收
// 因为它仍然引用着bigData

// 解决方法：当不再需要时
leakyFunction = null; // 这样闭包和它引用的数据就可以被垃圾回收了
\`\`\`

---

## 可视化理解

想象闭包就像一个"背包"：
\`\`\`javascript
function outer() {
  const secret = "机密数据"; // ← 把这个放进背包
  const config = { color: "red" }; // ← 这个也放进背包
  
  return function inner() {
    console.log(secret); //  inner函数背着这个背包，走到哪都能用里面的东西
    return config;
  };
}

const myClosure = outer(); // outer执行完了，但secret和config还在背包里
\`\`\`

**现在明白了吗？** 闭包其实就是：
1. **内部函数** + 
2. **它能访问的所有外部变量**（打包成一个"背包"）

`;export{n as default};
