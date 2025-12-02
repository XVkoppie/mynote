const n=`# 闭包

## 1.闭包是什么
闭包是一个函数加上创建函数的作用域的连接，闭包关闭了函数的自由变量
内部函数 +

它能访问的所有外部变量
## 2.闭包可以解决什么问题
1. 可以是函数内部访问到外部函数中的局部变量
2. 还可以解决一些问题
比如说：页面上有四个li,我点他们的时候呢,

因为我要先循环在执行点击事件，根据js的执行流程，会先执行同步再执行异步，

这个时候onclick是最后执行的，循环已经循环完了，点击li呢结果都是i的最后结果值，

那应该怎么办呢，加入闭包的情况下，让i注入到内存中就可以解决这个问题了，

相对呢闭包的缺点就是，变量在函数执行完之后没有被回收，会造成内存损耗问题，

当然！我们用具体的例子来理解闭包，这样就不抽象了。

## 例子1：最简单的闭包 - 计数器

\`\`\`javascript
function createCounter() {
  let count = 0; // 局部变量
  
  return function() {
    count++; // 内部函数访问外部函数的变量
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

**这里发生了什么？**
- \`createCounter()\` 执行完，按理说 \`count\` 变量应该被回收
- 但是返回的匿名函数还在引用 \`count\`
- 所以 \`count\` 被"关闭"在了这个函数里，形成了闭包

---

## 例子2：解决循环点击问题（你提到的li标签）

**问题代码：**
\`\`\`javascript
// 错误版本 - 所有li都显示5
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.textContent = '按钮 ' + i;
  btn.onclick = function() {
    console.log('点击了第' + i + '个按钮'); // 总是5！
  };
  document.body.appendChild(btn);
}
\`\`\`

**闭包解决方案：**
\`\`\`javascript
// 正确版本 - 使用IIFE创建闭包
for (var i = 0; i < 5; i++) {
  (function(index) {
    var btn = document.createElement('button');
    btn.textContent = '按钮 ' + index;
    btn.onclick = function() {
      console.log('点击了第' + index + '个按钮'); // 0,1,2,3,4
    };
    document.body.appendChild(btn);
  })(i); // 立即执行，把当前的i传进去
}
\`\`\`

**现代解决方案：**
\`\`\`javascript
// 更简单 - 直接用let
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.textContent = '按钮 ' + i;
  btn.onclick = function() {
    console.log('点击了第' + i + '个按钮'); // 正确：0,1,2,3,4
  };
  document.body.appendChild(btn);
}
\`\`\`

---

## 例子3：模块模式 - 创建私有变量

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

---

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

这样无论这个函数在哪执行，都能用背包里的东西！

你要我继续用这种具体例子的方式解释其他概念吗？比如事件循环？`;export{n as default};
