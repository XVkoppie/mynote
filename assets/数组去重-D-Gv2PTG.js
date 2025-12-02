const n=`# 数组去重

假设我们有如下测试数组：

\`\`\`javascript
const arr = [1, 1, 'a', 'a', true, true, false, false, undefined, undefined, null, null, NaN, NaN, {}, {}];
\`\`\`

## 使用 Set 进行去重

Set 是 ES6 引入的一种新的数据结构，它类似于数组，但成员的值都是唯一的，没有重复的值。我们可以利用 Set 来实现数组去重。

\`\`\`javascript
const unique(arr){
    return [...new Set(arr)]
    // 或者： return Array.from(new Set(arr))
}
console.log(unique(arr));
// 输出: [1, 'a', true, false, undefined, null, NaN, {} , {}]
\`\`\`
优点：

代码极其简洁，一目了然。

性能优秀，对于大数据量也很高效。

缺点：

无法对“引用数据类型”（如对象、数组）进行去重。因为两个空对象 {} 的地址不同，Set 会认为它们是不同的元素。

## 使用 filter 和 indexOf 进行去重

原理：利用 indexOf 方法返回元素在数组中第一次出现的位置索引。如果当前元素的索引不等于 indexOf 返回的索引，说明它是重复的。

\`\`\`javascript
function unique(arr){
    return arr.filter((item,index)=>{
        return arr.indexOf(item)===index
    })
}

console.log(unique(arr));
// 输出: [1, "a", true, false, undefined, null, {}, {}]
\`\`\`
缺点：

无法正确处理 NaN。因为 arr.indexOf(NaN) 永远返回 -1。

时间复杂度是 O(n²)，对于大型数组性能较差。

同样无法去重引用类型。

## 使用 reduce 和 includes 进行去重

原理：使用 reduce 遍历数组，将元素逐个累加到一个新数组中，在累加前用 includes 判断新数组中是否已存在该元素。
\`\`\`javascript
function unique(arr){
    return arr.reduce((prev,current)=>{
        return prev.includes(current)?prev:[...prev,current]
    },[])
    })
}
console.log(unique(arr));
// 输出: [1, "a", true, false, undefined, null, {}, {}]
\`\`\``;export{n as default};
