import React from '../lib/react';
import { render } from '../lib/react/react-dom';

const element = <div>
  aaa
  <button>aaaa</button>
</div>

const container = document.getElementById("app")

render(element, container)