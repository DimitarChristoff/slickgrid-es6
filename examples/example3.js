import {Grid, Formatters, Editors} from '../src/';
import CellSelectionModel from '../plugins/slick.cellselectionmodel';

function requiredFieldValidator(value){
  if (value == null || value == undefined || !value.length){
    return {valid: false, msg: 'This is a required field'};
  } else {
    return {valid: true, msg: null};
  }
}

let grid;
const data = [];
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
    formatter: Formatters.PercentCompleteBar,
    editor: Editors.PercentComplete
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

for (let i = 0; i < 500; i++){
  const d = (data[i] = {});

  d['title'] = 'Task ' + i;
  d['description'] = 'This is a sample task description.\n  It can be multiline';
  d['duration'] = '5 days';
  d['percentComplete'] = Math.round(Math.random() * 100);
  d['start'] = '01/01/2009';
  d['finish'] = '01/05/2009';
  d['effortDriven'] = (i % 5 == 0);
}

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
}
