import { Grid, Formatters } from '../src/';
import data from './example-data';

function formatter(row, cell, value, columnDef, dataContext) {
  return value;
}

let grid;
const columns = [
  {id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", formatter: formatter},
  {id: "duration", name: "Duration", field: "duration"},
  {id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Formatters.PercentCompleteBar},
  {id: "start", name: "Start", field: "start", minWidth: 60},
  {id: "finish", name: "Finish", field: "finish", minWidth: 60},
  {id: "effort-driven", name: "Effort Driven", sortable: false, width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Formatters.Checkmark}
];

const options = {
  editable: false,
  enableAddRow: false,
  enableCellNavigation: true,
  enableColumnReorder: false
};

export default {
  init: id => {
    grid = new Grid(id, data, columns, options);
  },
  title: 'Example 2: Formatters',
  route: '/example2'
}
