import {FrozenGrid as Grid, Data} from '../src/';
import data from './example-data';
import $ from 'jquery'

const dv = new Data.DataView();
let value = 0
dv.setFilter(({percentComplete}) => percentComplete > value)
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
  inlineFilter: !true,
  frozenColumn: 1
};

export default {
  init: id => {
    const slider = $(`<input value="${value}" type="range" />`)
    grid = new Grid(id, dv, columns, options);

    slider.on('change', ({target}) => {
      value = Number(target.value);
      dv.refresh();
    });

    dv.onRowCountChanged.subscribe(() => {
      grid.updateRowCount();
      grid.render();
    });

    dv.onRowsChanged.subscribe((e, {rows}) => {
      grid.invalidateRows(rows);
      grid.render();
    });

    slider.appendTo($('nav.nav'))

    return grid;
  },
  route: 'example8',
  title: 'Example 8: DataFilter frozen column'
};
