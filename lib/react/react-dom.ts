import { React$Elemnt } from '.';

let workInProgress = null;

export function render(element:React$Elemnt, container: HTMLElement){
  const node = beginWork(element);
  container.append(node)
}

function beginWork(element:React$Elemnt){
  if(typeof element === 'object'){
    const { type, props:{ children, ...props} } = element;
    const node = document.createElement(type);
    Object.keys(props).forEach(key => {
      node[key] = props[key]
    })
    if(children instanceof Array){
      const nodes = children.map(child => beginWork(child))
      node.append(...nodes)
    }
    return node
  }else{
    return element
  }
}