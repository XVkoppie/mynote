const n=`# TS

1. TypeScript由微软开发,基于js
2. TypeScript是JavaScript的超集,添加了静态类型和基于类的面向对象编程
3. TypeScript代码需要编译成JavaScript代码才能在浏览器或Node.js环境中运行
4. TypeScript增添了静态类型检测、接口、泛型等现代开发特性,适合大型项目

## JavaScrpt中的困扰
1. 数据类型不明确,容易出错
2. 有漏洞的逻辑
3. 拼写错误
4. 访问不存在的属性

## 编译TS

下载TS (我的电脑已经下载了)
\`\`\`
npm install typescript -g
\`\`\`
### 手动编译成js代码
\`\`\`
tsc 文件名.ts
\`\`\`
ts
\`\`\`ts
const person ={
    name:'张三',
    age:20
}
console.log("🚀 ~ person:", \`\${person.name}今年\${person.age}岁\`);
\`\`\`
js
\`\`\`js
var person = {
    name: '张三',
    age: 20
};
console.log("🚀 ~ person:", "".concat(person.name, "\\u4ECA\\u5E74").concat(person.age, "\\u5C81"));
\`\`\`
### 自动编译成js代码

生成ts配置文件tsconfig.json
\`\`\`
tsc --init
\`\`\`
自动编译
\`\`\`
tsc --watch
\`\`\`
在tsconfig.json中配置编译选项
\`\`\`json
{
  "compilerOptions": {
    "target": "es6",
    /* 指定ECMAScript目标版本: */                          
    "module": "commonjs",                     
    /* 指定模块代码生成: 'none', 'commonjs', 'amd', '
    system', 'umd', 'es6'/'es2015', or 'esnext'. */
    "strict": true,                           
    /* 启用所有严格类型检查选项。 */
    "esModuleInterop": true,                  
    /* 允许默认导入非esModule模块。 */
    "skipLibCheck": true,                     
    /* 跳过库文件的类型检查。 */
    "forceConsistentCasingInFileNames": true , 
    /* 禁止对同一文件的不一致引用。 */
    "noEmitOnError": true                  
    /* 在有错误时,禁止输出文件。 */
  }
}
\`\`\`
### 脚手架开箱即用,不需要编译了

## 类型声明

- 格式要这样写
- 类型要是小写
- 变量声明后,类型不可更改,赋值要对应

\`\`\`ts
let a: string
let b: number
let c: boolean

a = 'hello'
b = 42
c = true
\`\`\`

- 返回类型也可以声明类型
- 形参也可以声明类型
- 使用的时候参数多了或少了都会报错
\`\`\`ts
function count1(x:number,y:number){
    return x + y+ 'hello'
}

function count2(x:number,y:number):number{
    return x + y
}

let result1 = count1(1,2)
let result2 = count2(1,2)
console.log("🚀 ~ result1:", result1)
console.log("🚀 ~ result2:", result2)
\`\`\`

- 字面量类型
\`\`\`ts
let a: string
let b:'hello'

a='hello'
a='world'
b="hhhh" // 报错
\`\`\`

## 类型总览

1. js数据类型
   - \`string\`
   - \`number\`
   - \`boolean\`
   - \`null\`
   - \`undefined\`
   - \`bigint\`
   - \`symbol\`
   - \`object\`
   - \`object\`包括\`function\`、\`array\`、\`date\`、\`error\`等
   
  
2. ts据类型
  - 上述js类型
  - 六个新类型
    + \`any\` (任意类型)
    + \`unknown\` (未知类型,安全的any)
    + \`never\` (永不存在的类型)
    + \`void\` (无返回值类型)
    + \`tuple\` (元组,固定长度的数组)
    + \`enum\` (枚举)
  - 两个用于自定义类型的方式
    + \`interface\` (接口)
    + \`type\` (类型别名)
  ### 🟣\`any\` (任意类型)
  #### 可以随便赋值
  \`\`\`ts
  let b //隐式any
  let a: any //显示any

  a=99
  a='hello'
  a=false

  b=99
  b=false
  \`\`\`
  #### 还会传染其他数据
  \`\`\`ts
  let a: any
  a=99
  a='hello'
  a=false

  let x: string
  x=a
  console.log("🚀 ~ x:", x)//false
  \`\`\`
  ### 🟣\`unknown\` (未知类型,安全的any)
  #### 不会感染其他数据

  \`\`\`js
  let a: unknown
  a=99
  a='hello'
  a=false

  let x: string
  x=a//这行会报错的
  \`\`\`

  #### 让ts放心就不报错了

  \`\`\`ts
  let a: unknown
  a=99
  a=false
  a='hello'
  let x: string

  //第一种
  if( typeof a==='string'){
      x=a
  }

  //第二种（断言）
  x=a as string
  //这样也可以
  x= <string>a
  \`\`\`
  \`\`\`ts
  let str1: string
  str1='hello'
  str1.toUpperCase()

  let str2: any
  str2='hello'
  str2.toUpperCase()
  str2.qwe
  str2.ccdf

  let str3: unknown
  str3='hello'
  str3.toUpperCase()//会报错

  (str3 as string).str3.toUpperCase()//这样就不报错了

  \`\`\`
  

  ### 🟣\`never\` (永不存在的类型)
  >never 的含义是任何值都不是,
  >不能有值,undefined,null,'',0都不行
  #### 几乎不用naver去直接限制变量
  \`\`\`ts
  let a: never

  //全部爆红
  a=null
  a=undefined
  a=0
  a=''
  \`\`\`
  #### never一般是ts主动推断出来的
  \`\`\`ts
  let a: string

  a='hello'

  if(typeof a==='string'){
      console.log(a.toUpperCase);
  }else{
      console.log(a);
      //永远不会执行到这步，光标放上去会显示let a: never
  }
  \`\`\`
  #### 也可以用于限制函数的返回值
  \`\`\`js
  function throwError(str: string): never{
  throw new Error('程序异常'+str)
  }
  \`\`\`

  ### 🟣\`void\` (无返回值类型)
  #### 通常用于函数返回值声明，
  >含义：返回值为空，调用者也不因该依赖其返回值进行任何操作
  \`\`\`ts
  function logMessage(msg: string):void{
  console.log(msg);
  }
  logMessage('hello')
  \`\`\`
  >注意：编码者没有编写 return 去指定函数的返回值，
  >所以 logMessage 函数是没有显式返回值的，
  >但会有一个隐式返回值，就是undefined；
  >即：虽然函数返回类型为 void，但也是可以
  >接受 undefin ed 的，
  >简单记： undefined 是 void 可以接受的一种“空”。
  #### 以下写法均合理
  \`\`\`js
  function logMessage(msg: string):void{
      console.log(msg);
  }

  function logMessage(msg: string):void{
      console.log(msg);
      return;
  }

  function logMessage(msg: string):void{
      console.log(msg);
      return undefined;
  }

  \`\`\`
  \`\`\`ts
  function demo1():void{
      console.log('@');
  }

  let res=demo1()
  if(res){//会飘红

  }

  function demo2():undefined{
      console.log('@');
  }

  let res1=demo2()
  if(res1){//不会飘红

  }
  \`\`\`
  >#### 理解 void 与 undefined
  >void是一个广泛的概念，用来表达空”，
  >而 undefined 则是这种“空”的具体实现之一。
  >因此可以说 undefined 是 void 
  >能接受的“空”状态的一种具体形式。
  >换句话说： void 包含 undefined，
  >但 void 表达的语义超越了单纯的 undefined，
  >它是一种意图上的约定，而不仅仅是特定值的限制。

  >#### 总结：若函数返回类型为 void，那么：
  >1.从语法上讲：函数是可以返回 undefined 的，至于显示返回，
  >还是隐式返回，这无所谓!
  >2.从语义上讲：函数调用者不应关心函数返回的值，
  >也不应依赖返回值进行任何操作!即使返回了 undefined 值。
  ### 🟣\`tuple\` (元组,固定长度的数组)
  #### 元组是一种特殊的数组，可以存储固定长度的元素
  \`\`\`ts
  let arr1: [string,number]
  let arr2: [string,boolean?]
  let arr3: [number,...string[],number]
  arr1=['hello',111]
  arr2=['hello']
  arr3=[11,'hell','h','j','o',99]
  \`\`\`
  ### 🟣\`enum\` (枚举)
  #### 枚举可以定义一组命名常量，能增强代码的可读性，让代码更好的维护
  #### 数字枚举
  \`\`\`ts
  //原来比较容易写错
  function walk(str:string){
      if(str==='up'){
          console.log("向上走");
      }else if(str==='down'){
          console.log("向下走");
      }else if(str==='left'){
          console.log("向左走");
      }else if(str==='right'){
          console.log("向右走");
      }else{
          console.log("输入错误");
      }
  }

  walk('up');
  walk('down');
  walk('left');
  walk('right');

  //使用枚举

  enum Direction{
      Up,
      Down,
      Left,
      Right
  }

  function walk(str:Direction){
      console.log(str);
      if(str===Direction.Up){
          console.log("向上走");
      }else if(str===Direction.Down){
          console.log("向下走");
      }else if(str===Direction.Left){
          console.log("向左走");
      }else if(str===Direction.Right){
          console.log("向右走");
      }else{
          console.log("输入错误");
      }
  }

  walk(Direction.Up)
  \`\`\`
  #### 字符串枚举
  \`\`\`ts
    enum Direction{
      Up="up",
      Down="down",
      Left="left",
      Right="right"
    }

    let dir:Direction = Direction.Up;
    console.log(dir);


  \`\`\`
  #### 内联枚举
  ts
  \`\`\`ts
    enum Direction{
        Up,
        Down,
        Left,
        Right
    }
    console.log(Direction.Up);
  
  \`\`\`
  js
  \`\`\`js
  "use strict";
  var Direction;
  (function (Direction) {
      Direction["Up"] = "up";
      Direction["Down"] = "down";
      Direction["Left"] = "left";
      Direction["Right"] = "right";
  })(Direction || (Direction = {}));
  let dir = Direction.Up;
  console.log(dir);
  //# sourceMappingURL=index.js.map
  \`\`\`
  代码非常的多
  \`\`\`ts
  const enum Direction{
      Up,
      Down,
      Left,
      Right
  }
  console.log(Direction.Up);
  \`\`\`
  js
  \`\`\`js
  "use strict";
  console.log(dir);
  \`\`\`
  代码就比较少了

  ### 🟣\`type\` (类型别名)
  \`\`\`ts
  type shuzi=number

  let a:shuzi

  a=1
  a=2
  \`\`\`
  #### 联合类型 (|)
  \`\`\`ts
  type Status=number | string

  function printStatus(status:Status){
      console.log(status)
  }

  printStatus(200)
  printStatus('200')
  \`\`\`
  \`\`\`ts
  type Gender='男'|'女'

  function printStatus(gender:Gender){
      console.log(gender)
  }

  printStatus('男')
  \`\`\`

  #### 交叉类型(&)
  \`\`\`ts
    //面积
    type Area={
        height:number
        width:number
    }
    //地址
    type Address={
        num:number//楼号
        cell:number//单元号
        room:string//房间号 
    }

    type House=Area & Address

    const house:House={
        height:100,
        width:200,
        num:5,
        cell:3,
        room:'A'
    }
  \`\`\`

  ### 🟣\`interface\` (接口)
  interface是一种定义结构的方式，主要作用是为：类，对象，函数等规定一种契约，这样可以确保代码一致性和类型安全
  但要注意interface只能定义格式，不能包含任何实例
  #### 定义类结构
  \`\`\`ts
    //接口
    interface IPerson {
        name:string
        age:number
        speak(n:number):void
    }

    class Person implements IPerson{
        constructor(public name:string,public age:number){}
        speak(n:number):void{
            for(let i=0;i<n;i++){
                console.log(\`你好，我叫\${this.name},今年\${this.age}岁\`);
            }
        }
    }

    const p1=new Person('张三',18)
    p1.speak(3)
  \`\`\`
  #### 定义对象结构
  \`\`\`ts
    //接口
    interface UserInterface {
        name:string
        readonly gender:string//只读属性
        age?:number//可选属性
        run:(n:number)=>void
    }

    const user:UserInterface={
        name:'张三',
        gender:'男',
        age:19,
        run(n){
            console.log(\`跑了\${n}米\`);
        }
    }

    console.log(user.name);
    user.gender='女'//报错，readonly只读属性不能修改
    user.run(100);
  \`\`\`

  #### 定义函数对象
  \`\`\`ts
    interface CountInterface{
        (a:number,b:number):number
    }
    const count:CountInterface=(x,y)=>{
        return x+y
    }
  \`\`\`  
  #### 接口之间的继承
  \`\`\`ts
    interface PersonInterface{
        name:string
        age:number
    }

    interface StudentInterface extends PersonInterface{
        grade:string
    }
    const student:StudentInterface={
        name:"Alice",
        age:20,
        grade:"A"
    }
  \`\`\`  
  #### 接口的自动合并
  \`\`\`ts
    interface PersonInterface{
        name:string
        age:number
    }
    interface PersonInterface{
        gender:string
    }

    const p:PersonInterface={
        name:"John",
        age:30,
        gender:'男'
    }
  \`\`\`
何时使用接口
>**定义对象格式**：描述数据模型，api相应格式，配置对象等，开发中使用较多
>**类的契约**：规定一个需要实现哪些属性和方法
>**自动合并**：一般用于扩展第三方库的类型，这种特性在大项目中会用到
 #### interface和type的区别
  - **相同点**:interface和type都可以用于定义\`对象结构\`，两者在许多场景中可以互换
  - **不同点**:
    + interface更专注定义\`对象\`和\`类\`的结构，支持\`继承\`，\`合并\`
    + type可以定义\`联合类型\`和\`交叉类型\`，而interface不行
    + interface支持声明合并，而type不支持
 #### interface与抽象类的区别
    - **相同点**:interface和抽象类都可以用于定义类的结构
    - **不同点**:
      + interface\`只能\`定义\`结构\`，\`不能\`包含任何\`实现代码\`，而\`抽象类\`可以\`包含实例属性和方法\`
      + 抽象类可以有构造函数，而interface没有
      + 一个类可以实现多个接口，但只能继承一个抽象类
  ## 类
  \`\`\`ts
    class Person{
        name:string
        age:number
        constructor(name:string, age:number){
            this.name=name;
            this.age=age;
        }
        speak(){
            console.log(\`我叫\${this.name},今年\${this.age}\`);
            
        }
    }

    const p1=new Person('张三',18);
    console.log(p1);
    p1.speak();
  \`\`\`

  \`\`\`ts
  
    //简写前
    class Person{
        name:string
        age:number
        constructor(name:string, age:number){
            this.name=name;
            this.age=age;
        }
    }

    //简写后
    class Person{
        constructor(public name:string,public age:number){}
        }
  \`\`\`
  ### 重写
  \`\`\`ts
  class Person{
        name:string
        age:number
        constructor(name:string, age:number){
            this.name=name;
            this.age=age;
        }
        speak(){
            console.log(\`我叫\${this.name},今年\${this.age}\`);
            
        }
    }

    class Student extends Person{
        grade:number
        constructor(name:string, age:number, grade:number){
            super(name,age)
            this.grade=grade
        }
        study(){
            console.log(\`\${this.name}在学习\`);
        }
        override speak(){
            console.log(\`我叫\${this.name},今年\${this.age},我在读\${this.grade}年级\`);
        }
    }

    const s1=new Student('李四',20,3);
    s1.speak();
    s1.study();
  \`\`\`

  ## 抽象类
  \`\`\`ts
   abstract class Package{
        //构造方法
        constructor(public weight:number){}

        //抽象方法
        abstract calculate():number;

        //普通方法
        printPackage():void{
            console.log(\`包裹重量为:\${this.weight}kg,运费为:\${this.calculate()}元\`);
        }
    }

    class StandardPackage extends Package{
        constructor(
            weight:number,
            public unitPrice:number
        ){
            super(weight);
        }

        calculate(): number {
            return this.weight * this.unitPrice;
        }

    }

    class ExpressPackage extends Package{
        constructor(
            weight:number,
            public unitPrice:number,
            public additional: number
        ){
            super(weight);
        }

        calculate(): number {
            if(this.weight>10){
                return 10*this.unitPrice+(this.weight-10)*(this.additional+this.unitPrice)
            }else{
                return this.weight*this.unitPrice
            }
        }
    }
    const e1=new ExpressPackage(15,8,2);
    e1.printPackage();
  \`\`\`

  ## 类型区别

  ### String和string
  - \`string\`赋值只能赋值基类,不能是包装类
  - \`String\`都可以赋值
  - 常常使用的是\`string\`
  
  \`\`\`ts
    let str1: string
    str1 = 'hello'
    str1=new String('hello')//报错

    let str2: String
    str2 = 'hello'
    str2 = new String('hello')

    console.log("🚀 ~ str2:", typeof str2);//str2：object
    console.log("🚀 ~ str1:", typeof str1);//str1: string

    \`\`\`

  ### Object和object
  >在实际开发中用的比较少，因为范围太大了
  #### object只能赋值非原始对象,将原始代码赋值给a会报错
  \`\`\`js
  let a: object

  // object只能赋值非原始对象
  a={}
  a={name:'hhh'}
  a=[1,2,3,4,5]
  a=function(){}
  a= new String('123')
  class Persson{}
  a=new Persson()

  //以下代码会报错，将原始代码赋值给a会报错
  a=1
  a='string'
  a=true
  a=null
  a=undefined
  \`\`\`
  #### Object能存储的类型是可以调用到Object方法的类型
  \`\`\`js
  let b: Object

  class Persson{}

  b={}
  b={name:'hhh'}
  b=[1,2,3,4,5]
  b=function(){}
  b= new String('123')
  b=new Persson()

  b=1
  b='string'
  b=true
  \`\`\`
  #### Object不能存null和undefined
  \`\`\`js
  //均会飘红
  b=null
  b=undefined
  \`\`\`
  ### 声明对象类型
  \`\`\`js
let person1:{name:string,age?:number}

let person2:{
    name:string
    age?:number
}

let person3:{name:string;age?:number}

person1={name:'uu',age:6}
person2={name:'uuu'}
person3={age:6}//这个会飘红
  \`\`\`
  #### 索引签名
  \`\`\`ts
  let person:{
      name:string
      age?:number
      [key:string]:any//
  }

  person={
      name:'tom',
      age:18,
      gender:'男',
      address:'地址',
      city:'北京'
  }
  \`\`\`
  #### 声明对象类型
  \`\`\`ts
  //形参随意 
  let count:(jkhhdh:number,hdsggs:number)=>number
  // let count:(a:number,b:number)=>number

  count=function(a:number,b:number):number{
      return a+b
  }

  count=function(a,b){
      return a+b
  }

  count=(x,y)=>{
      return x+y
  }
  \`\`\`
  #### 声明数组类型
  \`\`\`ts
  let arr: string[]
  let arr2: Array<number>
  arr=['1','b']
  arr2=[11,21,33,1,2]
  console.log("🚀 ~ arr:", arr)
  console.log("🚀 ~ arr2:", arr2)
  \`\`\`
## 泛型

### 泛型函数
\`\`\`ts
function logData<T>(data:T){
    console.log(data);
    
}

logData<string>("Hello, World!");
logData<number>(42);
logData<boolean>(true);
\`\`\`
### 泛型可以有多个
\`\`\`ts
function logData<T,U>(data1:T,data2:U):T|U {
    Date.now()%2?console.log(data1):console.log(data2);
    return Date.now()%2?data1:data2;
}

logData<string,number>("Hello, World!",42);
logData<number,boolean>(42,true);
\`\`\`
### 泛型接口
\`\`\`ts
interface PersonInterface<T>{
    name: string,
    age: number,
    extraInfo: T
}

let p:PersonInterface<string> = {
    name: "John",
    age: 30,
    extraInfo: "Some extra information"
}

let p1:PersonInterface<number> = {
    name: "John",
    age: 30,
    extraInfo: 123
}
\`\`\`
\`\`\`ts
interface PersonInterface<T>{
    name: string,
    age: number,
    extraInfo: T
}

type JobInfo={
    company: string,
    title: string
}

let p:PersonInterface<JobInfo> = {
    name: "John",
    age: 30,
    extraInfo: {
        company: "公司",
        title: "工程师"
    }
}

\`\`\`
### 泛型约束

### 泛型类
\`\`\`ts
class Person<T>{
    constructor(
        public name: string,
        public age: number,
        public extranInfo: T
    ){}

    speak(){
        console.log(\`我叫\${this.name}今年\${this.age}\`);
        console.log(this.extranInfo);
    }
}

const p1=new Person<number>('张三',18,100);
const p2=new Person<string>('李四',20,'额外信息');
\`\`\`

# 装饰器

## 类装饰器

\`\`\`ts
function CustomString(target:Function){
    target.prototype.toString=function(){
        return JSON.stringify(this);
    }
}

@CustomString
class Person{
    constructor(public name:string,public age:number){}
}

const p1=new Person("张三",18);

console.log(p1.toString());
console.log(JSON.stringify(p1));
\`\`\`
题外Object.seal
\`\`\`ts
function CustomString(target:Function){
    target.prototype.toString=function(){
        return JSON.stringify(this);
    }
    Object.seal(target.prototype)//封锁了
}
@CustomString
class Person{
    constructor(public name:string,public age:number){}
}

const p1=new Person("张三",18);

console.log(p1.toString());
console.log(JSON.stringify(p1));
interface Person{
    x:Number
}
Person.prototype.x=99//这里就不能使用
\`\`\`
### 关于返回值

注解的会替换原来的,没有返回值就不会被替换
\`\`\`ts
function Demo(target:Function){
    return class{
        test(){
            console.log(200);
            console.log(300);
            console.log(400);
        }
    }
}

@Demo
class Person{
    test(){
        console.log(100);
    }
}

console.log(Person);
//class {
//         test() {
//             console.log(200);
//             console.log(300);
//             console.log(400);
//         }
//     }

\`\`\`
### 构造类型
\`\`\`ts
type Constructor=new (...args:any[])=>{} 
\`\`\`
1. new     表示:该类型是可以用new操作符调用。
2. ...agrs 表示:构造器可以接受\`仍以数量\`的参数
3. any[]   表示:构造器可以接受\`任意类型\`的参数
4. {}      表示:返回类型是对象(非null,非undefined的对象)
\`\`\`ts
type Constructor=new (...args:any[])=>{} 

function test(fn:Constructor){

}

class Person{}

test(Person)
\`\`\`
### 替换被装饰的类
\`\`\`ts
type Constractor=new(...args:any[])=>{}//构造函数类型

function LogTime<T extends Constractor>(target:T){
    return class extends target{
        createdTine:Date
        constructor(...args:any[]){
            super(...args);
            this.createdTine=new Date()
        }
        getTime(){
            return \`Created time is: \${this.createdTine.toLocaleString()}\`;
        }
    }
}

@LogTime
class Person{
    constructor(public name:string,public age:number){}
    speak(){
        console.log('你好');   
    }
}

interface Person{
    getTime():string
}

const p1=new Person('张三',8)
console.log(p1.getTime());
\`\`\`

### 装饰器工厂
原代码
\`\`\`ts
function LogInfo(target:Function){
    target.prototype.introduce=function(){
        console.log(\`我的名字是\${this.name}，我今年\${this.age}岁。\`);
    }
}


@LogInfo
class Person{
    constructor(public name: string, public age: number) {}
}

interface Person{
    introduce(): void;
}

const p1=new Person("Alice", 30);
p1.introduce(); 
\`\`\`
装饰器工厂
\`\`\`ts
function LogInfo(n:number){
    return function(target:Function){
        target.prototype.introduce=function(){
            for(let i=0;i<n;i++){
                console.log(\`我的名字是\${this.name}，我今年\${this.age}岁。\`);
            }
        }
    }
}


@LogInfo(3)
class Person{
    constructor(public name: string, public age: number) {}
}

interface Person{
    introduce(): void;
}

const p1=new Person("Alice", 30);
p1.introduce(); // 输出: 我的名字是Alice，我今年30岁。输出了三次
\`\`\`
### 装饰器组合

#### 执行顺序
\`\`\`ts
//装饰器
function test1(target:Function){
    console.log('test1');
}
//装饰器工厂
function test2(){
    console.log('test2工厂');
    return function(target:Function){
        console.log('test2');
    }
}
//装饰器工厂
function test3(){
    console.log('test3工厂');
    return function(target:Function){
        console.log('test3');
    }
}
//装饰器
function test4(target:Function){
    console.log('test4');
}

@test1
@test2()
@test3()
@test4
class Person{}
\`\`\`
打印顺序:先\`从上到下\`打印工厂，在\`从里到外\`打印装饰器
\`\`\`
test2工厂
test3工厂
test4
test3
test2
test1
\`\`\`
#### 应用装饰器组合
\`\`\`ts

//装饰器
function CustomString(target:Function){
    target.prototype.toString=function(){
        return JSON.stringify(this);
    }
    Object.seal(target.prototype)
}
//装饰器工厂
function LogInfo(n:number){
    return function(target:Function){
        target.prototype.introduce=function(){
            for(let i=0;i<n;i++){
                console.log(\`我是\${this.name},今年\${this.age}岁\`);
            }
        }
    }
}
//装饰器
type Constructor=new (...args:any[])=>{}

function LogTime<T extends Constructor>(target:T){
    return class extends target{
        createTime:Date
        constructor(...args:any[]){
            super(...args);
            this.createTime=new Date();
        }
        getTime(){
            return \`该对象创建的时间为\${this.createTime}\`
        }
    }
}



@CustomString
@LogInfo(5)
@LogTime
class Person{
    constructor(public name:string, public age:number){ }
    speak(){
        console.log('你好');
    }
}
interface Person{
    introduce:()=>void
    getTime:()=>string
}
const p1=new Person('张三', 18);
p1.speak();
p1.toString();
p1.introduce();
console.log(p1.getTime());
\`\`\`

## 属性装饰器
### 基本语法
- target:对于静态属性来说值是类,对于实例属性来说值是类的原型对象
- propertyKey 属性名
\`\`\`ts
function Demo(target:object,propertykey:string){
    console.log(target,propertykey);
}

class Person{
    @Demo name: string
    @Demo age: number
    static school:string
    constructor(name:string,age:number){
        this.name=name
        this.age=age
    }
}
//打印{} 'name'  {}是person原型对象,'name'是属性装饰器装饰的名字
//打印{} 'age'
\`\`\`
### 应用举例
`;export{n as default};
