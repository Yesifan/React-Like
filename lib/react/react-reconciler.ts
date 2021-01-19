import { React$Elemnt } from '.'

export interface Fiber extends React$Elemnt{
  containerInfo?: HTMLElement

  stateNode?:HTMLElement|Text
  alternate?: Fiber //未来与现在的双向绑定

  parent?: Fiber
  child?: Fiber
  sibling?: Fiber
  effectTag?: string
  deletions?: Fiber[]
}

export class Fiber {
  constructor({type, props}:React$Elemnt){
    this.type = type
    this.props = props
    if(type instanceof Function){
      const element = type(props)
      this.type = element.type
      this.props = element.props
    }
  }
}

/**
 * 在wipFiber上生成新的fiber树
 */
function reconcileChildren(fiber:Fiber){
  let index = 0
  let prevSibling = null

  let oldFiber = fiber.alternate?.child
  const elements = fiber.props.children
​
  // 为孩子生成fiber
  while (index < elements.length||oldFiber) {
    const element = elements[index]
    const newFiber = new Fiber(element);

    const sameType = newFiber?.type === oldFiber?.type
    if (sameType) {
      newFiber.parent = fiber
      newFiber.alternate = oldFiber
      newFiber.stateNode = oldFiber.stateNode
      newFiber.effectTag = "UPDATE"
    }
    if (element && !sameType) {
      newFiber.parent = fiber
      newFiber.effectTag = "PLACEMENT"
    }
    if (oldFiber && !sameType) {
      deleteChild(fiber, oldFiber)
    }

    if (!fiber.child) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
​
    oldFiber = oldFiber?.sibling
    prevSibling = newFiber
    index++
  }

  function deleteChild(returnFiber: Fiber, childToDelete: Fiber) {
    const deletions = returnFiber.deletions;
    if (!deletions) {
      returnFiber.deletions = [childToDelete];
    } else {
      deletions.push(childToDelete);
    }
  }
}


export function performUnitOfWork(fiber:Fiber){
  // 为children生成filber
  reconcileChildren(fiber)

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