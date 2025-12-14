const n=`# Promise有几种状态

## Promise 有三种状态：
1. **Pending（进行中）**：初始状态，既不是成功也不是失败。
2. **Fulfilled（已成功）**：操作成功完成。
3. **Rejected（已拒绝）**：操作失败。

---

## **一、核心考察点**
1. **异步编程概念**：为什么需要异步？单线程与事件循环。
2. **Promise 的原理和使用**：状态、链式调用、错误处理。
3. **Async/Await 的作用和本质**：Generator 的语法糖，如何让异步代码更易读。
4. **错误处理**：try-catch 与 .catch() 的区别。
5. **性能与陷阱**：并行与串行处理、常见误区（如 await 的阻塞效应）。

---

## **二、常见问题与回答思路**

### **1. 请解释 Promise 是什么？**
**回答思路**：
- Promise 是异步编程的一种解决方案，代表一个未来完成（或失败）的操作。
- 三种状态：pending、fulfilled、rejected（状态一旦改变不可逆）。
- 优点：解决回调地狱，支持链式调用（.then/.catch）。

**示例**：
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 1000);
});
promise.then(result => console.log(result));
\`\`\`

---

### **2. Promise 有哪些常用方法？**
**回答思路**：
- \`Promise.all()\`：全部成功才成功，一个失败即失败。
- \`Promise.race()\`：第一个改变状态的结果决定最终状态。
- \`Promise.allSettled()\`：等所有 Promise 完成，返回结果数组。
- \`Promise.any()\`：任意一个成功即成功，全部失败才失败（ES2021）。
- \`Promise.resolve()/reject()\`：创建已解决/拒绝的 Promise。

---

### **3. Async/Await 解决了什么问题？**
**回答思路**：
- 让异步代码看起来像同步，提升可读性。
- 基于 Promise，是语法糖，但必须配合使用。
- 错误处理可以用 try-catch，更直观。

**示例**：
\`\`\`javascript
async function fetchData() {
  try {
    const data = await fetch('/api');
    const json = await data.json();
    console.log(json);
  } catch (error) {
    console.error('请求失败', error);
  }
}
\`\`\`

---

### **4. 如何并行执行多个异步操作？**
**回答思路**：
- 滥用 \`await\` 会导致串行，降低性能。
- 正确做法：先用 Promise 启动所有任务，再用 \`await\` 等待结果。

**示例对比**：
\`\`\`javascript
// 串行（慢）：
const a = await task1();
const b = await task2();

// 并行（快）：
const [a, b] = await Promise.all([task1(), task2()]);
\`\`\`

---

### **5. Async 函数返回的是什么？**
**回答**：始终返回一个 Promise。即使函数内部返回非 Promise 值，也会被自动包装成 Promise。

---

### **6. 如何在循环中正确使用 await？**
**陷阱**：在 forEach 中使用 await 不会按预期暂停。
**解决方案**：使用 for...of 或 map+Promise.all。

**示例**：
\`\`\`javascript
// 错误：
arr.forEach(async item => await process(item));

// 正确：
for (const item of arr) {
  await process(item); // 串行
}
// 或并行：
await Promise.all(arr.map(item => process(item)));
\`\`\`

---

### **7. 错误处理有哪些方式？**
**回答**：
- Promise 用 \`.catch()\` 或 \`.then()\` 的第二个参数。
- Async/Await 用 try-catch。
- 注意：未处理的 Promise 错误可能导致静默失败（可提及 \`unhandledrejection\` 事件）。

---

### **8. 能解释 Event Loop 与 Async/Await 的关系吗？**
**回答思路**：
- \`await\` 会暂停当前 async 函数的执行，让出线程。
- 被等待的 Promise 进入微任务队列，同步代码执行完后，Event Loop 从微任务队列中取出继续执行。
- 示例：
  \`\`\`javascript
  console.log(1);
  await Promise.resolve(2).then(console.log);
  console.log(3);
  // 输出：1, 2, 3（因为 then 是微任务）
  \`\`\`

---

### **9. 如何取消一个 Promise 或 Async 任务？**
**回答**：
- 原生 Promise 无法取消，但可以通过封装或使用 AbortController（配合 fetch）。
- 示例：利用标志位或 Promise.race() 实现超时取消。

---

## **三、进阶问题（高级岗位）**
1. **如何实现 Promise 的 polyfill？**（考察对 Promise/A+ 规范的理解）
2. **Async/Await 如何通过 Generator 实现？**（可简述 babel 转换原理）
3. **Promise 构造函数是同步还是异步执行？**（构造函数同步，then/catch 回调是微任务）
4. **输出顺序题**（结合 setTimeout、Promise、console.log 的经典事件循环题）

---

## **四、回答技巧**
- **结合实际问题**：举例说明在项目中如何优化异步代码。
- **对比不同方案**：比如 “为什么用 Async/Await 替代 then/catch”。
- **提及陷阱**：展示你对常见问题的认识（如循环中的 await、错误冒泡）。
- **保持简洁**：先给定义，再举例子，最后总结应用场景。

---
`;export{n as default};
