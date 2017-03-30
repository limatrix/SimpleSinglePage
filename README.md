# SimpleSinglePage

一个简单的单页插件

### 使用方法
在head标签内引入lstable.js
``` javascript
<script src='simplesinglepage.js'></script>
```

并调用`new SimpleSinglePage("container");`, 参数为用来加载页面的容器

**页面声明**
``` javascript
 <script type="text/html" id="/question/list" default="true" callback="displayQuestionList">
    <div>
        <div></div>
    </div>
</script>
```
- 类型采用text/html
- id会被用作URL的HASH部分
- default属性用来表示默认显示的内容
- callback函数在加载HTML后调用

**参数**
https://www.abc.com/index.html#/question/edit/10

其中/question/edit是修改问题页面的id, 10代表question序号. id后面的部分作为callback的参数. 参数间以/分割.

### 其他



