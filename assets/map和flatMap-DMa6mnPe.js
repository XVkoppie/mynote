const n=`# map和flatMap\r
\r
# map (映射):\r
\r
作用：一对一转换。你有多少个元素，转换后还是多少个，只是内容变了。\r
\r
场景：当你想“加工”数组里的每一个数据时。\r
\r
例子：把 [1, 2, 3] 变成 ["1号", "2号", "3号"]。\r
\r
# flatMap (映射并拍平):\r
\r
作用：先做 map，然后再把结果“拍扁”一层。\r
\r
场景：当你的映射逻辑会产生一个新的数组（嵌套），而你希望得到的是一个平铺的列表。\r
\r
例子：如果你有两个班级（数组），你想列出全校所有人的名字。如果用 map，你会得到 [[小明, 小红], [小刚, 小李]]；如果用 flatMap，你会直接得到 [小明, 小红, 小刚, 小李]。\r
\r
# 练习\r
## 第一题（map 基础）\r
给定一个商品数组，请使用 map 将所有商品的价格（price）统一调高 10%。\r
\r
\`\`\`JavaScript\r
const products = [{ name: '书', price: 10 }, { name: '笔', price: 2 }];\r
// 输出应该为: [{ name: '书', price: 11 }, { name: '笔', price: 2.2\r
\`\`\`\r
解答：\r
\r
\`\`\`js\r
 const fn=()=>products.map(c=>({\r
    name:c.name,\r
    price:c.price*1.1\r
}))\r
\`\`\`\r
## 第二题（flatMap 进阶）\r
给定一个部门数组，每个部门都有一个 employees 数组。请用 flatMap 提取出全公司所有员工的姓名列表。\r
\r
\`\`\`JavaScript\r
const company = [\r
    { dept: '研发', employees: ['Alice', 'Bob'] },\r
    { dept: '设计', employees: ['Charlie'] }\r
];\r
// 目标输出: ['Alice', 'Bob', 'Charlie']\r
\`\`\`\r
解答：\r
\r
\`\`\`js\r
// 笨办法\r
const names = company.map(c => c.employees).flat();\r
\`\`\`\r
### flat()的作用\r
\`\`\`js\r
const deepArray = [1, [2, [3, 4]]];\r
\r
console.log(deepArray.flat(1)); \r
// 输出: [1, 2, [3, 4]] （只拉平了一层）\r
\r
console.log(deepArray.flat(2)); \r
// 输出: [1, 2, 3, 4] （拉平了两层）\r
\`\`\`\r
\`\`\`js\r
const fn=()=>{\r
    return company.flatMap(c=>c.employees)\r
}\r
\`\`\`\r
\r
## 第三题\r
偶数平方，奇数丢弃。\r
\r
\`\`\`JavaScript\r
const nums = [1, 2, 3, 4, 5];\r
// 期望结果: [4, 16]\r
\`\`\`\r
\r
解答：\r
\`\`\`js\r
const fn=()=>arr.filter(x=>x%2===0).map(x=>x*x)\r
\`\`\``;export{n as default};
