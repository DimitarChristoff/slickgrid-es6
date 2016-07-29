import { Grid } from '../src/';
import data from './example-data';

const columns = [
  {id: 'title', name: 'Title', field: 'title', maxWidth: 100, minWidth: 80},
  {id: 'duration', name: 'Duration', field: 'duration', resizable: false},
  {id: '%', name: '% Complete', field: 'percentComplete'},
  {id: 'start', name: 'Start', field: 'start'},
  {id: 'finish', name: 'Finish', field: 'finish'},
  {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
];

let grid;

const options = {
  enableCellNavigation: true,
  enableColumnReorder: !false,
  forceFitColumns: !true
};

export default {
  init: (id) => {
    grid = new Grid(id, data, columns, options);
  },
  title: 'Simple Example',
  route: '/example1'
};
