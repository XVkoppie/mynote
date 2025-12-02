const n=`## 1. 组件间通信的方式

### 1.1 父子组件通信


#### Props/Events - 单向数据流

1. 父传子
- **父组件引入子组件，用 v-bind 绑定数据**
- **子组件通过 props 接收数据**

\`\`\`js
<!-- 父组件 -->
<template>
  <ChildComponent :message="parentMessage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('来自父组件的数据');
<\/script>
\`\`\`

\`\`\`js
<!-- 子组件 -->
<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
<\/script>
\`\`\`

这种方式父传子很方便，但是父传给孙子组件就很麻烦，要先（父→子→孙）

2. 子传父
- **子组件通过 $emit 触发事件，传递数据给父组件**

**父组件**
\`\`\`js
<script setup lang="ts">
import { ref, provide } from 'vue';
import son from './son.vue';

const count=ref(0)
const changeCount=(num)=>{
  count.value=num
}
<\/script>

<template>
<div>father.vue</div>
<son :count="count" @changeCount="changeCount"></son>
</template>
\`\`\`

**子组件**

\`\`\`js
<script setup lang="ts">
const props=defineProps({
  count:Number
})
const emit=defineEmits(['changeCount'])
const handelCount=(num)=>{
  emit('changeCount',props.count+num)
}
<\/script>

<template>
<div>son.vue</div>
<button @click="handelCount(-1)">-</button>
{{ count }}
<button @click="handelCount(1)">+</button>
</template>
\`\`\`

---
#### Provide/Inject - 跨级组件通信

1. 父传子

**不想通过 props 逐层传递，可以使用 provide/inject 来实现跨级组件通信**

**父组件**
\`\`\`js
<script setup lang="ts">
import { ref, provide } from 'vue';
import Son from './Son.vue';

const str = ref('父组件的信息');

provide('str', str);
provide('parentMethod', () => {
  console.log('父组件的方法');
});
<\/script>
\`\`\`

**子组件**
\`\`\`js
<script setup lang="ts">
import { inject } from 'vue';
import GrandSon from './GrandSon.vue';

const str = inject('str');
const parentMethod = inject('parentMethod');

parentMethod?.();
<\/script>
\`\`\`

2. 子传父

- **Provide/Inject + 响应式对象 - 可以修改**

**父组件**
\`\`\`js
<script setup lang="ts">
import { ref, provide } from 'vue';
import son from './son.vue';

const count=ref(0)
provide('count',count)
<\/script>
\`\`\`
**子组件**
\`\`\`js
<script setup lang="ts">
import { inject } from "vue";

const count=inject("count");
<\/script>

<template>
<div>grandSon.vue</div>
{{ count }}
<button @click="count++">increment</button>
</template>

<style scoped>

</style>
\`\`\`

- **Provide/Inject + 方法 - 可以修改**

**父组件**
\`\`\`js
<script setup lang="ts">
import { ref, provide } from 'vue';
import son from './son.vue';

const count=ref(0)
provide('increment',()=>{
  count.value++
})
<\/script>

<template>
  {{ count }}
<div>father.vue</div>
<son></son>
</template>

<style scoped>

</style>
\`\`\`

**子组件**
\`\`\`js
<script setup lang="ts">
import { inject } from "vue";
const increment=inject('increment')
<\/script>

<template>
<div>grandSon.vue</div>
<button @click="increment">increment</button>
</template>

<style scoped>

</style>
\`\`\`

### 1.2 兄弟组件通信

### 1.3 跨级组件通信

### 1.4 通过事件总线

### 1.5 Vuex 状态管理
`;export{n as default};
