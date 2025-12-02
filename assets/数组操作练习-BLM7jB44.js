const n=`# 数组操作练习

## 初级题目 (夯实基础)

### 🟡1. 求数组最大值和最小值
\`\`\`javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
// 编写函数找出最大值和最小值
\`\`\`
#### 解析

1. 使用 Math.max 和 Math.min
\`\`\`javascript
const getMaxMin=()=>{
return {
    min:Math.min(...arr),
    max:Math.max(...arr)
}
}

console.log(getMaxMin());//{min: 1, max: 9}
\`\`\`
2. 
\`\`\`javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const getSort=()=>{
const stroed=[...arr].sort((a,b)=>a-b)
    return {
        min:stroed[0],
        max:stroed[stroed.length-1]
    }
}
console.log(getSort());//{min: 1, max: 9}
\`\`\`
3. 使用 reduce
\`\`\`javascript
const getMaxMinByReduce=()=>{
    return arr.reduce((acc,current)=>{
        return {
            min:Math.min(acc.min,current),
            max:Math.max(acc.max,current)
        }
    },{min:arr[0],max:arr[0]})
}
console.log(getMaxMinByReduce());//{min: 1, max: 9}
\`\`\`

### 🟡2. 数组求和与平均值
1. 
\`\`\`javascript
const scores = [85, 92, 78, 95, 88];
// 计算总分和平均分
\`\`\`
\`\`\`js
const scores = [85, 92, 78, 95, 88];
const caculate=()=>{
let total=scores.reduce((a,b)=>a+b,0)
let average=total/scores.length
return {
    total:total,
    average:average
}
}
console.log(caculate());
\`\`\`
2. 
\`\`\`js
const studentScores = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 92 },
    { name: 'Charlie', score: 78 },
    { name: 'David', score: 95 },
    { name: 'Eve', score: 88 }
];
// 计算所有学生的总分和平均分
\`\`\`
\`\`\`js
const studentScores = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 92 },
    { name: 'Charlie', score: 78 },
    { name: 'David', score: 95 },
    { name: 'Eve', score: 88 }
];

const calculate=()=>{
    let total=studentScores.reduce((a,{score})=>a+score,0)
    return{
        total,
        average:total/studentScores.length
    }
}
console.log(calculate());
\`\`\`
3. 
\`\`\`js
const classScores = [
    { name: 'Alice', math: 85, english: 90 },
    { name: 'Bob', math: 92, english: 88 },
    { name: 'Charlie', math: 78, english: 85 }
];

// 计算：
// 1. 数学平均分
// 2. 英语平均分  
// 3. 每个人的总分和平均分
// 4. 全班的各科平均分
\`\`\`

\`\`\`js
const classScores = [
        { name: 'Alice', math: 85, english: 90 },
        { name: 'Bob', math: 92, english: 88 },
        { name: 'Charlie', math: 78, english: 85 }
    ];
    const calculate=()=>{
        const mathAvg=classScores.reduce((sum,{math})=>sum+math,0)/classScores.length
        const englishAvg=classScores.reduce((sum,{english})=>sum+english,0)/classScores.length
        const everyone=classScores.map(stu=>({
                name:stu.name,
               total:stu.math+stu.english,
               avg:(stu.math+stu.english)/2
        }))
        return{
            mathAvg:Number(mathAvg.toFixed(2)),
            englishAvg: Number(englishAvg.toFixed(2)),
            everyone
        }
    }
\`\`\`
进阶优化
\`\`\`js
const classScores = [
    { name: 'Alice', math: 85, english: 90 },
    { name: 'Bob', math: 92, english: 88 },
    { name: 'Charlie', math: 78, english: 85 }
];
const calculate=()=>{
    const {mathTotal,englishTotal}=classScores.reduce((ass,{math,english})=>{
    ass.mathTotal+=math
    ass.englishTotal+=english
    return ass
    },{mathTotal:0,englishTotal:0})
    const mathAvg=mathTotal/classScores.length
    const englishAvg=englishTotal/classScores.length
    const everyone=classScores.map(stu=>({
        name:stu.name,
        total: stu.math + stu.english,
        avg: (stu.math + stu.english) / 2
    }))
    return{
        mathAvg:Number(mathAvg.toFixed(2)),
        englishAvg: Number(englishAvg.toFixed(2)),
        everyone
    }
}
\`\`\`
4. 
\`\`\`js
const classes = [
    {
        className: "Class A",
        students: [
            { name: 'Alice', score: 85 },
            { name: 'Bob', score: 92 }
        ]
    },
    {
        className: "Class B", 
        students: [
            { name: 'Charlie', score: 78 },
            { name: 'David', score: 95 },
            { name: 'Eve', score: 88 }
        ]
    }
];
// 计算每个班级的平均分和全校平均分
\`\`\`
### 🟡3. 检查数组是否包含特定元素
\`\`\`javascript
const fruits = ['apple', 'banana', 'orange'];
// 编写函数检查是否存在 'banana'，不能用 includes 方法
\`\`\`
1. 方法一
\`\`\`js
const calculate=()=>{
    if(fruits.indexOf('banana')==-1){
        return false
    }else{
        return true
    }
}
\`\`\`
优化
\`\`\`js
const hasBanana=()=>fruits.indexOf('banana')!==-1
\`\`\`
2. 方法二
\`\`\`js
const hasBanana=(arr)=>{
for(let i=0;i<arr.length;i++){
    if(arr[i]==='banana'){
        return true
    }
}
return false
}
\`\`\`
3. 方法三
find
\`\`\`js
const hasBanana=(arr)=>arr.find(item=>item==='banana')!==undefined
\`\`\`
4. 方法四
some
\`\`\`js
const hasBanana=(arr)=>arr.some(item=>item==='banana')
\`\`\`
5. 方法五
\`\`\`js
const hasBanana=(arr)=>arr.findIndex(item=>item==='banana')!==-1
\`\`\`
练习1. 不区分大小写检查
\`\`\`javascript
const mixedFruits = ['Apple', 'BANANA', 'orange'];
// 编写函数检查是否存在 'banana'（不区分大小写）
\`\`\`
### 🟡4. 数组合并与去重
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
// 合并两个数组并去重，得到 [1, 2, 3, 4]
\`\`\`

## 🚀 中级题目 (熟练应用)

### 🟠5. 二维数组扁平化
\`\`\`javascript
const nestedArr = [1, [2, 3], [4, [5, 6]]];
// 编写 flatten 函数，将数组展平为一维数组
\`\`\`

### 🟠6. 数组元素统计
\`\`\`javascript
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'];
// 统计每种水果出现的次数：{apple: 2, banana: 3, orange: 1}
\`\`\`

### 🟠7. 按条件分组
\`\`\`javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 }
];
// 按年龄分组：{25: ['Alice', 'Charlie'], 30: ['Bob', 'David']}
\`\`\`

### 🟠8. 寻找数组交集、并集、差集
\`\`\`javascript
const arrA = [1, 2, 3, 4];
const arrB = [3, 4, 5, 6];
// 求交集：[3, 4]
// 求并集：[1, 2, 3, 4, 5, 6]  
// 求差集(A有B没有)：[1, 2]
\`\`\`

## 💪 高级题目 (挑战思维)

### 🔴9. 数组乱序 (Fisher-Yates洗牌算法)
\`\`\`javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 实现真正的随机打乱，每个排列出现的概率相等
\`\`\`

### 🔴10. 数组分块
\`\`\`javascript
const arr = [1, 2, 3, 4, 5, 6, 7];
// 按指定大小分块，chunk(arr, 3) => [[1,2,3], [4,5,6], [7]]
\`\`\`

### 🔴11. 异步数组处理
\`\`\`javascript
const urls = ['url1', 'url2', 'url3'];
// 模拟异步请求，按顺序处理数组，但限制并发数为2
\`\`\`

### 🔴12. 实现类似 Lodash 的数组方法
\`\`\`javascript
// 实现自己的 take, drop, compact 等方法
// take([1,2,3,4], 2) => [1,2]
// drop([1,2,3,4], 2) => [3,4]  
// compact([0, 1, false, 2, '', 3]) => [1,2,3]
\`\`\`

## 🏆 实战综合题目

### 🟣13. 数据处理管道
\`\`\`javascript
const data = [
  { id: 1, name: 'Alice', age: 25, department: 'Tech', salary: 5000 },
  { id: 2, name: 'Bob', age: 30, department: 'Tech', salary: 6000 },
  { id: 3, name: 'Charlie', age: 35, department: 'HR', salary: 4500 },
  { id: 4, name: 'David', age: 28, department: 'Tech', salary: 5500 }
];

// 要求：
// 1. 只保留 Tech 部门的员工
// 2. 计算平均薪资
// 3. 按薪资降序排序
// 4. 只返回姓名和薪资字段
\`\`\`

### 🟣14. 数组差异比较
\`\`\`javascript
const oldArr = [{id: 1}, {id: 2}, {id: 3}];
const newArr = [{id: 2}, {id: 3}, {id: 4}];

// 找出需要新增、删除、保留的元素
\`\`\``;export{n as default};
