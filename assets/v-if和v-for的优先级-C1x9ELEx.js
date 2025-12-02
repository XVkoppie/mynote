const n=`# v-if和v-for的优先级

## Vue 2：v-for 优先级更高
- 在 Vue 2 中，v-for 的优先级高于 v-if。

\`\`\`html
<template>
  <!-- Vue 2: 这会先执行 v-for，再对每个元素执行 v-if -->
  <div v-for="item in list" v-if="item.isActive" :key="item.id">
    {{ item.name }}
  </div>
</template>
\`\`\`

## Vue 3：v-if 优先级更高
- 在 Vue 3 中，v-if 的优先级高于 v-for。

\`\`\`html
<template>
  <!-- Vue 3: 这会先执行 v-if，再执行 v-for -->
  <!-- 如果 list 未定义，会报错！ -->
  <div v-for="item in list" v-if="list && list.length" :key="item.id">
    {{ item.name }}
  </div>
</template>
\`\`\``;export{n as default};
