const n=`# 深拷贝和浅拷贝
共同点:
- 都是用于复制。
1. 浅拷贝：只复制引用，而未复制正真的值，一个改变互相影响
例如：
\`\`\`js
var arr1=['1','2','3','4']
var arr2=arr1

arr1[0]='你好'
arr2[1]='好的'
console.log(arr1,arr2);
\`\`\`
\`\`\`js
var obj1={a:1,b:2}
var obj2=Object.assign(obj1)
obj1.a='100'
obj2.b='400'
console.log(obj1,obj2);
\`\`\`
2. 深拷贝：复制值本身，互不影响,是一个新的对象
JSON.parse
\`\`\`js
var obj3={a:1,b:2}
var obj4=JSON.parse(JSON.stringify(obj3))
obj3.a='444'
obj4.b='000'
console.log(obj3,obj4);//{a: '444', b: 2} {a: 1, b: '000'}
\`\`\`
递归  (这个没办法解决循环引用)
\`\`\`js
 var obj1={
    a:1,
    b:2,
    arr:['a','b','c','d']
}

function copyObj(obj){
if(Array.isArray(obj)){
    var newObj=[]
}else{
    var newObj={}
}
for(var key in obj){
    if(typeof obj[key]=='object'){
        newObj[key]=copyObj(obj[key])
    }else{
        newObj[key]=obj[key]
    }
}
return newObj
}
\`\`\`

### 最终版本
\`\`\`js
function deepClone(target,map=new WeakMap()){
if(typeof target!="object"||target===null)return target//基本型直接克隆

if(target instanceof Date) return new Date(target)
if(target instanceof RegExp)return new RegExp(target)
if(map.has(target)){
    return map.get(target)//笔记本，记录是否已经克隆过，避免循环引用
}
const cloneTarget=Array.isArray(target)?[]:{}//判断是数组还是对象

map.set(target,cloneTarget)//克隆前先写到笔记本
for(const key in target){
    if(target.hasOwnProperty(key)){
    cloneTarget[key]=deepClone(target[key],map)
    }
}

return cloneTarget
}
\`\`\`

例子验证
\`\`\`js
 const obj = {
    name: "Gemini",
    age: 18,
    hobbies: ["coding", "swimming",[1,1,2,2]], // 数组
    info: {
    school: "University",
    location: { city: "Sichuan" } // 深层嵌套
    },
    date: new Date(), // 日期对象
    reg: /^\\d+$/g,    // 正则对象
    undefinedKey: undefined,
    nullKey: null
};

// 制造循环引用
obj.self = obj;
function deepClone(target,map=new WeakMap()){
    if(typeof target!="object"||target===null)return target//基本型直接克隆

    if(target instanceof Date) return new Date(target)
    if(target instanceof RegExp)return new RegExp(target)

    if(map.has(target)){
    return map.get(target) //笔记本，记录是否已经克隆过，避免循环引用
    }

    //判断是数组还是对象
    const cloneTarget=Array.isArray(target)?[]:{}

    map.set(target,cloneTarget)
    for(const key in target){
    if(target.hasOwnProperty(key)){
        cloneTarget[key]=deepClone(target[key],map)
    }
    }

    return cloneTarget
}

let obj2=deepClone(obj)
obj2.a=1
obj2.b=4
console.log(obj);
console.log(obj2);
\`\`\``;export{n as default};
