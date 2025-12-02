const n=`# 箭头函数和普通函数的区别

## this指向
\`\`\`ts
let obj={
    a:function(){
        console.log(this);
    },

    b:()=>{
        console.log(this);
    }
}
obj.a();//this代表obj
obj.b();//this代表window
\`\`\`

## 普通函数中的 \`this\`（会变心的家伙）

普通函数里的 \`this\` 是**动态**的，它指向**调用这个函数的“那个人”**。谁最后调用了这个函数，\`this\` 就指向谁。

\`\`\`javascript
class Classroom {
  constructor(teacher) {
    this.teacher = teacher; // 这个this指向当前创建的classroom实例
  }

  // normalFunction 是一个普通函数
  normalFunction() {
    console.log(\`普通函数：我们的老师是 \${this.teacher}\`);
  }
}

// 创建两个班级
const classA = new Classroom('张老师');
const classB = new Classroom('李老师');

// 情况1：通过对象直接调用 - 符合直觉
classA.normalFunction(); // 输出：“普通函数：我们的老师是 张老师”
// 此时 \`this\` 指向 \`classA\`

classB.normalFunction(); // 输出：“普通函数：我们的老师是 李老师”
// 此时 \`this\` 指向 \`classB\`
\`\`\`

**问题来了：如果把方法“借”给别人用呢？**

\`\`\`javascript
// 情况2：方法被“借走”了
const standaloneFunc = classA.normalFunction; // 只是把函数赋值给一个变量，没有调用

// 现在直接调用这个独立的函数
standaloneFunc(); // 输出：“普通函数：我们的老师是 undefined”
\`\`\`

**为什么会是 \`undefined\`？**
因为现在调用 \`standaloneFunc()\` 的，是全局对象（在浏览器中是 \`window\`）。\`window\` 对象上没有 \`teacher\` 属性，所以是 \`undefined\`。**\`this\` 指向了调用它的那个对象（全局对象）**，而不是你最初定义的 \`classA\`。

---

## 箭头函数中的 \`this\`（专一的家伙）

箭头函数里的 \`this\` 是**词法**的，它指向**定义这个箭头函数时，所在作用域的 \`this\`**。一旦定义，终身不变。

我们把上面的例子改成箭头函数。

\`\`\`javascript
class Classroom {
  constructor(teacher) {
    this.teacher = teacher;
  }

  // arrowFunction 是一个箭头函数
  arrowFunction = () => {
    console.log(\`箭头函数：我们的老师是 \${this.teacher}\`);
  }
}

const classA = new Classroom('王老师');
const classB = new Classroom('赵老师');

// 情况1：通过对象调用 - 依然符合直觉
classA.arrowFunction(); // 输出：“箭头函数：我们的老师是 王老师”

// 情况2：方法被“借走”了
const standaloneArrow = classA.arrowFunction;

// 现在调用这个独立的函数
standaloneArrow(); // 输出：“箭头函数：我们的老师是 王老师”
\`\`\`

**看！结果不一样了！**

为什么 \`standaloneArrow()\` 还能正确打印出“王老师”？
因为箭头函数 \`arrowFunction\` 在定义时，它所在的**作用域是 \`Classroom\` 的构造函数**。构造函数里的 \`this\` 指向正在被创建的新实例（也就是 \`classA\`）。所以，\`arrowFunction\` 内部的 \`this\` 就**永久地绑定**为了 \`classA\`，无论谁以后来调用它。

---

## \`call\` 和 \`apply\` 是做什么的？

它们的作用是**主动指定一个函数执行时的 \`this\` 指向**。你可以强迫一个函数在某个对象的上下文中执行。

**语法：**
- \`func.call(thisArg, arg1, arg2, ...)\` - 参数一个一个传
- \`func.apply(thisArg, [arg1, arg2, ...])\` - 参数放在数组里传

### 对普通函数使用（有效）

\`\`\`javascript
function introduce(subject) {
  console.log(\`\${this.name} 教 \${subject}\`);
}

const teacher1 = { name: '陈老师' };
const teacher2 = { name: '刘老师' };

// 普通调用，this指向全局，name是undefined
// introduce('数学'); // 输出：“undefined 教 数学”

// 使用 call，强制让 introduce 的 this 指向 teacher1
introduce.call(teacher1, '数学'); // 输出：“陈老师 教 数学”

// 使用 apply，强制让 introduce 的 this 指向 teacher2
introduce.apply(teacher2, ['英语']); // 输出：“刘老师 教 英语”
\`\`\`

### 对箭头函数使用（无效！）

因为箭头函数的 \`this\` 在定义时就已经绑定了，\`call\` 和 \`apply\` 无法覆盖。

\`\`\`javascript
const introduceArrow = (subject) => {
  console.log(\`\${this.name} 教 \${subject}\`); // 这里的this是定义时的this，可能是window
};

introduceArrow.call(teacher1, '物理'); 
// 输出：“ 教 物理” (因为 this.name 是 undefined，箭头函数的this没变)
\`\`\`

---

## 总结表格与核心要点

| 特性 | 普通函数 | 箭头函数 |
| :--- | :--- | :--- |
| **\`this\` 指向** | **动态**，由**调用者**决定 | **静态**，由**定义时的作用域**决定 |
| **能否用 \`call/apply/bind\` 改变 \`this\`** | **可以** | **不可以** |
| **能否作为构造函数 (用 \`new\`)** | **可以** | **不可以** |
| ** arguments\` 对象** | 有自己的 \`arguments\` 对象 | 没有自己的 \`arguments\`，使用外层函数的 |

**简单记忆：**

1.  **需要动态 \`this\` 时用普通函数**：比如对象的方法、事件处理函数（可能需要 \`this\` 指向被点击的按钮）、构造函数。
2.  **需要固定 \`this\` 时用箭头函数**：比如在 \`setTimeout\`、\`Promise\` 等回调函数中，为了避免 \`this\` 指向出错，常用箭头函数来“锁定”外层的 \`this\`。

\`\`\`javascript
// 一个综合例子
class Timer {
  constructor() {
    this.counter = 0;
  }

  start() {
    // 普通函数，setTimeout回调中的this会指向window，而不是Timer实例
    setTimeout(function() {
      console.log(this.counter); // 输出：undefined (因为window.counter是undefined)
    }, 1000);

    // 箭头函数，this指向定义时（即start方法）的this，也就是Timer实例
    setTimeout(() => {
      this.counter++;
      console.log(this.counter); // 输出：1
    }, 1000);
  }
}

const myTimer = new Timer();
myTimer.start();
\`\`\``;export{n as default};
