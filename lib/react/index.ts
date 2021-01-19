type createElement = (props?:any) => React$Elemnt;
export interface React$Elemnt {
  type?: string|createElement,
  props: {
    children: React$Elemnt[]
    [index:string]:any
  }
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
      children: children.map(child =>
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