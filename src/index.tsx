import React from '../lib/react';
import { render } from '../lib/react/react-dom';

const container = document.getElementById("app")

const updateValue = (e:any) => rerender(e.target.value)

const rerender = (value?:string) => {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  )
  render(element, container)
}

rerender("World")
