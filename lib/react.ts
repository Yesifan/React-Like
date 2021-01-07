export interface React$Elemnt {
  type: string,
  props: {
    [index:string]:string|any
  }
}

export function render(element:React$Elemnt, container: HTMLElement){​
  const node = document.createElement(element.type)
  node["title"] = element.props.title
  ​
  const text = document.createTextNode("")
  text["nodeValue"] = element.props.children
  ​
  node.appendChild(text)
  container.appendChild(node)
}