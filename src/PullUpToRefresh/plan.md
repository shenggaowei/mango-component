# 上拉刷新组件

## 需求

```html
<div class="box">
  <div class="content"></div>
</div>
```

## 方案

content 容器为一个长列表，当滚动条滚动到底部的时候，自动进行加载。

box-offsetHeight + box -scrollTop = box.scrollHeight

### 兼容

1. 在普通的盒子中
2. documentElement 的滚动

## 问题

1. 到底之后，处于加载中，再次滚动滚动条，会重新触发下拉到底事件，需要进行处理。

添加 loading 属性，true 就移除滚动事件，false 就添加滚动事件
