const n=`# 路由传参

## 动态路由传参

\`\`\`js
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router=useRouter();
const goDynamic=()=>{
  router.push('/dynamic');
}
const goDanamicWith=()=>{
  router.push('/dynamic/米')
  }
<\/script>

<template>
<div>index.vue</div>
<router-link :to="{path:'/dynamic'}">dynamic</router-link>
<button @click="goDynamic">跳转到dynamic</button>
<button @click="goDanamicWith">跳转到dynamic携带参数</button>

</template>
\`\`\`
router里要这样写
\`\`\`js
 {
   path:'/dynamic/:name',
   component:()=>import("../views/send/dynamic.vue")
 },
\`\`\`   
在dynamic.vue取到参数
\`\`\`js
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params);

<\/script>

<template>
<h1>{{ $route.params.name }}</h1>
</template>
\`\`\`

## query传参

\`\`\`html
<router-link :to="{path:'/query',query:{name:'米',age:12}}">query传参</router-link>
\`\`\`
\`\`\`js
import { useRouter } from 'vue-router';
const router=useRouter();
const goQuery=()=>{
  router.push({
    path:'/query',
    query:{
      name:'米',
      age:12
    }
  })
}
\`\`\`
跳转路由是这样的
\`http://localhost:5173/query?name=米&age=12\`
query.vue接收参数
\`\`\`js
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route=useRoute()
console.log(route.query);

<\/script>

<template>
<div>{{ $route.query }}</div>
</template>
\`\`\`

## state路由

根据name跳转

router里面要这样设置:
\`\`\`js
 {
    path:'/state',
    name:'myname',
    component:()=>import("../views/send/state.vue")
}
\`\`\`
\`\`\`html
<router-link :to="{name:'myname'}">state路由</router-link>
\`\`\`
会跳转到http://localhost:5173/state

\`\`\`html
<router-link :to="{name:'myname',state:{name:'米'}}">state路由</router-link>
<button @click="$router.push({name:'myname',state:{name:'米'}})">state</button>
\`\`\`
在state.vue接收参数
\`\`\`js
<script setup lang="ts">
const historyN=history
console.log(history.state);

<\/script>

<template>
<div>state.vue</div>
<div>{{ historyN.state.name }}</div>
</template>
\`\`\`
`;export{n as default};
