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
递归
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
\`\`\``;export{n as default};
