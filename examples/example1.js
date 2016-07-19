import { Grid } from '../src/';

const columns = [
  {id: 'title', name: 'Title', field: 'title'},
  {id: 'duration', name: 'Duration', field: 'duration'},
  {id: '%', name: '% Complete', field: 'percentComplete'},
  {id: 'start', name: 'Start', field: 'start'},
  {id: 'finish', name: 'Finish', field: 'finish'},
  {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
];

const options = {
  enableCellNavigation: true,
  enableColumnReorder: false
};

const data = [];
for (let i = 0; i < 500; i++) {
  data[i] = {
    title: 'Task ' + i,
    duration: '5 days',
    percentComplete: Math.round(Math.random() * 100),
    start: '01/01/2009',
    finish: '01/05/2009',
    effortDriven: (i % 5 == 0)
  };
}

export default {
  init: (id) => {
    new Grid(id, data, columns, options);
  },
  title: 'Simple Example',
  route: '/example1'
}
