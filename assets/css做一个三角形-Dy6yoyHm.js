const n=`# css画三角形\r
clip-path:polygon\r
\`\`\`html\r
<div class="parent">\r
    <div class="son">\r
\r
    </div>\r
</div>\r
\`\`\`\r
\r
\`\`\`css\r
<style>\r
.parent{\r
    width: 300px;\r
    height: 300px;\r
    border: 1px solid #000;\r
}\r
.son{\r
    width: 100%;\r
    height: 100%;\r
    background: #000;\r
    clip-path:polygon(50% 0,100% 100%,0 100%)\r
    /* (x y) */\r
}\r
\`\`\``;export{n as default};
