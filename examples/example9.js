import React from 'react'
import {FrozenGrid as Grid, Editors, Plugins} from '../src/';
import './example9.less';

const { CheckboxSelectColumn, RowSelectionModel } = Plugins

const checkboxSelector = new CheckboxSelectColumn({
  cssClass: "slick-cell-checkboxsel"
});

const columns = [
  checkboxSelector.getColumnDefinition(),
  {
    id: 'title',
    name: 'Title',
    field: 'title',
    minWidth: 120,
    maxWidth: 120,
    cssClass: 'editable-cell',
    editor: Editors.Text
  },
  {id: 'description', name: 'Description', field: 'description', minWidth: 200, maxWidth: 200},
  {id: 'sponsor', name: 'Sponsor', field: 'sponsor'},
  {id: 'duration', name: 'Duration', field: 'duration', cssClass: 'editable-cell', editor: Editors.Text},
]

const options = {
  rowHeight: 32,
  headerRowHeight: 32,
  editable: true,
  // enableAddRow: true,
  enableCellNavigation: true,
  forceFitColumns: true
};

const data = [
  {
    title: 'one',
    description: 'This is one',
    sponsor: 'Bob',
    duration: '1 hr'
  },
  {
    title: 'two',
    description: 'This is two',
    duration: '2 hr'
  },
  {
    title: 'three',
    description: 'This is three',
    duration: '3 hr'
  }

]

export default {
  init: id => {
    const grid = new Grid(id, data, columns, options);
    grid.setSelectionModel(new RowSelectionModel({selectActiveRow: false}));
    grid.registerPlugin(checkboxSelector);

    return grid;
  },
  onReady: (grid) =>{
    grid.getContainerNode().classList.add('example-9')
  },
  route: '/example9',
  title: 'Example 9: Custom look and feel'
};
