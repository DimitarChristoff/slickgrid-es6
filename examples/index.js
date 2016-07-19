import './examples.less';


// all examples we need
import Example1 from './example1.js';

//todo: behind router
console.log(Example1.title);
document.title = Example1.title;
Example1.init('#myGrid');
