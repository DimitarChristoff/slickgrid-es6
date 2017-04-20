import React                          from 'react';
import ReactDOM                       from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Menu from './components/Menu'
import Grid from './components/Grid'

import './examples.less';


const examples = [];
let examplesCount = 9;

let  count = 1;
while (count <= examplesCount){
  const example = require(`./example${count}.js`).default;
  examples.push(example)
  count++;
}


ReactDOM.render(<BrowserRouter>
  <div className='columns'>
    <Menu examples={examples} />
    <Route path='/examples/:example' render={({match}) => <Grid example={examples[match.params.example]} />} />
  </div>
</BrowserRouter>, document.querySelector('.root'));

