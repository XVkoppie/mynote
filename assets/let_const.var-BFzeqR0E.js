const n=`# let,const,var

## var

### var声明的变量，其作用域是全局作用域或者函数作用域
\`\`\`js
function test() {
  var x = 10;
  if (true) {
    var y = 20; // 同样属于函数作用域
  }
  console.log(x); // 10
  console.log(y); // 20 (可以访问)
}
\`\`\`

### var声明的变量可以在声明之前使用，值为undefined
\`\`\`js
console.log(a); // undefined (不会报错)
var a = 10;
\`\`\`
### var变量可以可以更新和重复声明
\`\`\`js
var x = 10;
var x = 20; // 不会报错
\`\`\`

## let,const

### let,const声明的变量，其作用域是块级作用域
\`\`\`js
function test() {
  let x = 10;
  if (true) {
    let y = 20; // 块级作用域
    const z = 30;
  }
  console.log(x); // 10
  console.log(y); // ReferenceError: y is not defined
}
\`\`\`

### let变量可以更新但不能重新声明
\`\`\`js
let y = 10;
let y = 20; // SyntaxError: Identifier 'y' has already been declared
\`\`\`
### const变量既不能更新也不能重新声明
 const 的特殊性
必须初始化

不能重新赋值

但对象/数组的内容可以修改

\`\`\`javascript
const PI = 3.14;
PI = 3.14159; // TypeError: Assignment to constant variable

const obj = { name: 'John' };
obj.name = 'Jane'; // 允许修改属性
obj = {}; // TypeError: Assignment to constant variable

const arr = [1, 2, 3];
arr.push(4); // 允许修改数组
arr = []; // TypeError: Assignment to constant variable
\`\`\``;export{n as default};
