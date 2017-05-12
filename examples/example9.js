import React from 'react';
import ReactDOM from 'react-dom';
import {FrozenGrid as Grid, Editors, Plugins, Data} from '../src/';
import Faker                                                      from 'faker';
import _                                                          from 'lodash'
import {
  makeArray,
  amountFormatter,
  pipFormatter,
  imageFormatter,
  dateFormatter,
  totalFormatter,
  rates,
  morphRate
} from './lib/utils';

import './example9.less';

const { CheckboxSelectColumn, RowSelectionModel } = Plugins;

const checkboxSelector = new CheckboxSelectColumn({
  cssClass: 'slick-cell-checkboxsel'
});

const options = {
  rowHeight: 32,
  editable: true,
  enableAddRow: !true,
  enableCellNavigation: true,
  asyncEditorLoading: false,
  autoEdit: false,
  forceFitColumns: true,
  showHeaderRow: true,
  headerRowHeight: 32,
  explicitInitialization: true
};

const columnFilters = {};
const dv = new Data.DataView();
dv.setFilter(item => {
  let pass = true;

  for (let key in item){
    if (key in columnFilters && columnFilters[key].length){
      pass = pass && String(item[key]).match(new RegExp(columnFilters[key], 'ig'));
    }
  }
  return pass;
});

dv.getItemMetadata = index => {
  const row = dv.getItem(index);
  return row.type === 'BUY' ? {cssClasses: 'buy'} : {cssClasses: ''}
}
// end data view


const sortable = true;
const columns = [
  checkboxSelector.getColumnDefinition(),
  {
    id: 'type',
    name: 'Side',
    sortable,
    field: 'type',
    maxWidth: 120,
  },
  {id: 'counterparty', name: 'Counterparty', field: 'counterparty', minWidth: 200, maxWidth: 200, cssClass: 'zb-editable', editor: Editors.Text, sortable},
  {id: 'currency', name: 'GBP-nnn', field: 'currency', minWidth: 120, maxWidth: 120, sortable },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    headerCssClass: 'amount',
    cssClass: 'amount',
    formatter: pipFormatter,
    minWidth: 100,
    maxWidth: 100
  },
  {
    id: 'amount',
    name: 'Amount',
    field: 'amount',
    headerCssClass: 'amount',
    cssClass: 'amount zb-editable',
    formatter: amountFormatter,
    editor: Editors.Text,
    minWidth: 100,
    maxWidth: 100
  },
  {
    id:'total',
    name:'Total',
    fieldName:'total',
    headerCssClass: 'amount',
    cssClass: 'amount',
    formatter: totalFormatter,
    sortable: true,
    minWidth: 100,
    maxWidth: 128
  },
  {
    id: 'avatar',
    name: 'Avatar',
    field: 'avatar',
    formatter: imageFormatter,
    cssClass: 'full-size',
    minWidth: 128,
    maxWidth: 128
  },
  {
    id: 'paymentDate',
    sortable: true,
    name: 'Execution',
    field: 'paymentDate',
    minWidth: 100,
    maxWidth: 100,
    cssClass: 'zb-editable amount',
    headerCssClass: 'amount',
    editor: Editors.Date,
    options: {
      date: {
        dateFormat: 'd/m/Y', // see https://chmln.github.io/flatpickr/#options,
        parseDate: input => {
          const split = input.split('/')
          return new Date(`${split[1]}-${split[0]}-${split[2]}`)
        }
      }
    }
  },
  {id: 'duration', name: 'Duration', field: 'duration', cssClass: 'is-hidden-mobile', headerCssClass: 'is-hidden-mobile'},
];

// fake data
const data = dv.setItems(makeArray(300, id => {
  const currency = _.sample(['USD','AUD','CAD','EUR','JPY','CHF']);
  return {
    id,
    avatar: Faker.image.avatar(),
    type: _.sample(['BUY','SELL']),
    counterparty: Faker.company.companyName(),
    duration: Faker.random.number(),
    currency,
    amount: Faker.finance.amount(),
    price: rates[currency],
    paymentDate: dateFormatter(null, null, Faker.date.future())
  };
}));

// filter renderer is a react component
class Filter extends React.Component {

  handleChange({target}){
    const value = target.value.trim()
    if (value.length){
      this.props.columnFilters[this.props.columnId] = value;
    }
    else {
      delete this.props.columnFilters[this.props.columnId]
    }

    this.props.dv.refresh()
  }

  render(){
    return <input defaultValue={this.props.columnFilters[this.props.columnId]} type='text' className='editor-text' onChange={::this.handleChange} />
  }
}



export default {
  init: id => {
    const grid = this.gridInstance = new Grid(this.grid, dv, columns, options);

    grid.setSelectionModel(new Plugins.RowSelectionModel({selectActiveRow: false}));
    grid.registerPlugin(checkboxSelector);

    grid.onHeaderRowCellRendered.subscribe((e, {node, column}) => {
      if (['_checkbox_selector', 'avatar'].indexOf(column.id) === -1){
        ReactDOM.render(<Filter columnId={column.id} columnFilters={columnFilters} dv={dv} />, node);
        node.classList.add('zb-editable');
      }
    });

    grid.onSort.subscribe(function(e, args) {
      // We'll use a simple comparer function here.
      const comparer = function(a, b) {
        return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
      }

      // Delegate the sorting to DataView.
      // This will fire the change events and update the grid.
      dv.sort(comparer, args.sortAsc);
    });

    dv.onRowCountChanged.subscribe(() => {
      grid.updateRowCount();
      grid.render();
    });

    dv.onRowsChanged.subscribe((e, {rows}) => {
      grid.invalidateRows(rows);
      grid.render();
    });

    grid.init();

    return grid;
  },
  onReady: (grid) =>{
    grid.getContainerNode().classList.add('example-9');
  },
  route: 'example9',
  title: 'Example 9: Custom look and feel'
};
