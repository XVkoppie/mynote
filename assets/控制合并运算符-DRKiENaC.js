const n=`# ??合并运算符\r
## 基本语法\r
\`\`\`javascript\r
result = a ?? b;\r
\`\`\`\r
- 如果 \`a\` 是 \`null\` 或 \`undefined\`，返回 \`b\`\r
- 如果 \`a\` 是其他值（包括 \`0\`、\`false\`、\`''\` 等），返回 \`a\`\r
\r
## 与逻辑或（||）的区别\r
\`??\` 和 \`||\` 的主要区别在于**对假值的处理**：\r
\r
\`\`\`javascript\r
// 使用 ??\r
console.log(0 ?? 10);          // 0（?? 不会把 0 视为空值）\r
console.log('' ?? '默认值');   // ''（?? 不会把空字符串视为空值）\r
console.log(false ?? true);    // false（?? 不会把 false 视为空值）\r
\r
// 使用 ||\r
console.log(0 || 10);          // 10（|| 把 0 视为假值）\r
console.log('' || '默认值');   // '默认值'（|| 把空字符串视为假值）\r
console.log(false || true);    // true（|| 把 false 视为假值）\r
\r
// 对 null 和 undefined 的处理相同\r
console.log(null ?? '默认值');     // '默认值'\r
console.log(undefined ?? '默认值'); // '默认值'\r
console.log(null || '默认值');     // '默认值'\r
console.log(undefined || '默认值'); // '默认值'\r
\`\`\`\r
\r
## 常见使用场景\r
\r
### 1. 设置默认值\r
\`\`\`javascript\r
function greet(name) {\r
    // 只有当 name 是 null 或 undefined 时才使用默认值\r
    const displayName = name ?? '访客';\r
    console.log(\`你好，\${displayName}\`);\r
}\r
\r
greet('小明');  // 你好，小明\r
greet(null);    // 你好，访客\r
greet('');      // 你好，（空字符串被保留）\r
\`\`\`\r
\r
### 2. 配置对象处理\r
\`\`\`javascript\r
const config = {\r
    timeout: 0,  // 0 是有意义的配置值\r
    retry: null\r
};\r
\r
const timeout = config.timeout ?? 3000;  // 0（保留 0 值）\r
const retry = config.retry ?? 3;         // 3（null 被替换）\r
\`\`\`\r
\r
### 3. 链式操作\r
\`\`\`javascript\r
const user = {\r
    profile: {\r
        settings: null\r
    }\r
};\r
\r
// 只有当 settings 是 null/undefined 时才使用默认值\r
const theme = user.profile.settings?.theme ?? 'light';\r
\`\`\`\r
\r
### 4. 与可选链运算符（?.）结合\r
\`\`\`javascript\r
const data = {\r
    user: {\r
        address: null\r
    }\r
};\r
\r
// 安全的深度访问 + 默认值\r
const city = data.user?.address?.city ?? '未知城市';\r
console.log(city);  // 未知城市\r
\`\`\`\r
\r
## 注意事项\r
\r
### 1. 运算符优先级\r
\`??\` 的优先级较低，通常建议使用括号明确优先级：\r
\`\`\`javascript\r
// 有歧义（会报错）\r
// let x = a && b ?? c;  // 语法错误\r
\r
// 正确方式\r
let x = (a && b) ?? c;\r
\`\`\`\r
\r
### 2. 不能与 && 或 || 直接连用\r
\`\`\`javascript\r
// 错误的写法（会报错）\r
// console.log(null || undefined ?? '默认值');\r
\r
// 正确的写法\r
console.log((null || undefined) ?? '默认值');  // '默认值'\r
\`\`\`\r
\r
### 3. 实际应用示例\r
\`\`\`javascript\r
// API 响应处理\r
function processResponse(response) {\r
    const data = response.data ?? [];\r
    const message = response.message ?? '操作成功';\r
    const code = response.code ?? 200;\r
    \r
    return { data, message, code };\r
}\r
\r
// 表单处理\r
function getFormValue(formData) {\r
    return {\r
        name: formData.name ?? '',\r
        age: formData.age ?? 0,  // 0 表示未填写，而不是被替换为默认值\r
        email: formData.email ?? '未提供'\r
    };\r
}\r
\`\`\`\r
\r
## 兼容性\r
- ES2020 新增特性\r
- 现代浏览器和 Node.js（12+版本）都支持\r
- 如果需要支持旧环境，可以使用 Babel 转译\r
\r
空值合并运算符让代码更加简洁明了，特别适合处理那些 \`0\`、\`false\`、\`''\` 等假值有实际意义的场景。\r
# ?.\r
\r
\`?.\` 是 **可选链运算符（Optional Chaining）**，也是 **ES2020** 引入的特性。它允许你安全地访问嵌套对象的属性，而无需检查中间属性是否存在。\r
\r
## 基本语法\r
\r
### 1. 访问属性\r
\`\`\`javascript\r
obj?.prop        // 访问属性\r
obj?.[expr]      // 使用表达式访问属性\r
func?.(args)     // 调用函数\r
\`\`\`\r
\r
## 主要使用场景\r
\r
### 1. 安全访问深层属性\r
\`\`\`javascript\r
const user = {\r
    profile: {\r
        name: '小明',\r
        address: {\r
            city: '北京'\r
        }\r
    }\r
};\r
\r
// 传统写法（繁琐）\r
const city1 = user && user.profile && user.profile.address && user.profile.address.city;\r
\r
// 使用可选链（简洁）\r
const city2 = user?.profile?.address?.city;\r
console.log(city2);  // '北京'\r
\r
// 如果某个中间属性不存在\r
const user2 = {};\r
const city3 = user2?.profile?.address?.city;\r
console.log(city3);  // undefined（不会报错）\r
\`\`\`\r
\r
### 2. 安全调用函数\r
\`\`\`javascript\r
const obj = {\r
    greet: function() {\r
        return '你好';\r
    }\r
};\r
\r
// 传统写法\r
if (obj.greet) {\r
    obj.greet();\r
}\r
\r
// 使用可选链\r
obj.greet?.();  // '你好'\r
\r
// 如果函数不存在\r
const obj2 = {};\r
obj2.greet?.();  // undefined（不会报错）\r
\`\`\`\r
\r
### 3. 访问数组元素\r
\`\`\`javascript\r
const arr = [1, 2, 3];\r
console.log(arr?.[0]);  // 1\r
\r
const arr2 = null;\r
console.log(arr2?.[0]);  // undefined（不会报错）\r
\r
// 结合方法调用\r
const arr3 = null;\r
arr3?.map?.(x => x * 2);  // undefined\r
\`\`\`\r
\r
### 4. 使用动态属性名\r
\`\`\`javascript\r
const obj = {\r
    name: '小明',\r
    age: 25\r
};\r
\r
const propName = 'name';\r
console.log(obj?.[propName]);  // '小明'\r
\r
const propName2 = 'email';\r
console.log(obj?.[propName2]);  // undefined\r
\`\`\`\r
\r
## 实际应用示例\r
\r
### 1. API 响应处理\r
\`\`\`javascript\r
const response = {\r
    data: {\r
        users: [\r
            { name: '小明', age: 25 }\r
        ]\r
    }\r
};\r
\r
// 安全的深度访问\r
const userName = response?.data?.users?.[0]?.name;\r
console.log(userName);  // '小明'\r
\r
// 即使数据不完整也不会报错\r
const badResponse = {};\r
const userName2 = badResponse?.data?.users?.[0]?.name;\r
console.log(userName2);  // undefined\r
\`\`\`\r
\r
### 2. 事件处理\r
\`\`\`javascript\r
// 安全调用事件处理器\r
element.addEventListener('click', (event) => {\r
    // 如果 onHandleClick 不存在也不会报错\r
    props?.onHandleClick?.(event);\r
});\r
\`\`\`\r
\r
### 3. 配置对象\r
\`\`\`javascript\r
const config = {\r
    api: {\r
        baseUrl: 'https://api.example.com',\r
        timeout: 5000\r
    }\r
};\r
\r
// 安全的配置读取\r
const timeout = config?.api?.timeout ?? 3000;\r
const retryCount = config?.api?.retry?.count ?? 3;\r
\`\`\`\r
\r
### 4. DOM 操作\r
\`\`\`javascript\r
// 安全获取 DOM 元素属性\r
const value = document.querySelector('.input')?.value;\r
const text = document.querySelector('.title')?.textContent;\r
\r
// 安全调用方法\r
document.querySelector('.modal')?.show?.();\r
document.querySelector('.player')?.pause?.();\r
\`\`\`\r
\r
## 与空值合并运算符（??）结合使用\r
\r
\`\`\`javascript\r
const user = {\r
    profile: null\r
};\r
\r
// 安全的访问 + 默认值\r
const name = user?.profile?.name ?? '匿名用户';\r
const age = user?.profile?.age ?? 0;\r
const city = user?.profile?.address?.city ?? '未知城市';\r
\r
console.log(name);  // '匿名用户'\r
console.log(age);   // 0\r
console.log(city);  // '未知城市'\r
\`\`\`\r
\r
## 注意事项\r
\r
### 1. 不能用于赋值\r
\`\`\`javascript\r
const obj = {};\r
obj?.prop = 'value';  // 语法错误！不能这样使用\r
\`\`\`\r
\r
### 2. 短路行为\r
\`\`\`javascript\r
// 一旦遇到 null 或 undefined，就会立即停止\r
const result = obj?.prop?.method?.();\r
// 如果 obj 是 null/undefined，后面的访问都不会执行\r
\`\`\`\r
\r
### 3. 与普通属性访问的区别\r
\`\`\`javascript\r
const obj = null;\r
\r
// 普通访问（会报错）\r
// obj.prop  // TypeError: Cannot read properties of null\r
\r
// 可选链访问（安全）\r
obj?.prop  // undefined\r
\r
// 但是注意：\r
obj?.prop?.method()  // undefined（安全）\r
obj.prop?.method()   // 报错！因为 obj.prop 已经报错了\r
\`\`\`\r
\r
### 4. 处理边界情况\r
\`\`\`javascript\r
// 对于未声明的变量\r
// undeclaredVar?.prop  // ReferenceError: undeclaredVar is not defined\r
\r
// 需要先确保变量存在\r
if (typeof undeclaredVar !== 'undefined') {\r
    undeclaredVar?.prop;\r
}\r
\`\`\`\r
\r
## 兼容性和转译\r
\r
- ES2020 新增特性\r
- 现代浏览器和 Node.js（14+版本）支持\r
- 使用 Babel 或 TypeScript 可以在旧环境中使用\r
\r
## 实用技巧\r
\r
### 1. 简化条件逻辑\r
\`\`\`javascript\r
// 传统写法\r
function getCity(user) {\r
    if (user && user.address && user.address.city) {\r
        return user.address.city;\r
    }\r
    return '未知';\r
}\r
\r
// 使用可选链\r
function getCity(user) {\r
    return user?.address?.city ?? '未知';\r
}\r
\`\`\`\r
\r
### 2. 链式方法调用\r
\`\`\`javascript\r
// 安全调用数组方法\r
const results = data?.filter?.(item => item.active)?.map?.(item => item.name) ?? [];\r
\r
// 安全调用字符串方法\r
const formatted = value?.toString?.().toUpperCase?.();\r
\`\`\`\r
\r
可选链运算符极大地简化了处理嵌套对象和不确定结构的代码，让代码更加简洁、安全、易读。`;export{n as default};
