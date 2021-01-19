import React from '../lib/react';
import { render } from '../lib/react/react-dom';

const container = document.getElementById("app")

const updateValue = (e:any) => rerender(e.target.value)

const Input2val = ({value}:{value:string}) => 
  <div>
  <input onInput={updateValue} value={value} />
  <h2>Hello {value}</h2>
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
