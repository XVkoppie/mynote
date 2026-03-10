const n=`# css实现垂直居中\r
\r
## flex实现\r
\r
\`\`\`css \r
.parent{\r
    display: flex;\r
    justify-content: center;/* 水平居中 */\r
    align-items: center;/* 垂直居中 */\r
}\r
\`\`\`\r
\r
## grid实现\r
\r
\`\`\`css\r
.parent{\r
    display: grid;\r
    place-items: center;\r
}\r
\`\`\`\r
\`\`\`css\r
.parent{ \r
    display: grid;\r
    align-items: center;\r
    justify-content: center;\r
}\r
\`\`\`\r
\r
## 绝对定位 + Transform（经典方案）\r
\`\`\`css\r
.parent{\r
     position: relative;\r
}\r
.child{\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    transform: translate(-50%,-50%);\r
}\r
\`\`\`\r
## Line-Height 方案（单行文本）\r
\`\`\`css\r
.parent{\r
    height: 100px;\r
    line-height: 100px;\r
    text-align: center;\r
}\r
\`\`\`\r
## Table-Cell 方案（兼容性好）\r
\`\`\`css\r
.parent{\r
    display: table-cell;    /* 让元素像表格单元格一样表现 */\r
    vertical-align: middle; /* 表格单元格特有的垂直对齐属性 */\r
}\r
.child {\r
  display: inline-block;  /* 或 block */\r
}\r
\`\`\`\r
## Margin Auto + 绝对定位（已知尺寸）\r
\`\`\`css\r
.parent {\r
  position: relative;\r
}\r
\r
.child {\r
  position: absolute;\r
  top: 0;\r
  bottom: 0;\r
  left: 0;\r
  right: 0;\r
  margin: auto;\r
  width: 200px;  /* 需要指定宽度 */\r
  height: 100px; /* 需要指定高度 */\r
}\r
\`\`\``;export{n as default};
