import { React$Elemnt } from '.'
import { updateContainer } from './react-reconciler'

const isEvent = (key:string) => key.startsWith("on")
const isProperty = (key:string) =>
  key !== "children" && !isEvent(key)
const isGone = (next:any) => (key:string) => !(key in next)
const isNew = (prev:any, next:any) => (key:string) => prev[key] !== next[key]
export function updateDom(dom:HTMLElement|Text, prevProps:any={}, nextProps:any) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
  .filter(isEvent)
  .filter(key => isGone(nextProps)(key)||isNew(prevProps, nextProps)(key))
  .map(name => [name.toLowerCase().substring(2), prevProps[name]])
  .forEach(([event, callback]) => dom.removeEventListener(event, callback))

  // Add event listeners
  Object.keys(nextProps)
  .filter(isEvent)
  .filter(isNew(prevProps, nextProps))
  .map(name => [name.toLowerCase().substring(2), nextProps[name]])
  .forEach(([event, callback]) => dom.addEventListener(event, callback))

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach(name => dom[name] = "")

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => dom[name] = nextProps[name])
}

export function createDom(element:React$Elemnt):HTMLElement|Text{
  const { type, props:{ children, ...props} } = element;
    const dom = type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(type as string)
    updateDom(dom, {}, props)

    return dom
}


export function render(element:React$Elemnt, container: HTMLElement){
  updateContainer(element, container)
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