const e=`# Vue.js 生命周期与 keep-alive 缓存机制详解

## 一、Vue 生命周期概述

### 1. 生命周期阶段
Vue 实例从创建到销毁的完整生命周期包括以下阶段：
1. 创建
2. 初始化数据
3. 编译 template
4. 挂载 DOM
5. 渲染
6. 更新渲染
7. 卸载

### 2. 生命周期钩子函数

| 钩子函数 | 触发时机 |
|---------|---------|
| beforeCreate | 实例创建之初 |
| created | 组件创建完成 |
| beforeMount | 组件挂载之前 |
| mounted | 组件挂载之后 |
| beforeUpdate | 组件更新之前 |
| updated | 组件更新之后 |
| beforeDestroy | 销毁之前 |
| destroyed | 销毁之后 |
| activated | keep-alive 组件激活时 |
| deactivated | keep-alive 组件停用时 |
| errorCaptured | 捕获子组件错误时 |

### 3. 数据与 DOM 可用性

| 阶段 | $el 可用性 | $data 可用性 |
|------|-----------|-------------|
| beforeCreate | undefined | undefined |
| created | undefined | 有数据 |
| beforeMount | undefined | 有数据 |
| mounted | 有 DOM | 有数据 |

## 二、keep-alive 缓存机制

### 1. 基本概念
\`keep-alive\` 是 Vue 内置的一个组件，用于缓存组件实例，避免重复渲染。

### 2. 新增生命周期钩子
使用 \`keep-alive\` 会新增两个生命周期钩子：
1. \`activated\` - 组件激活时调用
2. \`deactivated\` - 组件停用时调用

### 3. 缓存原理
1. 第一次进入页面时：
- 执行完整的创建过程（beforeCreate → created → beforeMount → mounted）
- 在 created 之后、mounted 之前缓存组件
2. 后续进入页面时：
- 直接从缓存中获取组件实例
- 只触发 \`activated\` 钩子

### 4. 配置选项

| 选项 | 说明 | 示例 |
|------|------|------|
| :all | 缓存所有组件 | \`<keep-alive :all="true">\` |
| include | 只缓存指定组件 | \`<keep-alive :include="['CompA','CompB']">\` |
| exclude | 排除指定组件 | \`<keep-alive :exclude="['CompC']">\` |
| max | 最大缓存数量（LRU算法） | \`<keep-alive :max="10">\` |

> **注意**：使用 include 和 exclude 时，组件必须设置 name 属性

### 5. Vue2 与 Vue3 使用区别

**Vue2 写法：**
\`\`\`html
<keep-alive>
<router-view></router-view>
</keep-alive>
\`\`\`

**Vue3 写法（动态路由）：**
\`\`\`html
<router-view v-slot="{ Component }">
<keep-alive>
<component :is="Component"></component>
</keep-alive>
</router-view>
\`\`\`

## 三、生命周期使用场景

1. **created** - 发起 API 请求
2. **mounted** - 获取 DOM 元素尺寸信息
3. **beforeDestroy** - 移除事件监听器
4. **beforeDestroy** - 记录视频播放进度
5. **activated** - 检查 ID 变化决定是否重新请求数据

## 四、示例代码

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vue 生命周期示例</title>
<style>
.active {
overflow: auto;
}
</style>
</head>
<body>
<div id="app">
<div ref="title">{{msg}}</div>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
<script>
const app = Vue.createApp({
data() {
return {
list: ["你好", "用户", "很高兴遇到你"],
msg: ""
}
},
beforeCreate() {
console.log('beforeCreate:', this.msg); // undefined
},
created() {
console.log('created:', this.msg); // 有数据
this.showMsg();
},
beforeMount() {
console.log('beforeMount:', this.msg); // 有数据
},
mounted() {
console.log('mounted:', this.msg);
console.log('DOM元素:', this.$refs.title);
},
methods: {
showMsg() {
let i = 0;
let t = setInterval(() => {
this.msg += this.list[i];
i++;
if (i == this.list.length) {
clearInterval(t)
}
}, 500)
}
}
})
app.mount('#app')
<\/script>
</body>
</html>
\`\`\`

## 五、关键总结

1. **首次加载流程**：beforeCreate → created → beforeMount → mounted
2. **keep-alive 首次加载**：beforeCreate → created → beforeMount → mounted → activated
3. **keep-alive 后续加载**：只触发 activated
4. **缓存策略**：使用 LRU 算法管理缓存，超过 max 数量时会移除最久未使用的组件

## 六、问题
2. 一旦进入页面或组件，会执行哪些生命周期，顺序

进入页面会进行前四个

3. 在哪个阶段有$el,在哪个阶段有$data

beforeCreate:都是undefined
created:$data有数据
beforeMount:有data没有el
mounted:有data和el

4. 如果加入keep-alive会多两个生命周期钩子

    1. activated:组件激活
    2. deactivated:组件停用

5. 如果加入keep-alive，第一次进入组件会执行哪些生命周期（顺序）

    - beforeCreate:实例创建之初
    - create:组件创建完成
    - beforeMount:组件挂载之前
    - mounted:组件挂载之后
    - activated:组件激活


6. 如果加入keep-alive，第二次或第n次进入组件会执行哪些生命周期

只执行一个生命周期
activated:组件激活`;export{e as default};
