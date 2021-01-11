import { React$Elemnt } from '.';
import { Fiber } from './react-reconciler';

let wipRoot:Fiber;
let nextUnitOfWork:Fiber;

function commitWork(fiber:Fiber){
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.append(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot(){
  commitWork(wipRoot.child)
  wipRoot = null
}

function wookLoop(){
  if(nextUnitOfWork){
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    window.requestIdleCallback(wookLoop)
  }
  if(!nextUnitOfWork && wipRoot){
    commitRoot()
  }
}


function performUnitOfWork(fiber:Fiber){
  // add dom node
  if (!fiber.dom) fiber.dom = createDom(fiber)

  // 为children生成filber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  
  while (index < elements.length) {
    const element = elements[index]
  ​
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    // 第一个子节点添加为父节点的子节点
    if (index === 0) {
      fiber.child = newFiber
    } else {// 之后的子节点添加为上一个节点的兄弟节点
      prevSibling.sibling = newFiber
    }
​
    prevSibling = newFiber
    index++
  }

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

function createDom(element:React$Elemnt){
  if(element.type === 'TEXT_ELEMENT') return element.props.nodeValue

  const { type, props:{ children, ...props} } = element;
  const node = document.createElement(type);

  Object.keys(props).forEach(key => {
    node[key] = props[key]
  })

  return node
}

export function render(element:React$Elemnt, container: HTMLElement){
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
  }
  nextUnitOfWork = wipRoot
  wookLoop()
}

//#region window.requestIdleCallback
type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

//#endregion