# React Like

## 简介

我们使用一个类似`Fiber`的结构，他除了携带有自身的属性外还有指向父亲，儿子，下一个兄弟的指针。  
经过迭代我们在fiber中新增了几个属性
``` typescript
interface Fiber {
  dom: HTMLElement

  stateNode?:HTMLElement|Text //指向之前或现在的DOM [1.2.0]
  alternate?: Fiber //未来与现在的双向绑定 [1.2.0]
  
  type: string
  props: {
    [index:string]:any
    children: React$Elemnt[]
  }

  parent: Fiber
  child: Fiber
  sibling: Fiber

  effectTag?: string // 更新标注 [1.2.0]
  deletions?: Fiber[] // 待删除待子节点 [1.2.0]
}
```
按着儿子，兄弟，叔叔(父亲的兄弟)的顺序使用`window.requestIdleCallback`API在游览器空闲的时候进行遍历。  
~~每次遍历处理一个元素的时候便会生成一个`DOM`，然后插入到文档中。因为遍历是使用`window.requestIdleCallback`API进行的，可能由于游览器在处理其他任务而被中断，导致用户看到不完整的UI。~~  
将`performUnitOfWork`中的创建dom方法移除,并移到reconciler.js中。添加`commitWork`方法，在fiber树创建完成后，遍历fiber树，将dom绑定到`fiber.stateNode`,并添加到文档中。  
从`performUnitOfWork`中摘出`performUnitOfWork`专门生成fiber树，并将旧fiber绑定到`fiber.alternate`（如果有）。然后根据更新类型在`fiber.effectTag`上进行标注。通过`commitWork`进行不同形式的更新。


本库为了简单考虑，没有做任何性能上的优化。`Fiber`接口也是继承了`React$Elemnt`接口，以便于使用，使代码尽量简介易懂。

### 下一步
Function Components

## 参考
[Build your own React](https://pomb.us/build-your-own-react/)
