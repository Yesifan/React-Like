export interface React$Elemnt {
  type?: string,
  props: {
    children: React$Elemnt[]
    [index:string]:any
  }
}

export function createElement(
  type:string,
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

function createTextElement(text) {
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