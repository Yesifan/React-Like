import { render, React$Elemnt } from '../lib/react';

const element:React$Elemnt = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}

const container = document.getElementById("app")

render(element, container)