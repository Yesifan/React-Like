import { updateContainer, resolveDispatcher } from './react-reconciler';

type createElement = (props?:any) => React$Elemnt;
export interface React$Elemnt {
  type?: string|createElement,
  props: {
    children: React$Elemnt[]
    [index:string]:any
  }
}

export function useState<T>(initial:T):[T, Function]{
  const [fiber, index] = resolveDispatcher()
  const oldHook = fiber.alternate?.hooks && fiber.alternate.hooks[index];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }

  const actions = oldHook ? oldHook.queue : []

  actions.forEach(action => {
    hook.state = action
  })

  const setState = (action:any) => {
    hook.queue.push(action)
    updateContainer()
  }
​
  fiber.hooks.push(hook)
  return [hook.state, setState]
}

export function createElement(
  type:string|createElement,
  props?:any,
  ...children:React$Elemnt[]
): React$Elemnt{
  return {
    type,
    props: {
      ...props,
      children: children.flat().map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    },
  }
}

function createTextElement(text:string) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

export default {
  createElement
}