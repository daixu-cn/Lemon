原文地址：[https://daixu.cn/article/206669582159736832](https://daixu.cn/article/206669582159736832)

## 项目概览

这套初始化工程主要还是自己用的，搞这么一套空壳框架至少说不用每次开新项目的时候重头开始构建那些不需要变动的配置，如果每次搞来搞去都是原先差不多的配置属实很烦人，所以自己也决定配置一套比较全面的底层构建，内容包含以下方面：

- Vue 3 + Vite 4 + TypeScript + SCSS
- UI 组件库：Element-Plus（自定义主题配置）
- 数据管理：Pinia
- 代码规范：Eslint + Prettier
- Git 提交规范：Husky
- 工程配置：打包优化、打包混淆、别名配置、全局 SCSS、全局环境变量
- Axios 二次封装（简化请求、异常拦截）
- Icon 组建：阿里 Iconfont 图标库集成，配合组建实现颜色、大小修改
- GitHub 地址：[https://github.com/daixu-cn/init-vue3](https://github.com/daixu-cn/init-vue3)

## 安装依赖

```shell
npm install
```

## 运行项目

```shell
npm run start
```

## 修改主题颜色

主题色分为 SCSS 全局变量和 Element-Plus 主题色修改，找到以下对应的文件之后直接更改颜色即可，你也可以根据自己的需求拓展其他颜色：

修改 SCSS 全局变量找到这个文件：`/src/assets/style/scss/_variables.scss`

```scss
$color-primary: #74ebd5;
```

修改 Element-Plus 主题色找到这个文件：`/src/assets/style/scss/_element-plus-theme.scss`

```scss
@forward "element-plus/theme-chalk/src/common/var.scss" with (
  $colors: (
    "primary": (
      "base": #74ebd5
    )
  )
);
```

## 别名配置

别名的话默认配置了一个 `@` 表示 `src` 目录，如果你想修改或者增加的话需要修改两个文件：

根目录下面的`vite.config.ts`：

```typescript
resolve: {
  alias: {
   "@": resolve(__dirname, "src"),
   // 添加其他的别名
   "@scss": resolve(__dirname, "src/assets/style/scss"),
  }
}
```

根目录下面的`tsconfig.json`：

```json
"paths": {
  "@/*": ["src/*"],
  "@scss/*": ["src/assets/style/scss/*"],
}
```

`注意这两个文件的别名内容要保持同步。别出现多一个少一个的问题。`

## Pinia 使用

Pinia 我没有做什么特别的封装，因为官方自带的已经非常简单好用了，但是我还是保留了一个示例文件：`/src/store/user.ts` 需要的话可以参考一下。
另外集成了`数据持久化`插件，只需要在对应的 `Store` 上加一个 `persist: true` 的属性即可，上面的示例文件同样也可以找到该设置。

```javascript
import useUserStore from "@/store/user"

const userStore = useUserStore()
console.log(userStore) //自己去控制台看一下打印结果你就知道该怎么玩了
```

## 环境变量

你需要找到项目根目录下面的：`.env.development`、`.env.production` 这两个文件，前者是开发环境变量，后者是生产环境变量。

```shell
VITE_APP_BASE_API=http://localhost:3000
```

我在这两个文件中默认定义了一个 `VITE_APP_BASE_API` 变量，表示接口请求的前缀，你可以把后面那串 `http://localhost:3000` 改成你自己的请求接口前缀，或者你也可以额外加入自己需要的其他变量，但是你的变量必须是 `VITE_APP` 开头的变量。`修改完变量的文件最好重启一下。`

```javascript
// js中获取全局变量，VITE_APP_BASE_API 改成你的变量名
console.log(import.meta.env.VITE_APP_BASE_API)
```

## Axios 使用（接口调用）

我把 axios 二次封装的代码写在了 `/src/server` 文件夹下面，下面是使用的示例：

```vue
<script lang="ts" setup>
import http from "@/server"

async function getList() {
  try {
    const res = await http.post("/article/list", {
      page: 1,
      pageSize: 10
    })

    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

getList()
</script>
```

第一个参数是请求地址，第二个参数是请求参数，还有第三个参数可以穿 axios 原生的配置选项，其实感兴趣的话可以去看看这部分封装的源码，也是比较好理解的。

> 另外你有下面三个地方需要改动：

第一点：之前环境变量中提到的`.env.development`、`.env.production`这两个文件中的请求路径你需要改成自己的

第二点：找到`/src/server/http/index.ts`文件下面的`请求拦截器`相关代码，根据你自己的业务需求进行调整。

```typescript
// 请求拦截器
this.instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = sessionStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
```

第三点：找到`/src/server/http/index.ts`文件下面的`响应拦截器`相关代码，根据你自己的业务需求进行调整。我默认对错误的状态码进行消息提示，你需要注意你那边正确的状态码是多少，然后把`0`改成对应的状态码。

```typescript
// 响应拦截器
this.instance.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      ElMessage.error(response.data.msg)
    }
    return response.data
  },
  (error) => {
    return Promise.reject(ErrorStatus(error))
  }
)
```

## Icon 图标

icon 图标我个人感觉用 [Element-Plus](https://element-plus.org/zh-CN/component/icon.html) + [Iconfont](https://www.iconfont.cn/) 就足够用了，第一个我就不演示了，直接去看官网的使用介绍吧，重点是第二种的使用方式，Iconfont 用到了我自己封装的 SVG 组建，用 SVG 图标主要有后面几个好处：

1. 随意更换颜色
2. 随意更换大小
3. 大小不会失真
4. 使用简单

在 Iconfont 平台将需要的图标添加到 Iconfont 项目中，然后选择 Symbol 的方式生成一个链接，之后找到根目录下面的 `index.html` 将下面的代码替换掉：

```html
<script src="https://at.alicdn.com/t/c/font_4066504_4v025p56t69.js"></script>
```

`https后面的地址就是你刚才在 Iconfont 生成的链接。`

![](https://api.daixu.cn:443/upload/image/article/206731671377178624.png)

```vue
<template>
  <div id="Home">
    <Icon class="icon-google" color="red" size="50px" />
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/Icon.vue"
</script>
```

使用起来也超级简单，首先引入 `Icon.vue` 组建，该组件接收三个参数，其中 `class` 必传（不写的话啥也没有），该值就是你 Iconfont 项目中的代码，你可以直接鼠标移到图标上点击复制就行了，然后粘贴到 `class` 属性上面，至于 `color、size` 这两个值你可以根据自己需求调整，顾名思义嘛一个颜色一个大小，也可以不写。

![](https://api.daixu.cn:443/upload/image/article/206733954307481600.png)

## 代码提交（git）

我默认加入了`Husky`来控制代码提交的规范，如果你要是按照以往的 `git commit` 肯定是提交失败的，你需要在 `git add .` 之后去执行 `npm run commit` 来提交代码，此时你就可以根据列出的选项中去控制提交的类型及信息了

![](https://api.daixu.cn:443/upload/image/article/206735195980853248.png)

当然了，你也可以通过去修改根目录下面的 `.cz-config.js`、`commitlint.config.js` 文件去改变对应的中文描述。

## 项目打包

这个最简单啦！我已经把配置好了相关的 gzip 压缩、混淆、移除 `console`、文件抽离等优化，你只需要执行下面的指令就可以开始快乐打包了：

```shell
npm run build
```
