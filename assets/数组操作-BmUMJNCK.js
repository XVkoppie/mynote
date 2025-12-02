const n=`# JavaScript 数组方法完全指南

## 基本数组操作方法

#### 1. push() - 尾部添加元素
\`\`\`javascript
// 添加元素到数组末尾（可一次添加多个元素）
list.push(7);
console.log(list); // [1, 2, 3, ..., 'hello', 7]
\`\`\`
- 修改原数组
- 返回新数组长度

#### 2. pop() - 尾部删除元素
\`\`\`javascript
// 删除并返回数组最后一个元素
list.pop();
console.log(list); // 移除最后一个元素7
\`\`\`
- 修改原数组
- 返回被删除的元素

#### 3. unshift() - 头部添加元素
\`\`\`javascript
// 添加元素到数组开头
list.unshift(11);
console.log(list); // [11, 1, 2, 3, ...]
\`\`\`
- 修改原数组
- 返回新数组长度

#### 4. shift() - 头部删除元素
\`\`\`javascript
// 删除并返回数组第一个元素
list.shift();
console.log(list); // 移除开头的11
\`\`\`
- 修改原数组
- 返回被删除的元素

#### 5. splice() - 删除/替换元素
\`\`\`javascript
/*
splice(startIndex, deleteCount, newElement1, newElement2, ...)
- startIndex: 开始位置索引
- deleteCount: 要删除的元素个数
- newElements: 要添加的新元素
*/
list.splice(3, 2, 666, 888, 999);
console.log(list); // 从索引3开始删除2个元素，并插入666,888,999
\`\`\`
- 修改原数组
- 返回被删除元素的数组

#### 6. slice() - 截取子数组
\`\`\`javascript
/*
slice(startIndex, endIndex)
- 前闭后开区间[startIndex, endIndex)
- 不传endIndex则截取到末尾
- 不修改原数组
*/
const subArr1 = list.slice(3, 6); // 截取索引3到5的元素
const subArr2 = list.slice(3);// 截取从索引3到末尾
console.log(subArr1, subArr2);
\`\`\`

#### 7. concat() - 合并数组
\`\`\`javascript
/*
concat() 合并数组
- 参数可以是元素或数组
- 不修改原数组
*/
const newArr = list.concat(7, 8, 9);
console.log(newArr); // 原数组末尾添加7,8,9
\`\`\`

#### 8. reverse() - 反转数组
\`\`\`javascript
// 反转数组元素顺序
const reversed = list.reverse();
console.log(reversed); // 反转后的数组
console.log(list);// 原数组也被修改
\`\`\`

#### 9. join() - 数组转字符串
\`\`\`javascript
// 用指定分隔符连接数组元素
const str = list.join(".");
console.log(str); // "1.2.3.666.888..."
\`\`\`

#### 10. toString() - 数组转字符串
\`\`\`javascript
// 将数组转换为逗号分隔的字符串
const str = list.toString();
console.log(str); // "1,2,3,666,888..."
\`\`\`

## 数组搜索方法

#### 11. indexOf() - 查找元素索引
\`\`\`javascript
/*
查找元素第一次出现的索引
- 找到返回索引
- 未找到返回-1
*/
console.log(list.indexOf(999));// 存在返回索引
console.log(list.indexOf(1000));// 不存在返回-1
console.log(list.indexOf('hello'));// 字符串也可查找
\`\`\`

#### 12. lastIndexOf() - 查找最后出现位置
\`\`\`javascript
/*
查找元素最后一次出现的索引
- 从后向前查找
- 未找到返回-1
*/
console.log(list.lastIndexOf(1));// 返回最后一个1的索引
console.log(list.lastIndexOf('hello'));
\`\`\`

#### 13. includes() - 检查元素存在
\`\`\`javascript
/*
检查数组是否包含某元素
- 返回布尔值
- ES6新增方法
*/
console.log(list.includes(1));// true
console.log(list.includes(180));// false
\`\`\`

## 总结对比表

| 方法 | 修改原数组 | 返回值 | 说明 |
|------|-----------|--------|------|
| push() | ✔ | 新长度 | 尾部添加 |
| pop() | ✔ | 删除项 | 尾部删除 |
| unshift() | ✔ | 新长度 | 头部添加 |
| shift() | ✔ | 删除项 | 头部删除 |
| splice() | ✔ | 删除项数组 | 删除/替换 |
| slice() | ✖ | 新数组 | 截取子数组 |
| concat() | ✖ | 新数组 | 合并数组 |
| reverse() | ✔ | 反转数组 | 反转顺序 |
| join() | ✖ | 字符串 | 连接为字符串 |
| toString() | ✖ | 字符串 | 转字符串 |
| indexOf() | ✖ | 索引/-1 | 查找元素 |
| lastIndexOf() | ✖ | 索引/-1 | 反向查找 |
| includes() | ✖ | boolean | 存在检查 |

> 提示：在实际开发中，根据是否需要修改原数组来选择合适的方法。函数式编程中推荐使用不修改原数组的方法（slice、concat等）。

## 进阶数组操作方法

#### 1. 会遍历所有元素的方法

##### 🟢 forEach
\`\`\`javascript
list.forEach(item => {
console.log(item.score); // 遍历打印每个分数
});
\`\`\`
- 特点：单纯遍历，无返回值
- 应用场景：执行副作用操作

##### 🟢 filter
\`\`\`javascript
const highScores = list.filter(item => item.score > 80);
const males = list.filter(item => item.gender == '男');
\`\`\`
- 特点：返回新数组，不修改原数组
- 注意：会检查所有元素

##### 🟢 map
\`\`\`javascript
const names = list.map(item => item.name);
const scoreCards = list.map(item => ({
username: item.name,
score: item.score
}));

// 解构写法
const simplified = list.map(({name, score}) => ({name, userScore: score}));
\`\`\`
- 特点：数组变形利器
- 应用：数据格式转换

#### 2. 可能提前终止遍历的方法

##### 🔵 some
\`\`\`javascript
const hasFailures = list.some(item => {
console.log(\`Checking \${item.id}\`); // 会提前终止
return item.score < 60;
});
\`\`\`
- 特点：找到即停
- 返回值：Boolean

##### 🔵 every
\`\`\`javascript
const allPassed = list.every(item => {
console.log(\`Checking \${item.id}\`); // 遇到失败即停
return item.score >= 60;
});
\`\`\`
- 特点：全真才真
- 应用：表单验证

##### 🔵 find/findIndex
\`\`\`javascript
const firstFail = list.find(item => item.score < 60);
const failIndex = list.findIndex(item => item.score < 60);
\`\`\`
- 区别：返回元素 vs 返回索引
- 共同点：找到即停

## 二、排序方法

#### 🟠 sort
\`\`\`javascript
// 基本排序
list.sort((a, b) => a.score - b.score); // 升序
list.sort((a, b) => b.score - a.score); // 降序

// 多条件排序
list.sort((a, b) => {
if(a.gender !== b.gender) {
return a.gender === "男" ? -1 : 1; // 性别优先
}
return b.score - a.score; // 分数降序
});

// 字符串排序
list.sort((a, b) => a.name.localeCompare(b.name));

// 随机排序
list.sort(() => Math.random() - 0.5);

// 数字字符串处理
list.sort((a, b) => +a.score - +b.score);
\`\`\`
- 重要：会修改原数组
- 技巧：链式比较写法

## 三、归约方法

#### 🟣 reduce
\`\`\`javascript
// 计算总分
const total = list.reduce((sum, item) => sum + +item.score, 0);

// 结构说明
arr.reduce((accumulator, current, index, array) => {
// 处理逻辑
}, initialValue);
\`\`\`


## 七、最佳实践建议

1. **纯函数优先**：优先使用map/filter等不修改原数组的方法
2. **性能考虑**：大数据集避免连续多次遍历
3. **链式调用**：合理组合方法如\`.filter().map()\`
4. **类型安全**：处理数字字符串时显式转换（如\`+item.score\`）
5. **代码可读性**：复杂排序建议拆分为独立函数
`;export{n as default};
