import { React$Elemnt } from '.'

export class Fiber{
  containerInfo:HTMLElement
  
  type:string
  elementType:string

  return:Fiber
  child:Fiber
  sibling:Fiber

  constructor(containerInfo:HTMLElement, element:React$Elemnt){
    this.containerInfo = containerInfo

    this.elementType = null;
    this.type = null;

    this.return = null; // 指向当前节点的父元素
    this.child = null; // 指向当前节点的第一个子元素
    this.sibling = null; // 指向同级的下一个兄弟节点
  }
}