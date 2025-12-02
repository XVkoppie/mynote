const n=`# 组合式api
Vue 3 引入了组合式 API（Composition API），它提供了一种更灵活的方式来组织和复用逻辑。
与 Vue 2 的选项式 API（Options API）相比，组合式 API 允许开发者在一个函数中组合多个响应式状态和生命周期钩子，使得代码更加清晰和易于维护。

(响应式部分 ref(),reactive(),生命周期函数)
## 主要特点
1. **更好的逻辑复用**：通过组合函数，可以轻松地在不同组件之间共享逻辑。
2. **更清晰的代码结构**：将相关的逻辑放在一起，避免了选项式 API 中的“上下文切换”问题。
3. **TypeScript 支持**：组合式 API 更加适合 TypeScript，提供更好的类型推导和检查。
4. **更好的性能**：组合式 API 通过更细粒度的响应式系统，提供了更好的性能优化。
5. **可以有多个根节点**：组合式 API 允许在一个组件中有多个根节点，提供了更大的灵活性。
## 示例
\`\`\`javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    return {
      count,
      doubleCount,
      increment
    };
  }
};
\`\`\``;export{n as default};
