const n=`# ref全家桶

## isRef
判断一个值是否是ref创建的响应式数据
\`\`\`js
import { ref ,isRef} from "vue";

const a=ref({name:'小满'})
const b={name:'小满'}

const judge=(x)=>{
  console.log(isRef(x));
}

judge(a)//true
judge(b)//false
\`\`\`

## shallowRef
shallowRef 是 ref 的浅层包装，用于创建一个 ref 对象，但只对对象属性进行浅层响应式处理。
\`\`\`js
import {shallowRef,ref} from "vue";
const a=ref({name:'小满'})
const b=shallowRef({name:'小满2'})

const change=()=>{
  b.value.name='大满2'
  console.log(b);
}

\`\`\`
调用change，视图不会改变，但是数据是改变了的
\`\`\`js
import {shallowRef,ref} from "vue";
const a=ref({name:'小满'})
const b=shallowRef({name:'小满2'})

const change=()=>{
  b.value={name:'大满2'}
  console.log(b);
}
\`\`\`
还有ref和shallowRef不能混用,写在一个函数shallowRef会被ref影响,也会变成深层响应
\`\`\`js
import {shallowRef,ref} from "vue";
const a=ref({name:'小满'})
const b=shallowRef({name:'小满2'})

const change=()=>{
  a.value={name:'大满'}
  b.value={name:'大满2'}
  console.log(b);
  console.log(a);
}
\`\`\`
## triggerRef
triggerRef 会强制更新一个 ref 对象，使其重新触发依赖收集和视图更新，
通常用于 shallowRef，当你修改了 shallowRef 的属性但没有触发视图更新时，
可以使用 triggerRef 来手动触发更新。
\`\`\`js
import {shallowRef,ref, triggerRef} from "vue";
const a=ref({name:'小满'})
const b=shallowRef({name:'小满2'})

const change=()=>{
  b.value={name:'大满2'}
  triggerRef(b);
  console.log(b);
}
\`\`\`
## customRef
customRef 允许你创建一个自定义的 ref 对象，可以自定义其响应式行为。
\`\`\`html
<script setup lang="ts">
import {shallowRef,ref, triggerRef,customRef} from "vue";
function MyRef<T>(value:T){
  let timer:any
  return customRef((track,trigger)=>{
    return{
      get(){
        track()//告诉vue，这个值被追踪了
        return value
      },
      set(newValue){
        clearTimeout(timer)
        timer=setTimeout(()=>{
          console.log('修改了');
          value=newValue
          timer=null
          trigger()//告诉vue，这个值被修改了
        },500)
      }
    }
  })
}

const obj=MyRef<string>('小满')
<\/script>

<template>
  <div>{{ obj }}</div>
  <button @click="obj='大满'">修改</button>
</template>
\`\`\`
## ref 直接获取元素
\`\`\`html
<script setup lang="ts">
import { ref } from "vue";

const dom=ref<HTMLElement|null>(null)
const UU=ref<HTMLElement|null>(null)
const getRef=()=>{
  console.log(dom.value);//<div>我是dom</div>
  console.log(dom.value?.innerText);//我是dom
  console.log(UU.value);//<div>我是UU</div>
  console.log(UU.value?.innerText);//我是UU
}

<\/script>

<template>
  <div ref="dom">我是dom</div>
  <div ref="UU">我是UU</div>
  <button @click="getRef">获取</button>
</template>
\`\`\`
## toRef
toRef 只能修改响应式对象的值 非响应式视图毫无变化，总结一句话，toRef只适用于响应式对象，非响应式对象用了toRef毫无卵用
#### 这样视图会更新
\`\`\`js
import { reactive, toRef } from "vue";

const man=reactive({name:'小红',age:14})
const age=toRef(man,'age')
const change=()=>{
  age.value=20;
  console.log(man);
}
\`\`\`
#### 这样视图不会更新
\`\`\`js
import { toRef } from "vue";

const man={name:'小红',age:14}
const age=toRef(man,'age')
const change=()=>{
  age.value=20;
  console.log(man);
}
\`\`\`

## toRefs
手动实现
\`\`\`ts
import { reactive, toRef } from "vue";

const man=reactive({name:'小红',age:14,like:'打篮球'})
const toRefs=<T extends object>(object:T)=>{
  const map:any={}
  for(let key in object){
    map[key]=toRef(object,key)
  }
  return map
}

const {name,age,like}=toRefs(man)
const change=()=>{
  name.value='小明'
  age.value=18
  like.value='踢足球'
}
\`\`\`
解构操作
\`\`\`ts
import { reactive, toRefs } from "vue";

//总结一句话，非响应式对象用了toRef毫无卵用
const man=reactive({name:'小红',age:14,like:'打篮球'})
const {name,age,like}=toRefs(man)
const change=()=>{
  name.value='小明'
  age.value=18
  like.value='踢足球'
}
\`\`\`
## toRaw
\`\`\`ts
const man=reactive({name:'小红',age:14,like:'打篮球'})

const change=()=>{
  console.log(man,toRaw(man));
}
\`\`\`
toRaw之后对象脱离了proxy变成了原始对象

# reactive全家桶

## reactive Proxy不能直接赋值 否则会破坏响应式
\`\`\`js
import { reactive } from "vue";

let list =reactive([])
const add=()=>{
  let res=[1,2,3,4]
  list.push(...res)
}
\`\`\`
或者
\`\`\`js
import { reactive } from "vue";

let list =reactive<{
  arr: number[]
}>({
  arr:[]
})
const add=()=>{
  let res=[1,2,3,4]
  list.arr=res
}
\`\`\`
## readonly
readonly 可以将一个对象或数组转换为只读对象，使其不能被修改。
\`\`\`js
import { reactive ,readonly} from "vue";

let obj=reactive({name:'张三',age:18})
const read=readonly(obj)
const show=()=>{
  read.name='张三1'//会报红，并且不会改变
  obj.name='张三1'//obj和read都改变
  console.log(obj);
  console.log(read)
}
\`\`\`

## shallowReactive
shallowReactive 和 reactive 的区别和用法类似，
但 shallowReactive 只对对象属性进行浅层响应式处理，
而 reactive 则对对象属性进行深层响应式处理。
\`\`\`js
import {  shallowReactive, } from "vue";

let obj2=shallowReactive({
    foo:{
      bar:{
        num:1
      }
    }
  })

  const change=()=>{
    obj2.foo.bar.num++//数据改变但是视图不会更新
  }
\`\`\`
shallowReactive 第一层是响应式的
\`\`\`js
import {  shallowReactive } from "vue";

const obj2:any=shallowReactive({
    foo:{
      bar:{
        num:1
      }
    }
  })

  const change=()=>{
    obj2.foo={name:'张三'}//这样视图会更新
  }
\`\`\`
然后和\`ref\`和\`shallowRef\` 一样，\`shallowReactive\` 也不能与 \`ref\` 和 \`shallowRef\` 混用，否则会导致响应式失效。

# ref 和 reactive 的区别

在 Vue 3 的 Composition API 中，\`ref\` 和 \`reactive\` 都是用于创建响应式数据的函数，但它们在用法和适用场景上有一些重要区别。

## 核心区别

### 1. 数据类型处理
- **ref**：可以包装任何类型的值，包括基本类型（string、number、boolean等）和引用类型（object、array）
- **reactive**：只能处理对象类型（object、array、Map、Set等），不能处理基本类型

### 2. 访问和修改方式
- **ref**：需要通过 \`.value\` 属性来访问和修改值
\`\`\`javascript
const count = ref(0)
console.log(count.value) // 访问
count.value++ // 修改
\`\`\`

- **reactive**：直接访问和修改属性
\`\`\`javascript
const state = reactive({ count: 0 })
console.log(state.count) // 访问
state.count++ // 修改
\`\`\`

### 3. 模板中使用
- **ref**：在模板中会自动解包，不需要使用 \`.value\`
\`\`\`vue
<template>
  <div>{{ count }}</div> <!-- 不需要 .value -->
</template>
\`\`\`

- **reactive**：直接访问属性
\`\`\`vue
<template>
  <div>{{ state.count }}</div>
</template>
\`\`\`

### 4. 响应式原理
- **ref**：使用 \`Object.defineProperty()\` 的 \`getter/setter\` 来实现响应式
- **reactive**：使用 \`Proxy\` 代理整个对象，提供更深层次的响应式

### 5. 重新赋值
- **ref**：可以整个替换（重新赋值）
\`\`\`javascript
const obj = ref({ count: 0 })
obj.value = { count: 1 } // 有效，保持响应式
\`\`\`

- **reactive**：不能整个替换，会失去响应式
\`\`\`javascript
const state = reactive({ count: 0 })
state = { count: 1 } // 无效，失去响应式
\`\`\`

## 使用场景建议

### 使用 ref 的情况：
- 基本类型数据
- 当需要重新分配整个对象时
- 在组合式函数中返回响应式数据时

### 使用 reactive 的情况：
- 复杂的对象或数据结构
- 需要深度响应式的嵌套对象
- 状态分组，将相关数据组织在一起

## 实际示例

\`\`\`javascript
// 使用 ref
const count = ref(0)
const user = ref({ name: 'John', age: 25 })

// 使用 reactive
const state = reactive({
  user: {
    name: 'John',
    profile: {
      email: 'john@example.com'
    }
  },
  settings: {
    theme: 'dark'
  }
})
\`\`\`

## 总结回答

ref 和 reactive 都是 Vue 3 的响应式 API，主要区别在于：
1. ref 可以处理所有类型,而 reactive 只能处理应用类型，比如说 Array、Object、Map、Set
2. ref 需要通过 .value 访问，reactive 直接访问属性
3. ref 在模板中自动解包，reactive 保持原样
4. ref 可以重新赋值，reactive 不能整个替换

`;export{n as default};
