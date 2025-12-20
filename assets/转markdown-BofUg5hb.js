const r=`# Vue3 Markdown笔记阅读器实现笔记\r
\r
## 📋 项目目标\r
实现一个能够自动读取并展示Markdown文件的Vue3应用\r
\r
## 🛠️ 技术栈\r
- Vue 3 (Composition API)\r
- TypeScript\r
- Vite\r
- marked (Markdown解析库)\r
- github-markdown-css (样式库)\r
\r
## 📁 目录结构\r
\`\`\`\r
src/\r
├── assets/\r
│   └── markdown/      # 存放所有.md文件\r
│       ├── vue教程.md\r
│       ├── css技巧.md\r
│       └── ...\r
├── components/\r
│   └── Home.vue       # 主组件\r
└── main.js\r
\`\`\`\r
\r
## 🚀 核心实现步骤\r
\r
### 1. 安装依赖\r
\`\`\`bash\r
npm install marked github-markdown-css\r
\`\`\`\r
\r
### 2. 配置marked解析器\r
\`\`\`javascript\r
// 关键点1：配置marked选项\r
marked.setOptions({\r
  gfm: true,           // 启用GitHub风格的Markdown\r
  breaks: true,        // 启用换行符转换\r
  smartLists: true,    // 智能列表处理\r
  smartypants: true,   // 智能标点符号转换\r
})\r
\`\`\`\r
\r
### 3. 动态导入所有md文件\r
\`\`\`javascript\r
// 关键点2：使用Vite的glob导入\r
const modules = import.meta.glob('@/assets/markdown/*.md', {\r
  as: 'raw',    // 以原始文本形式导入\r
  eager: true,  // 立即导入（非懒加载）\r
})\r
\`\`\`\r
\r
**返回的数据结构：**\r
\`\`\`javascript\r
// modules对象示例：\r
{\r
  '/src/assets/markdown/vue教程.md': '# Vue教程内容...',\r
  '/src/assets/markdown/css技巧.md': '## CSS内容...'\r
}\r
\`\`\`\r
\r
### 4. 提取并格式化文件名\r
\`\`\`javascript\r
// 关键点3：从文件路径提取文件名\r
const getFileName = (filePath) => {\r
  // 步骤分解：\r
  // 1. split('/') 分割路径 → ['src', 'assets', 'markdown', 'vue教程.md']\r
  // 2. pop() 取最后一部分 → 'vue教程.md'\r
  // 3. replace('.md', '') 去掉扩展名 → 'vue教程'\r
  // 4. replace(/-/g, ' ') 短横线转空格（可选）\r
  const fileName = filePath.split('/').pop()\r
  return fileName.replace('.md', '').replace(/-/g, ' ')\r
}\r
\`\`\`\r
\r
### 5. 转换数据为文件列表\r
\`\`\`javascript\r
// 关键点4：Object.entries + map转换\r
const initFileList = () => {\r
  // Object.entries将对象转为[[key, value], ...]数组\r
  fileList.value = Object.entries(modules).map(([path, content]) => {\r
    return {\r
      name: getFileName(path),  // 格式化后的名称\r
      path: path,               // 原始路径\r
      content: content,         // 文件内容\r
    }\r
  })\r
  \r
  // 按文件名排序\r
  fileList.value.sort((a, b) => a.name.localeCompare(b.name))\r
}\r
\`\`\`\r
\r
### 6. 加载和渲染Markdown\r
\`\`\`javascript\r
// 关键点5：解析并渲染Markdown\r
const loadMarkdown = (content, index) => {\r
  activeIndex.value = index        // 更新选中状态\r
  currentMarkDown.value = content  // 保存原始内容\r
  \r
  // 使用marked解析Markdown为HTML\r
  const html = marked.parse(content)\r
  \r
  // 添加markdown-body类应用GitHub样式\r
  compiledMarkdown.value = \`<div class="markdown-body">\${html}</div>\`\r
}\r
\`\`\`\r
\r
### 7. 初始加载第一个文件\r
\`\`\`javascript\r
onMounted(() => {\r
  initFileList()  // 初始化文件列表\r
  \r
  // 如果有文件，默认加载第一个\r
  if (fileList.value.length > 0) {\r
    loadMarkdown(fileList.value[0].content, 0)\r
  }\r
})\r
\`\`\`\r
\r
## 🎨 模板部分\r
\`\`\`html\r
<template>\r
  <div class="container">\r
    <!-- 左侧目录 -->\r
    <div class="sidebar">\r
      <h3>笔记目录</h3>\r
      <div\r
        class="file-item"\r
        v-for="(file, index) in fileList"\r
        @click="loadMarkdown(file.content, index)"\r
        :class="{ active: activeIndex === index }"\r
        :key="index"\r
      >\r
        {{ file.name }}\r
      </div>\r
    </div>\r
\r
    <!-- 右侧内容 -->\r
    <div class="content">\r
      <!-- v-html渲染解析后的HTML -->\r
      <div v-html="compiledMarkdown"></div>\r
    </div>\r
  </div>\r
</template>\r
\`\`\`\r
\r
## 💡 核心原理总结\r
\r
### 1. 动态导入机制\r
- **\`import.meta.glob()\`**：Vite提供的动态导入API\r
- **\`eager: true\`**：立即导入所有文件（非懒加载）\r
- **\`as: 'raw'\`**：导入为原始文本，不是模块\r
\r
### 2. 数据处理流程\r
\`\`\`\r
1. import.meta.glob → 获取所有md文件原始内容\r
2. Object.entries → 转换为可遍历的数组\r
3. map处理 → 提取文件名和内容\r
4. 存储到ref → 响应式数据\r
5. marked.parse → 解析为HTML\r
6. v-html → 渲染到页面\r
\`\`\`\r
\r
### 3. 响应式更新流程\r
\`\`\`\r
点击文件 → loadMarkdown() → \r
1. 更新activeIndex（高亮选中）\r
2. 使用marked解析content → HTML\r
3. 更新compiledMarkdown → 触发视图更新\r
\`\`\`\r
\r
## 🎯 关键API说明\r
\r
| API | 作用 | 返回值 |\r
|-----|------|--------|\r
| \`import.meta.glob()\` | 动态导入文件 | Promise对象 |\r
| \`Object.entries()\` | 对象转键值对数组 | \`[[key, value], ...]\` |\r
| \`marked.parse()\` | 解析Markdown | HTML字符串 |\r
| \`v-html\` | 渲染HTML | Vue指令 |\r
\r
## 🔧 扩展功能思路\r
\r
### 1. 添加搜索功能\r
\`\`\`javascript\r
// 在fileList中添加搜索过滤\r
const searchText = ref('')\r
const filteredFiles = computed(() => {\r
  return fileList.value.filter(file => \r
    file.name.includes(searchText.value)\r
  )\r
})\r
\`\`\`\r
\r
### 2. 添加主题切换\r
\`\`\`javascript\r
// 使用CSS变量切换样式\r
const themes = {\r
  light: { '--bg-color': '#fff', '--text-color': '#000' },\r
  dark: { '--bg-color': '#1a1a1a', '--text-color': '#fff' }\r
}\r
\`\`\`\r
\r
### 3. 添加编辑功能\r
\`\`\`javascript\r
// 双向绑定编辑内容\r
const isEditing = ref(false)\r
const editContent = ref('')\r
\r
const startEdit = (content) => {\r
  isEditing.value = true\r
  editContent.value = content\r
}\r
\`\`\`\r
\r
## 📝 使用注意事项\r
\r
1. **文件路径**：确保md文件放在 \`src/assets/markdown/\` 目录\r
2. **样式导入**：必须引入 \`github-markdown-css\`\r
3. **安全警告**：\`v-html\` 会渲染任意HTML，确保内容可信\r
4. **性能优化**：文件较多时可使用 \`eager: false\` 懒加载\r
\r
\r
## 代码\r
\r
### 数组读取\r
\`\`\`js\r
import { marked } from 'marked'\r
import { onMounted, ref } from 'vue'\r
\r
const fileList = ref([\r
  { name: 'note1', path: '/src/assets/markdown/note1.md' },\r
  { name: 'note2', path: '/src/assets/markdown/note2.md' },\r
  { name: 'note3', path: '/src/assets/markdown/note3.md' },\r
  { name: 'note4', path: '/src/assets/markdown/note-4.md' },\r
])\r
// 当前显示的markdown内容\r
const currentMarkdown = ref('')\r
// 编译后的HTML\r
const compiledMarkdown = ref('')\r
const loadMarkdown = async (filePath) => {\r
  try {\r
    const res = await fetch(filePath)\r
    const markdownText = await res.text()\r
    // 这里可以使用marked或其他库将Markdown转换为HTML\r
    currentMarkdown.value = markdownText\r
    compiledMarkdown.value = marked(markdownText)\r
  } catch (err) {\r
    console.error('Error loading markdown file:', err)\r
    currentMarkdown.value = '无法加载该文件。'\r
    compiledMarkdown.value = '<p>无法加载该文件。</p>'\r
  }\r
}\r
onMounted(() => {\r
  if (fileList.value.length > 0) {\r
    loadMarkdown(fileList.value[0].path)\r
  }\r
})\r
\`\`\`\r
\`\`\`html\r
<template>\r
  <div class="container">\r
    <!-- 左侧目录区域 -->\r
    <div class="sidebar">\r
      <h3>笔记目录</h3>\r
      <div\r
        class="file-item"\r
        v-for="file in fileList"\r
        @click="loadMarkdown(file.path)"\r
        :key="file.name"\r
      >\r
        {{ file.name }}\r
      </div>\r
    </div>\r
\r
    <!-- 右侧内容区域 -->\r
    <div class="content">\r
      <div v-html="compiledMarkdown"></div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.container {\r
  display: flex;\r
  height: 100vh;\r
}\r
\r
.sidebar {\r
  width: 180px;\r
  border-right: 1px solid #e0e0e0;\r
  padding: 20px;\r
  overflow-y: auto;\r
}\r
\r
.content {\r
  flex: 1;\r
  padding: 20px;\r
  overflow-y: auto;\r
}\r
.file-item {\r
  padding: 10px 15px;\r
  cursor: pointer;\r
  border-radius: 4px;\r
  margin-bottom: 5px;\r
}\r
\r
.file-item:hover {\r
  background-color: #f5f5f5;\r
}\r
\r
.file-item.active {\r
  background-color: #e3f2fd;\r
  color: #1976d2;\r
}\r
</style>\r
\`\`\`\r
\r
### 优化路径读取\r
\`\`\`js\r
import { marked } from 'marked'//pnpm i marked\r
import { onMounted, ref } from 'vue'\r
const modules = import.meta.glob('@/assets/markdown/*.md', {\r
  as: 'raw', // 以原始文本形式导入\r
  eager: true, // 立即导入（不是懒加载）\r
})\r
const fileList = ref([])\r
// 当前显示的markdown内容\r
const currentMarkdown = ref('')\r
// 编译后的HTML\r
const compiledMarkdown = ref('')\r
// 处理文件名：移除路径和扩展名\r
const activeIndex = ref(0)\r
const formatFileName = (filePath) => {\r
  // 例如：/src/assets/markdown/vue-tutorial.md → vue-tutorial\r
  const fileName = filePath.split('/').pop() || ''\r
  return fileName.replace('.md', '').replace(/-/g, ' ')\r
}\r
// 初始化文件列表\r
const initFileList = () => {\r
  fileList.value = Object.entries(modules).map(([path, content]) => {\r
    return {\r
      name: formatFileName(path),\r
      path: path,\r
      content: content,\r
    }\r
  })\r
  fileList.value.sort((a, b) => a.name.localeCompare(b.name))\r
}\r
//加载\r
const loadMarkDown = (content, index) => {\r
  try {\r
    activeIndex.value = index\r
    currentMarkdown.value = content\r
    compiledMarkdown.value = marked.parse(content)\r
  } catch (err) {\r
    console.error(err)\r
  }\r
}\r
onMounted(() => {\r
  initFileList()\r
  if (fileList.value.length > 0) {\r
    loadMarkDown(fileList.value[0].content, 0)\r
  }\r
})\r
\`\`\`\r
\`\`\`html\r
  <div class="container">\r
    <!-- 左侧目录区域 -->\r
    <div class="sidebar">\r
      <h3>笔记目录</h3>\r
      <div\r
        class="file-item"\r
        v-for="(file, index) in fileList"\r
        :key="file.name"\r
        @click="loadMarkDown(file.content, index)"\r
        :class="{ active: activeIndex === index }"\r
      >\r
        {{ file.name }}\r
      </div>\r
    </div>\r
\r
    <!-- 右侧内容区域 -->\r
    <div class="content">\r
      <div v-html="compiledMarkdown"></div>\r
    </div>\r
  </div>\r
\`\`\``;export{r as default};
