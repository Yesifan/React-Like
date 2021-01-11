# React Like

## 简介

我们使用一个类似`Fiber`的结构，他除了携带有自身的属性外还有指向父亲，儿子，下一个兄弟的指针。
``` typescript
interface Fiber {
  dom: HTMLElement
  
  type: string
  props: {
    [index:string]:any
    children: React$Elemnt[]
  }

  parent: Fiber
  child: Fiber
  sibling: Fiber
}
```
按着儿子，兄弟，叔叔(父亲的兄弟)的顺序使用`window.requestIdleCallback`API在游览器空闲的时候进行遍历。 每次遍历处理一个元素的时候便会生成一个`DOM`，然后插入到文档中。因为遍历是使用`window.requestIdleCallback`API进行的，可能由于游览器在处理其他任务而被中断，导致用户看到不完整的UI。

本库为了简单考虑，没有做任何性能上的优化。`Fiber`接口也是继承了`React$Elemnt`接口，以便于使用，使代码尽量简介易懂。

### 下一步
我们需要在遍历时仅计算出最终dom的形状并储存到内存中，在遍历完成时再进行一次性的渲染。

---

## 参考
[Build your own React](https://pomb.us/build-your-own-react/)