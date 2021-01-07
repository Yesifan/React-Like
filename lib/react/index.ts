export type React$Elemnt = ReactObject|string

interface ReactObject {
  type: string,
  props: {
    children?: React$Elemnt
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
      children
    },
  }
}