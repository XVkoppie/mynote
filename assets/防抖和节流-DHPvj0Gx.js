const n=`# 防抖和节流\r
概念,核心逻辑,生活比喻,常见场景\r
## 防抖 (Debounce)\r
\r
只执行最后一次。在动作停止后的等待时间内不再触发，才执行。\r
\r
电梯门：有人进来门就重新计时，直到没人进了才关门。\r
\r
搜索框输入（用户输完才发请求）、窗口缩放 (resize)、文本编辑器实时保存\r
\r
实现思路：定时器\r
\`\`\`js\r
let timerId=null\r
const fn=()=>{\r
if(timerId){\r
    clearTimeout(timerId)\r
}\r
timerId=setTimeout(()=>{\r
    console.log("防抖");\r
},1000)\r
}\r
\`\`\`\r
\`\`\`js\r
function debounce(fn, delay) {\r
  let timer = null; // 放在外面，闭包持有\r
  return function() {\r
    if (timer) clearTimeout(timer); // 还没到时间又动了？把上一个闹钟取消\r
    timer = setTimeout(() => {\r
      fn.apply(this, arguments);\r
    }, delay); // 重新定个闹钟\r
  };\r
}\r
\`\`\`\r
\`\`\`js\r
const btn=document.getElementById('btn')\r
const debounce=(fn,delay)=>{\r
    let timer=null\r
    return function(...args){\r
        if(timer)clearTimeout(timer)\r
        timer=setTimeout(()=>{\r
            fn.apply(this,args)\r
        },delay)\r
    }   \r
}\r
\r
btn.addEventListener('click',debounce(()=>{console.log("点击了");},1000))\r
\`\`\`\r
## 节流 (Throttle)\r
\r
控制执行频率。在规定时间内，无论触发多少次，只执行一次。\r
\r
红绿灯：不管路口排了多少车，每隔一段时间才放行一波。\r
\r
滚动加载 (scroll)、抢购点击、鼠标移动 (mousemove)、resize事件、scroll事件、发送验证码\r
\r
\`\`\`js\r
let timerId=null\r
 const fn=()=>{\r
    if(timerId){\r
        return\r
    }\r
    timerId=setTimeout(()=>{\r
        console.log("节流");\r
        timerId=null\r
    },100)\r
}\r
\`\`\`\r
\`\`\`js\r
function throttle(fn, delay) {\r
  let timer = null; // 放在外面\r
  return function() {\r
    if (timer) return; // 闹钟还在走呢，别吵我，直接回家\r
    timer = setTimeout(() => {\r
      fn.apply(this, arguments);\r
      timer = null; // 事情办完了，把闹钟状态重置，下次动作才能进得来\r
    }, delay);\r
  };\r
}\r
\`\`\``;export{n as default};
