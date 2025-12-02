const n=`# 模板语法

## v-on (@)
### 绑定动态事件

\`\`\`html
<script setup lang="ts">
const event='click'
  const xxx=()=>{
    console.log('点击了')
  }
<\/script>

<template>
  <div></div>
  <button @[event]="xxx">点击</button>
</template>
\`\`\`
### .stop阻止冒泡
点击按钮父元素的点击事件也被触发
\`\`\`html
<script setup lang="ts">
const event='click'
  const xxx=()=>{
    console.log('点击了')
  }
  const parent=()=>{
    console.log('父元素')
  }
<\/script>

<template>
  <div @click="parent">
    <button @[event]="xxx">点击</button>
  </div>
</template>
\`\`\`
阻止冒泡,点击按钮父元素的点击事件不被触发
\`\`\`html
<script setup lang="ts">
const event='click'
  const xxx=()=>{
    console.log('点击了')
  }
  const parent=()=>{
    console.log('父元素')
  }
<\/script>

<template>
  <div @click="parent">
    <button @[event].stop="xxx">点击</button>
  </div>
</template>
\`\`\`

### 常用修饰符
\`\`\`html
<!-- 阻止默认行为 -->
<a @click.prevent="handleClick">链接</a>

<!-- 阻止事件冒泡 -->
<div @click.stop="handleClick">点击我</div>

<!-- 事件只触发一次 -->
<button @click.once="handleClick">只能点击一次</button>

<!-- 串联使用 -->
<form @submit.prevent.stop="handleSubmit"></form>
\`\`\`

### 其他修饰符
\`\`\`html
<!-- 捕获模式 -->
<div @click.capture="handleClick">捕获阶段触发</div>

<!-- 只有事件目标自身才触发 -->
<div @click.self="handleClick">只有点击自己才触发</div>

<!-- 被动模式，提高滚动性能 -->
<div @scroll.passive="handleScroll">滚动事件</div>
\`\`\`

### 按键修饰符
\`\`\`html
<!-- 特定按键 -->
<input @keyup.enter="submit">
<input @keyup.esc="cancel">
<input @keyup.13="submit"> <!-- 使用keyCode -->

<!-- 系统修饰键 -->
<button @click.ctrl="handleClick">Ctrl + 点击</button>
<input @keyup.ctrl.enter="submit">
\`\`\`

### 修饰符的使用场景

| 修饰符 | 使用场景 |
|--------|----------|
| \`.prevent\` | 表单提交、链接跳转 |
| \`.stop\` | 嵌套元素的事件处理 |
| \`.once\` | 一次性操作（如支付按钮）|
| \`.capture\` | 需要在捕获阶段处理事件 |
| \`.self\` | 只处理元素自身触发的事件 |

## v-bind (:)
### 绑定动态属性
\`\`\`html
<script setup lang="ts">
import { ref } from "vue";

const cls = ref(true)
<\/script>

<template>
  <div :class="[cls? 'a':'b']">
  </div>
  <button @click="cls = !cls">切换</button>
</template>
\`\`\`

## v-once
元素和组件只渲染一次
\`\`\`html
<script setup lang="ts">
import { ref } from "vue";

const a=ref(1)
<\/script>

<template>
  <div v-once>{{ a }}</div>
  <button @click="a++">Increment</button>
</template>
\`\`\`
a不会增加,只会渲染一次
## v-memo`;export{n as default};
