import { React$Elemnt } from '.'

export interface Fiber extends React$Elemnt{
  dom?: HTMLElement

  parent?: Fiber
  child?: Fiber
  sibling?: Fiber
}