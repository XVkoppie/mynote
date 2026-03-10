const n=`# 正则表达式\r
- 元字符：. (任意字符), \\d (数字), \\w (字母数字下划线), \\s (空白符), \\b (单词边界)。\r
\r
- 量词：* (0+), + (1+), ? (0或1), {n,m} (范围)。\r
\r
- 边界约束：^ (行首), $ (行尾)。\r
\r
- 修饰符 (Flags)：g (全局), i (忽略大小写), m (多行), y (粘滞), u (Unicode)。\r
\r
贪婪与非贪婪\r
\r
默认情况下正则都是贪婪的（尽可能多地匹配）。在量词后面加 ? 可以变成非贪婪。\r
\r
例如：'< div>test</ div>'.match(/<.*>/) 会匹配整个字符串，而 /<.*?>/ 只匹配 <div>。\r
\r
1. 匹配电话号码\r
\`\`\`js\r
const regex=/^1\\d{10}$/\r
const phone=13108486837\r
\r
if(regex.test(phone)){\r
    console.log("格式正确");\r
    \r
}\r
\`\`\`\r
\r
2. 匹配一个 座机号码。\r
\r
规则：由 3 到 4 位区号 + 连字符 - + 7 到 8 位电话号码。\r
\r
例子：010-12345678 或 0755-1234567\r
\r
难度：⭐\r
\`\`\`js\r
regex=/^\\d{3,4}-\\d{7,8}$/\r
\`\`\`\r
\`\`\`js\r
const regex=/^\\d{3,4}-\\d{7,8}$/\r
const str='010-12345678'\r
if(regex.test(str)){\r
    console.log("匹配成功");\r
}\r
\`\`\`\r
\r
\r
3. 匹配价格字符串。\r
\r
规则：必须以 ¥ 符号开头，后面跟数字，且最后必须以 .00 结尾。\r
\r
例子：¥100.00, ¥99.99 不匹配（因为结尾不是 .00）\r
\r
难度：⭐⭐\r
\`\`\`js\r
const regex=/^¥\\d+\\.00$/\r
\`\`\`\r
\`\`\`js\r
const regex=/^¥\\d+\\.00$/\r
const str='¥100.00'\r
if(regex.test(str)){\r
    console.log("匹配成功");\r
}\r
\`\`\`\r
\r
4. 匹配不包含数字的字符串。\r
\r
规则：字符串中完全不能出现 0-9 的任何数字，且长度至少为 3 位\r
\r
难度：⭐⭐⭐\r
\`\`\`js\r
const regex=/^[^0-9]{3,}$/\r
\`\`\`\r
5. 日期格式化。\r
\r
规则：将 2026-03-09 这种格式的日期，转换成 09/03/2026。\r
\r
难度：⭐⭐⭐⭐\r
\r
\`\`\`js\r
const regex=/^(\\d{4})-(\\d{2})-(\\d{2})$/\r
const str='2026-03-09'\r
const newDate=str.replace(regex,"$3/$2/$1")\r
console.log("🚀 ~ newDate:", newDate)\r
\`\`\`\r
\r
6.提取 URL 中的查询参数。\r
\r
规则：从 https://example.com?name=zhangsan&age=18 中提取出 name 对应的值（即 zhangsan）。\r
\r
难度：⭐⭐⭐⭐⭐\r
\r
6. 写一个校验规则，要求用户名符合以下条件：\r
\r
以字母开头。\r
\r
长度在 5 到 10 个字符之间。\r
\r
只能包含字母和数字。\r
\`\`\`js\r
regex=/^[a-z][0-9a-z]{4,9}$/i\r
\`\`\``;export{n as default};
