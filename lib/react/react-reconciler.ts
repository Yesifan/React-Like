import { React$Elemnt } from '.'

export interface Fiber {
  dom: HTMLElement
  
  type?: string
  props:{
    children: React$Elemnt[]
  }

  parent?: Fiber
  child?: Fiber
  sibling?: Fiber
}