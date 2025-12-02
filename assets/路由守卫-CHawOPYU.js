const r=`# 路由守卫\r
\r
## 在路由跳转的时候可以在不同阶段插入一些处理，比如说：鉴权，登陆检查啊\r
一般就写在：全局前置守卫\r
\r
除了前置的守卫还有：\r
- 全局解析守卫\r
- 全局后置钩子\r
## 1. 全局守卫\r
\`\`\`js\r
// 全局前置守卫 - 最常用\r
router.beforeEach((to, from, next) => {\r
  // 权限验证、登录检查等\r
  next() // 必须调用\r
})\r
\r
// 全局解析守卫\r
router.beforeResolve((to, from, next) => {\r
  // 在导航被确认前，组件解析后调用\r
})\r
\r
// 全局后置钩子\r
router.afterEach((to, from) => {\r
  // 导航完成后的操作，如页面统计\r
})\r
\`\`\`\r
这些都是全是全局的，然后还有路由独享的守卫和组件内守卫\r
## 2. 路由独享的守卫\r
\`\`\`js\r
const routes = [\r
  {\r
    path: '/admin',\r
    component: Admin,\r
    beforeEnter: (to, from, next) => {\r
      // 仅对该路由生效\r
    }\r
  }\r
]\r
\`\`\`\r
## 3. 组件内守卫\r
\`\`\`js\r
export default {\r
  beforeRouteEnter(to, from, next) {\r
    // 不能访问 this\r
    next(vm => {\r
      // 通过回调访问组件实例\r
    })\r
  },\r
  \r
  beforeRouteUpdate(to, from, next) {\r
    // 组件复用时调用\r
  },\r
  \r
  beforeRouteLeave(to, from, next) {\r
    // 离开组件时调用，如保存草稿提示\r
  }\r
}\r
\`\`\`\r
在Vue面试中回答路由守卫问题时，建议采用结构化、清晰的回答方式。以下是推荐的回答框架和要点：\r
\r
## 执行顺序详解（重要！）\r
**完整导航解析流程：**\r
1. 导航触发\r
2. 调用失活组件的 \`beforeRouteLeave\`\r
3. 调用全局 \`beforeEach\`\r
4. 调用重用组件的 \`beforeRouteUpdate\`（如果有）\r
5. 调用路由配置的 \`beforeEnter\`\r
6. 解析异步路由组件\r
7. 调用激活组件的 \`beforeRouteEnter\`\r
8. 调用全局 \`beforeResolve\`\r
9. 导航确认\r
10. 调用全局 \`afterEach\`\r
11. 更新DOM\r
12. 调用 \`beforeRouteEnter\` 中传给 \`next\` 的回调\r
\r
## 实际应用场景\r
### 1. **权限控制**\r
\`\`\`javascript\r
router.beforeEach((to, from, next) => {\r
  if (to.meta.requiresAuth && !isAuthenticated()) {\r
    next('/login')\r
  } else {\r
    next()\r
  }\r
})\r
\`\`\`\r
\r
### 2. **页面访问控制**\r
- 登录验证\r
- 角色权限验证\r
- 路由元信息配合使用\r
\r
### 3. **数据预加载**\r
\`\`\`javascript\r
beforeRouteEnter(to, from, next) {\r
  api.getData().then(data => {\r
    next(vm => vm.setData(data))\r
  })\r
}\r
\`\`\`\r
\r
### 4. **离开页面提示**\r
\`\`\`javascript\r
beforeRouteLeave(to, from, next) {\r
  if (this.unsavedChanges) {\r
    const answer = confirm('有未保存的更改，确定离开吗？')\r
    answer ? next() : next(false)\r
  } else {\r
    next()\r
  }\r
}\r
\`\`\`\r
\r
## 五、注意事项和最佳实践\r
### 关键点：\r
1. **next() 必须调用**，否则导航会挂起\r
2. **next(false)** 中断当前导航\r
3. **next('/path')** 重定向到新路径\r
4. **next(error)** 传入Error实例，触发错误处理\r
\r
### 最佳实践：\r
- 保持守卫逻辑简洁\r
- 避免在beforeEach中进行复杂异步操作\r
- 使用路由元信息(meta)存储权限标识\r
- 考虑使用路由懒加载与守卫的配合\r
\r
## 六、高级技巧（加分项）\r
\`\`\`javascript\r
// 组合式API中使用守卫\r
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'\r
\r
export default {\r
  setup() {\r
    onBeforeRouteLeave((to, from) => {\r
      // 清理操作\r
    })\r
  }\r
}\r
\`\`\`\r
\r
流程：\r
\r
\`\`\`js\r
用户点击链接/编程导航\r
    ↓\r
┌─────────────────┐\r
│   导航触发      │\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 1. beforeRouteLeave │ ← A组件的“离开守卫”\r
│   (页面A组件内)   │   → 可以提示“有未保存的更改”\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 2. beforeEach   │ ← 全局“最前面”的守卫\r
│   (全局)        │   → 适合做登录验证\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 3. beforeRouteUpdate │ ← 只有组件复用时触发\r
│   (如果A和B是同一组件) │   → 例如：/user/1 → /user/2\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 4. beforeEnter  │ ← 写在路由配置里的守卫\r
│   (B路由独有)    │   → 针对特定路由的检查\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 5. 解析异步组件  │ ← 如果是懒加载，此时加载B组件\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 6. beforeRouteEnter │ ← B组件的“进入守卫”\r
│   (B组件内，但还不能用this)│   → 可以预加载数据\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 7. beforeResolve │ ← 全局“最后确认”守卫\r
│   (全局)        │   → 所有验证都完成了\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│   导航确认！    │ ← 可以真正跳转了\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 8. afterEach    │ ← 全局“完成后”钩子\r
│   (全局)        │   → 适合做页面统计\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│   更新DOM      │ ← 显示B页面\r
└─────────────────┘\r
    ↓\r
┌─────────────────┐\r
│ 9. beforeRouteEnter │ ← B组件守卫的next回调\r
│   的回调执行     │   → 现在可以访问B组件的this了\r
└─────────────────┘\r
\`\`\`\r
## 回答示例\r
“路由守卫分为全局、路由独享和组件内三种。我常用的是全局beforeEach做统一权限验证，配合路由元信息meta标记需要验证的路由。组件内beforeRouteLeave常用于防止用户误操作离开页面。需要注意守卫是异步执行的，必须调用next()来继续或中断导航。”\r
`;export{r as default};
