const n=`## 理解 JavaScript 的异步编程
1. js呢是一个单线程语言,为什么呢,因为他是运行在浏览器的渲染主线程里的,然后这个渲染主线程呢只有一个,
   他负责很多的工作,比如说渲染页面,处理用户的交互事件,执行js代码等等
2. 如果使用同步的方式,是非常容易造成阻塞的,主线上的东西是非常多的,如果js使用什么计时器,请求,
   事件的监听等操作,这些都是需要等待的,如果使用同步的方式,就会阻塞主线程,导致页面卡死,用户体验非常差
3. 所以浏览器就用异步的方式避免,像计时器,请求,事件监听这些事件,主线程会将他们分配到其他线程去执行,
    自身就立即结束任务执行,去执行后续任务,然后其他线程完成任务之后,会将实现传递的回调函数包装成一个任务,
    又加入到消息队列的末尾,等到主线程调度
4. 这样就不会阻塞主线程,用户体验就会好很多

需要实现一个 LazyMan，支持以下链式调用：
\`\`\`js
LazyMan('Hank')
// 输出：Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')
// 输出：
// Hi! This is Hank!
// 等待10秒...
// Wake up after 10
// Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')
// 输出：
// Hi! This is Hank!
// Eat dinner~
// Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')
// 输出：
// 等待5秒...
// Wake up after 5
// Hi! This is Hank!
// Eat supper~
\`\`\`

## Class 实现
\`\`\`js
class LazyMan{
    constructor(name){
        this.tasks=[]
        this.tasks.push(()=>{
            console.log(\`Hi I am \${name}\`);
            this._next();
        })

        Promise.resolve().then(()=>{
            this._next();
        })
    }

    _next(){
        if(this.tasks.length==0)return;
        const task=this.tasks.shift()
        task();
    }

    eat(food){
        this.tasks.push(()=>{
            console.log(\`I am eating \${food}\`);
            this._next();
        })
        return this;
    }

    sleep(time){
        this.tasks.push(()=>{
            console.log(\`等待\${time}秒\`)
            setTimeout(()=>{
                console.log(\`wake up after \${time}\`)
                this._next()
            },1000*time)
        })
        return this
    }

    sleepFirst(time){
        this.tasks.unshift(()=>{
            console.log(\`等待\${time}秒\`)
            setTimeout(()=>{
                console.log(\`wake up after \${time}\`)
                this._next()
            },1000*time)
        })
        return this
    }
}

new LazyMan("Hank").sleep(2).eat("dinner").sleepFirst(6);
\`\`\`
## 复杂测试
\`\`\`js
// 综合测试
LazyMan('Hank')
  .sleepFirst(2)
  .eat('breakfast')
  .sleep(3)
  .eat('lunch')
  .sleep(1)
  .eat('dinner');

// 输出顺序：
// 等待2秒...
// Wake up after 2
// Hi! This is Hank!
// Eat breakfast~
// 等待3秒...
// Wake up after 3
// Eat lunch~
// 等待1秒...
// Wake up after 1
// Eat dinner~
\`\`\`
## 1. 异步基础概念

- **同步**：代码按顺序执行，前一个任务完成才能执行下一个
- **异步**：代码不按顺序执行，某些任务可以"稍后完成"

## 2. 常见的异步操作

- \`setTimeout\` / \`setInterval\`
- AJAX / Fetch 请求
- Promise / async-await
- 事件监听
- 文件读取等Web API

## 3. 执行机制：Event Loop

JS是单线程的，通过Event Loop处理异步：
1. 同步代码进入调用栈执行
2. 异步任务交给Web API处理
3. Web API完成后将回调放入任务队列
4. 调用栈为空时，Event Loop将队列中的任务推入调用栈执行

## 练习题1：基础异步

\`\`\`javascript
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

console.log('3');
\`\`\`

**答案：1 → 3 → 2**

## 练习题2：Promise基础

\`\`\`javascript
console.log('1');

new Promise((resolve) => {
    console.log('2');
    resolve();
}).then(() => {
    console.log('3');
});

console.log('4');
\`\`\`

**答案：1 → 2 → 4 → 3**

## 练习题3：混合题型

\`\`\`javascript
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
});

console.log('4');
\`\`\`

**答案：1 → 4 → 3 → 2**

## 练习题4：微任务 vs 宏任务

\`\`\`javascript
console.log('1');

setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => {
        console.log('3');
    });
}, 0);

Promise.resolve().then(() => {
    console.log('4');
    setTimeout(() => {
        console.log('5');
    }, 0);
});

console.log('6');
\`\`\`

**答案：1 → 6 → 4 → 2 → 3 → 5**

## 练习题5：async/await

\`\`\`javascript
async function test() {
    console.log('1');
    await Promise.resolve();
    console.log('2');
}

console.log('3');
test();
console.log('4');
\`\`\`

**答案：3 → 1 → 4 → 2**

## 练习题6：复杂async/await

\`\`\`javascript
async function async1() {
    console.log('1');
    await async2();
    console.log('2');
}

async function async2() {
    console.log('3');
}

console.log('4');

setTimeout(() => {
    console.log('5');
}, 0);

async1();

new Promise((resolve) => {
    console.log('6');
    resolve();
}).then(() => {
    console.log('7');
});

console.log('8');
\`\`\`

**答案：4 → 1 → 3 → 6 → 8 → 2 → 7 → 5**

## 关键知识点总结

1. **执行顺序**：同步代码 → 微任务 → 宏任务
2. **微任务**：Promise.then/catch/finally、queueMicrotask、MutationObserver
3. **宏任务**：setTimeout、setInterval、setImmediate、I/O、UI渲染
4. **async/await**：await之前的代码同步执行，await之后的代码相当于then回调
`;export{n as default};
