import { React$Elemnt } from '.';
import { performUnitOfWork, Fiber } from './react-reconciler';

let wipRoot:Fiber;
let currentRoot:Fiber;
let nextUnitOfWork:Fiber;

function createDom(element:React$Elemnt){
  if(element.type === 'TEXT_ELEMENT') return element.props.nodeValue

  const { type, props:{ children, ...props} } = element;
  const node = document.createElement(type);

  Object.keys(props).forEach(key => {
    node[key] = props[key]
  })

  return node
}

function commitWork(fiber:Fiber, parent:HTMLElement){
  if (!fiber) {
    return
  }
  const dom = createDom(fiber)
  parent.append(dom)
  commitWork(fiber.child, dom)
  commitWork(fiber.sibling, dom)
}

function commitRoot(){
  commitWork(wipRoot.child, wipRoot.containerInfo)
  currentRoot = wipRoot
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

export function render(element:React$Elemnt, container: HTMLElement){
  wipRoot = {
    containerInfo: container,
    props: {
      children: [element]
    },
    alternate: currentRoot //link old fiber
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