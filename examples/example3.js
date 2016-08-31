import { FrozenGrid as Grid, Formatters, Editors, Data } from '../src/';
import { CellSelectionModel, CellRangeSelector, CellCopyManager } from '../plugins/';
import Clipboard from 'clipboard';
import data from './example-data';

function requiredFieldValidator(value){
  if (value == null || value == undefined || !value.length){
    return {valid: false, msg: 'This is a required field'};
  } else {
    return {valid: true, msg: null};
  }
}

let grid;
const flatPickrOptions = {
  dateFormat: 'd/m/Y', // see https://chmln.github.io/flatpickr/#options,
  parseDate: function(input){
    var split = input.split('/');
    return new Date(split[1] + '-' + split[0] + '-' + split[2]);
  }
};

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
  {id: 'start', name: 'Start', field: 'start', minWidth: 60, editor: Editors.Date, options: {
    date: flatPickrOptions
  }},
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

    // const selector = new CellRangeSelector();
    // selector.onCellRangeSelected.subscribe((event, {range}) => {
    //   console.log(range);
    // });
    // grid.registerPlugin(selector);

    const copyManager = new CellCopyManager();
    grid.registerPlugin(copyManager);


    grid.onCopy.subscribe(function(slickEvent, event){
      console.log(event);
    })

    copyManager.onCopyCells.subscribe((e, {ranges, event}) => {
      console.log(event);

      const { fromCell, fromRow, toCell, toRow } = ranges.pop();

      const final = [];
      for (let j = fromRow; j <= toRow; j++){
        const rowData = [];
        for (let i = fromCell; i <= toCell; i++){
          let val = data[j][columns[i].field];
          rowData.push(val)
        }
        final.push(rowData.join(','));
      }

      console.log(final);
    });

    // grid.onKeyDown.subscribe()

    grid.onAddNewRow.subscribe(function(e, args){
      const item = args.item;
      grid.invalidateRow(data.length);
      data.push(item);
      grid.updateRowCount();
      grid.render();
    });

    return grid;
  },
  route: '/example3',
  title: 'Example 3: Editing'
};
