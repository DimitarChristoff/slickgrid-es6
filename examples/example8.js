import {Grid, Formatters, Editors, Data} from '../src/';
import data from './example-data';

const dv = new Data.DataView();
dv.setItems(data);

let grid;

const columns = [
  {id: 'title', name: 'Title', field: 'title', maxWidth: 100, minWidth: 80},
  {id: 'duration', name: 'Duration', field: 'duration', resizable: false},
  {id: '%', name: '% Complete', field: 'percentComplete'},
  {id: 'start', name: 'Start', field: 'start', width: 300},
  {id: 'finish', name: 'Finish', field: 'finish', width: 300},
  {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
];

const options = {
  editable: true,
  enableAddRow: true,
  enableCellNavigation: true,
  asyncEditorLoading: true,
  forceFitColumns: false,
  autoEdit: false,
  topPanelHeight: 25,
  frozenColumn: 1
};

export default {
  init: id =>{
    grid = new Grid(id, dv, columns, options);
    return grid;
  },
  route: '/example8',
  title: 'Example 8: Frozen Row'
};
