const n=`# 原型是什么
1. 原型可以解决什么问题

对象共享属性和共享方法

2. 谁有原型

函数拥有:prototype

对象拥有:__proto__

3. 对象查找属性或方法的顺序

- 现在对象本身查找
- 到构造函数查找
- 到原型对象查找(__proto__)
- 到构造函数原型上查找(prototype)
- 到当前原型的原型中查找(Object.prototype)

4. 原型链
- 是什么:就是把原型串联起来
- 原型链的顶端是null
`;export{n as default};
