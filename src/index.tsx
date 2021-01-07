import React from '../lib/react';
import { render } from '../lib/react/react-dom';

// 先处理子 没有子则处理兄弟 没有兄弟则返回父
const element = <div className="root">
  <h1>
    <p />
    <a />
  </h1>
  <h2 />
</div>

const container = document.getElementById("app")

render(element, container)