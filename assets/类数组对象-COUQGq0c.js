const r=`# 类数组\r
## 什么是类数组对象\r
\r
类数组也叫伪数组，类数组和数组类似，\r
\r
但它和真数组的区别在于： 它的原型链上没有 Array.prototype。这意味着你不能直接调用 push()、pop()、map() 或 forEach() 等数组内置方法，\r
\r
常见的类数组有arguments、通过document.getElements获取到的内容等，这些类数组具有length属性\r
\r
## 如何将类数组转化为数组\r
\r
### 1. Array.from()\r
\r
\`\`\`JavaScript\r
const arrayLike = { 0: 'a', 1: 'b', length: 2 };\r
const arr = Array.from(arrayLike); \r
// ['a', 'b']\r
\`\`\`\r
\r
### 2. 通过 call 调用数组的 slice 方法来实现转换\r
\`\`\`JavaScript\r
Array.prototype.slice.call(arrayLike)\r
\`\`\`\r
\r
### 3. 通过 call 调用数组的 splice 方法来实现转换\r
\`\`\`JavaScript\r
Array.prototype.splice.call(arrayLike, 0)\r
\`\`\`\r
\r
### 4. 通过 apply 调用数组的 concat 方法来实现转换\r
\`\`\`JavaScript\r
Array.prototype.concat.apply([], arrayLike)\r
\`\`\`\r
\r
### 5. 扩展运算符 ...\r
\r
这种方式非常简洁，但前提是该类数组对象必须是可迭代的（部署了 Iterator 接口）。\r
\r
arguments 和 NodeList 可以使用。\r
\r
普通的自定义类数组对象（如上例）不能直接用这种方式。\r
\r
\`\`\`JavaScript\r
const arr = [...arguments];\r
\`\`\``;export{r as default};
