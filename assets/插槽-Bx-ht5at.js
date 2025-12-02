const n=`# 插槽

## 默认插槽
子组件：
\`\`\`html
<slot></slot>
\`\`\`
父组件：
\`\`\`html
<son>
  <h2>默认插槽</h2>
</son>
\`\`\`
## 具名插槽
子组件：
\`\`\`html
<slot name="bbb" ></slot>
<slot name="btn"></slot>
\`\`\`
父组件：
\`\`\`html
<son>
  <template #bbb>
     <h1>hhhhh</h1>
  </template>
  <template #btn>
     <button>btn</button>
   </template>
</son>
\`\`\`

## 作用域插槽
子组件：
\`\`\`html
<script setup lang="ts">
import { ref } from "vue";

const user=ref({name:"张三",age:25})
<\/script>
<template>
<slot name="qq" :user="user"></slot>
</template>
\`\`\`
父组件：
\`\`\`html
<son>
  <template #qq="props">
    <h4>{{props.user.name}}</h4>
   </template>
</son>
\`\`\``;export{n as default};
