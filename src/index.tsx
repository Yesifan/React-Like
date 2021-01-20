import React, { useState } from '../lib/react';
import { render } from '../lib/react/react-dom';

const container = document.getElementById("app")

const H2 = ({children}:any) => <h2>{children}</h2>

const Input2val = () => {
  const [ value, setValue ] = useState("world")
  const updateValue = ({target:{value}}) => setValue(value)
  return <div>
    <input onInput={updateValue} value={value} />
    {value.length%2 ? <H2>Hello {value}</H2> : ''}
  </div>
}

const rerender = () => {
  const element = (
    <div>
      <div>
      <Input2val/>
      </div>
    </div>
  )
  render(element, container)
}

rerender()
