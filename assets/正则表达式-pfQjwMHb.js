const n=`# 正则表达式\r
- 元字符：. (任意字符), \\d (数字), \\w (字母数字下划线), \\s (空白符), \\b (单词边界)\r
\r
- 量词：* (0+), + (1+), ? (0或1), {n,m} (范围)\r
\r
- 边界约束：^ (行首), $ (行尾)\r
\r
- 结尾修饰符 (Flags)：g (全局), i (忽略大小写), m (多行), y (粘滞), u (Unicode)\r
\r
+ g (Global)：全局找，不只找第一个\r
\r
+ i (Ignore Case)：忽略大小写（比如 /a/i 能匹配 A）\r
\r
+ m (Multiline)：多行匹配（如果你的字符串有很多换行符，加上它能让 ^ 和 $ 匹配每一行的开头和结尾）\r
贪婪与非贪婪\r
\r
默认情况下正则都是贪婪的（尽可能多地匹配）。在量词后面加 ? 可以变成非贪婪\r
\r
例如：'< div>test</ div>'.match(/<.*>/) 会匹配整个字符串，而 /<.*?>/ 只匹配 < div>\r
\r
\r
## 1. \`match()\`：从字符串里“拿东西”\r
\r
\`match\` 是**字符串（String）的方法。它的作用是：拿着正则去字符串里找，把找到的东西带回来**\r
\r
* **语法**：\`字符串.match(正则)\`\r
\r
\`\`\`javascript\r
const text = "我买了 3 个苹果和 5 个香蕉";\r
const res = text.match(/\\d+/g); \r
\r
console.log(res); // 输出: ["3", "5"] —— 它把数字给你带回来了\r
\r
\`\`\`\r
\r
> **注意**：如果不加 \`g\`，它只带回第一个找到的，并附赠一些详细信息（比如位置）；加了 \`g\`，它就只带回所有匹配到的内容。\r
\r
## 2. \`test()\`：检查“对不对”\r
\r
这是面试最常用的，它是**正则（RegExp）的方法。它不关心内容是什么，只关心“有没有”**。\r
\r
* **语法**：\`正则.test(字符串)\`\r
\r
\`\`\`javascript\r
const tel = "13812345678";\r
const isPhone = /^1\\d{10}$/.test(tel);\r
\r
console.log(isPhone); // 输出: true 或 false —— 就像一个安检员\r
\r
\`\`\`\r
\r
## 3. \`replace()\`：用来“换掉它”\r
\r
这也是**字符串**的方法，配合正则超级强大。\r
\r
\`\`\`javascript\r
const msg = "这个混蛋！";\r
const cleanMsg = msg.replace(/混蛋/g, "**");\r
\r
console.log(cleanMsg); // 输出: "这个**！"\r
\r
\`\`\`\r
\r
\r
| 方法 | 属于谁 | 作用 | 返回值 |\r
| --- | --- | --- | --- |\r
| **\`test()\`** | \`RegExp\` | 校验是否匹配 | \`true\` / \`false\` |\r
| **\`match()\`** | \`String\` | 提取匹配内容 | 数组（匹配到的内容） |\r
| **\`replace()\`** | \`String\` | 替换匹配内容 | 替换后的新字符串 |\r
| **\`split()\`** | \`String\` | 按正则切割字符串 | 切割后的数组 |\r
\r
# 练习\r
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
\`\`\`\r
7. 提取所有数字\r
\r
假设你拿到的原始数据是："订单号: 20260310, 总金额: 999元, 优惠券: 50元"。\r
\r
你需要把所有的数字（20260310, 999, 50）全部提取出来，组成一个数组。\r
\`\`\`js\r
const str='订单号: 20260310, 总金额: 999元, 优惠券: 50元'\r
const regex=/\\d+/g\r
const res=str.match(regex)\r
console.log(res);\r
//['20260310', '999', '50']\r
\`\`\`\r
\r
8. 切割成数组\r
把字符串 "apple, orange; banana" 里的水果，\r
\r
通过正则（匹配逗号或分号）切割成一个数组\r
\`\`\`js\r
const str='apple, orange; banana'\r
const regex=/[,;]/g\r
const res=str.split(regex)\r
\`\`\`\r
\r
9.  "张三123李四456王五",如果我想把名字提取出来\r
\r
\`\`\`js\r
const str='张三123李四456王五'\r
const regex=/\\d+/g\r
const res=str.split(regex)\r
\`\`\`\r
\r
10. 清洗多余的空格\r
\r
用户在输入框里乱敲空格，比如 "张三    李四  王五"\r
\r
把这些不规整的空格当成“刀”，切出名字\r
\`\`\`js\r
const str='张三    李四  王五'\r
const regex=/\\s+/g\r
const res=str.split(regex)\r
\`\`\`\r
\r
11. 隐藏手机号中间四位（进阶：替换）\r
场景：为了隐私，要把 13812345678 变成 138****5678\r
法一\r
\`\`\`js\r
const str='13812345678'\r
const regex=/(\\d{3})\\d{4}(\\d{4})/g\r
const res=str.replace(regex,"$1****$2")\r
\`\`\`\r
法二\r
\`\`\`js\r
const str = '13812345678';\r
const res = str.replace(/^(\\d{3})\\d{4}/, '$1****');\r
\`\`\`\r
法三\r
\`\`\`js\r
const str = '13812345678';\r
// 截取前3位 + 星号 + 截取后4位\r
const res = str.slice(0, 3) + '****' + str.slice(7);\r
\`\`\``;export{n as default};
