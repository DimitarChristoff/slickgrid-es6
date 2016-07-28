import {Grid, Formatters, Editors} from '../src/';
import CellSelectionModel from '../plugins/slick.cellselectionmodel/slick.cellselectionmodel';
import data from './example-data';

function requiredFieldValidator(value){
  if (value == null || value == undefined || !value.length){
    return {valid: false, msg: 'This is a required field'};
  } else {
    return {valid: true, msg: null};
  }
}

let grid;
const columns = [
  {
    id: 'title',
    name: 'Title',
    field: 'title',
    width: 120,
    cssClass: 'cell-title',
    editor: Editors.Text,
    validator: requiredFieldValidator
  },
  {id: 'desc', name: 'Description', field: 'description', width: 100, editor: Editors.LongText},
  {id: 'duration', name: 'Duration', field: 'duration', editor: Editors.Text},
  {
    id: '%',
    name: '% Complete',
    field: 'percentComplete',
    width: 80,
    resizable: false,
    formatter: Formatters.PercentCompleteBar
  },
  {id: 'start', name: 'Start', field: 'start', minWidth: 60, editor: Editors.Date},
  {id: 'finish', name: 'Finish', field: 'finish', minWidth: 60, editor: Editors.Date},
  {
    id: 'effort-driven',
    name: 'Effort Driven',
    width: 80,
    minWidth: 20,
    maxWidth: 80,
    cssClass: 'cell-effort-driven',
    field: 'effortDriven',
    formatter: Formatters.Checkmark,
    editor: Editors.Checkbox
  }
];

const options = {
  editable: true,
  enableAddRow: true,
  enableCellNavigation: true,
  asyncEditorLoading: false,
  autoEdit: false
};

export default {
  init: id => {
    grid = new Grid(id, data, columns, options);

    grid.setSelectionModel(new CellSelectionModel());

    grid.onAddNewRow.subscribe(function(e, args){
      const item = args.item;
      grid.invalidateRow(data.length);
      data.push(item);
      grid.updateRowCount();
      grid.render();
    });
  },
  route: '/example3',
  title: 'Example 3: Editing'
};
