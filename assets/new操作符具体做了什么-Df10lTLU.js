const n=`# new操作符具体做了什么
1. 创建了一个空对象
2. 将空对象的原型，指向于构造函数的原型
3. 将空对象作为构造函数的上下文(改变this指向)
4. 对构造函数有返回值的处理判断


## gemini回答
1. 创建一个新对象：在内存中开辟一块空间，创建一个空的对象。

2. 建立原型连接：将这个新对象的 __proto__ 指向构造函数的 prototype。这一步是为了让新对象能继承构造函数原型上的方法。

3. 绑定 this 并执行：将构造函数的 this 绑定到这个新对象上，并传入参数执行构造函数（给新对象添加属性）。

4. 返回结果：

如果构造函数返回的是一个对象，则返回这个对象；

如果构造函数返回的不是对象（比如返回基本类型或没写 return），则默认返回第一步创建的新对象。

## 掘金

1. 创建一个空对象

2. 设置原型，将构造函数的原型指向空对象的 prototype 属性。

3. 将 this 指向这个对象，通过apply执行构造函数。

4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象


## 手写实现



##

### 挂载到 this 上
\`\`\`js
function Student(name, age) {
    this.name = name;
    this.age = age;

    // 必须挂载到 this 上，s1 才能拿到
    this.sayHi = function() {
        console.log("你好，我是" + this.name);
    };
}

let s1 = new Student('小米', 12);
s1.sayHi(); // 成功运行！
\`\`\`

缺点： 这种写法每 new 一个学生，内存里就会多出一个一模一样的 sayHi 函数，浪费空间。
### 挂载到原型上

\`\`\`js
function Student(name, age) {
    this.name = name;
    this.age = age;
}

// 放在原型上，s1、s2、s3 都能用，且只占用一份内存
Student.prototype.sayHi = function() {
    console.log("你好，我是" + this.name);
};

let s1 = new Student('小米', 12);
s1.sayHi(); // 成功运行！
\`\`\`
用原型（Prototype）确实更好，这正是 JavaScript 设计原型的核心初衷：实现方法的共享，节省内存空间。
\`\`\`js
function Student(name,age){
this.name=name
this.age=age
}   
function myNew(Constructor,...args){
const obj=Object.create(Constructor.prototype)

const result=Constructor.apply(obj,args)

return (typeof result==='object'&&result!=null)?result:obj
}

Student.prototype.eat=function(){
console.log('吃饭');
}

const s1=new Student('小米')
const s2=myNew(Student,'小红',13)

console.log(s2.name);
s2.eat()

s1.eat()
\`\`\``;export{n as default};
