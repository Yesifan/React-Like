import { React$Elemnt } from '.'

export interface Fiber extends React$Elemnt{
  containerInfo?: HTMLElement

  alternate?: Fiber //未来与现在的双向绑定

  parent?: Fiber
  child?: Fiber
  sibling?: Fiber
}

let workInProgress:Fiber

/**
 * 在wipFiber上生成新的fiber树
 */
function reconcileChildren(wipFiber:Fiber, elements:React$Elemnt[]){
  let index = 0
  let oldFiber = wipFiber.alternate?.child
  let prevSibling = null
​
  while (index < elements.length||oldFiber) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: wipFiber,
      dom: null,
    }
​
    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
​
    prevSibling = newFiber
    index++
  }
}


export function performUnitOfWork(fiber:Fiber){
  // 为children生成filber
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)

  // return next unit of work
  // 搜索下一个运行单元 首先常识 child,
  // 然后 sibling， 再然后 parent 的 sibling
  if (fiber.child) return fiber.child
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}