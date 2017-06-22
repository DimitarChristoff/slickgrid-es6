import './example9.less';
import {FrozenGrid as Grid, Data} from '../src/';
import $ from 'jquery';
import {makeArray, dateFormatter} from './lib/utils';
import Faker from 'faker'

const parents = [];
let indent = 0;
const data = makeArray(500, id =>{

  let parent;
  if (Math.random() > 0.8 && id){
    indent++;
    parents.push(id - 1);
  } else if (Math.random() < 0.3 && indent > 0){
    indent--;
    parents.pop();
  }

  if (parents.length > 0){
    parent = parents[parents.length - 1];
  } else {
    parent = null;
  }

  const start = Faker.date.past(),
        finish = Faker.date.future(),
        diff =  Math.floor((finish - start) / (1000*60*60*24));

  return {
    id,
    indent,
    parent,
    title: `Task ${id}`,
    description: Faker.lorem.paragraph(),
    duration: `${diff} days`,
    percentComplete: Math.round(Math.random() * 100),
    effortDriven: (id % 5 == 0),
    start,
    finish
  }
});

const dv = new Data.DataView();
let value = 0;
dv.beginUpdate();
dv.setFilter(item =>{
  if (item.percentComplete < value){
    return false;
  }

  if (item.parent != null){
    let parent = data[item.parent];
    while (parent){
      if (parent._collapsed || parent.percentComplete < value){
        return false;
      }
      parent = data[parent.parent];
    }
  }
  return true;
});
dv.setItems(data);
dv.endUpdate()

function percentCompleteSort(a, b){
  return a.percentComplete - b.percentComplete;
}

const taskNameFormatter = (row, cell, value, columnDef, dataContext) =>{
  value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const spacer = `<span style='display:inline-block;height:1px;width:${15 * dataContext.indent}px'></span>`;
  const idx = dv.getIdxById(dataContext.id);
  if (data[idx + 1] && data[idx + 1].indent > data[idx].indent){
    const className = dataContext._collapsed ? 'fa-plus-square-o' : 'fa-minus-square-o'
    return `${spacer} <i class='toggle fa fa-fw ${className}'></i> ${value}`;
  } else {
    return `${spacer} ${value}`;
  }
};

let grid;

const columns = [
  {id: 'title', name: 'Title', field: 'title', width: 200, maxWidth: 320, formatter: taskNameFormatter},
  {id: 'duration', name: 'Duration', field: 'duration'},
  {id: '%', name: '% Complete', field: 'percentComplete'},
  {id: 'start', name: 'Start', field: 'start', width: 100, formatter: dateFormatter},
  {id: 'finish', name: 'Finish', field: 'finish', width: 100, formatter: dateFormatter},
  {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
];

const options = {
  rowHeight: 32,
  editable: true,
  enableAddRow: !true,
  enableCellNavigation: true,
  asyncEditorLoading: false,
  autoEdit: false,
  headerRowHeight: 32,
  explicitInitialization: true
};

export default {
  init: id =>{
    const slider = $(`<input value="${value}" type="range" />`);
    slider.appendTo($('div.log').html(''));

    grid = new Grid(id, dv, columns, options);

    slider.on('change', ({target}) =>{
      value = Number(target.value);
      dv.refresh();
    });

    dv.onRowCountChanged.subscribe(() =>{
      grid.updateRowCount();
      grid.render();
    });

    dv.onRowsChanged.subscribe((e, {rows}) =>{
      grid.invalidateRows(rows);
      grid.render();
    });

    grid.onCellChange.subscribe(function (e, args) {
      dv.updateItem(args.item.id, args.item);
    });

    grid.onClick.subscribe((e, args) =>{
      if ($(e.target).hasClass("toggle")){
        const item = dv.getItem(args.row);
        if (item){
          item._collapsed = !item._collapsed;
          dv.updateItem(item.id, item);
          grid.updateRowCount();
          grid.render();
        }
        e.stopImmediatePropagation();
      }
    });

    grid.init()

    return grid;
  },
  route: 'example10',
  title: 'Example 10: DataFilter grouped'
};
