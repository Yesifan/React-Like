import React from '../lib/react';
import { render } from '../lib/react/react-dom';

const container = document.getElementById("app")

const updateValue = (e:any) => rerender(e.target.value)

const H2 = ({children}:any) => <h2>{children}</h2>

const Input2val = ({value}:{value:string}) => 
  <div>
    <input onInput={updateValue} value={value} />
    <H2>Hello {value}</H2>
  </div>


const rerender = (value?:string) => {
  const element = (
    <div>
      <Input2val value={value}/>
    </div>
  )
  render(element, container)
}

rerender("World")
