import { createElement } from '../lib/react';
import { render } from '../lib/react/react-dom';

const element = createElement(
  "div",
  { id: "foo" },
  'aaaaa',
  createElement("div", null, "bar"),
  createElement("span")
)

console.log(element)

const container = document.getElementById("app")

render(element, container)