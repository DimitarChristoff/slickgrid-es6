import {Grid, Formatters} from '../src/';
import origData from './example-data';
import HeaderButtonsPlugin from '../plugins/slick.headerbuttons';
import Help from '../images/help.png';
import TagRed from '../images/tag_red.png';
import CommentYellow from '../images/comment_yellow.gif';
import Info from '../images/info.gif';
let grid;
const options = {
  enableCellNavigation: true
};
const columns = [];
const columnsWithHighlightingById = [1];

let data = origData.slice();

// Set up some test columns.
for (let i = 0; i < 10; i++){
  columns.push({
    id: i,
    name: String.fromCharCode('A'.charCodeAt(0) + i),
    field: i,
    width: 90,
    sortable: true,
    formatter: highlightingFormatter,
    header: {
      buttons: [
        {
          cssClass: 'icon-highlight-off',
          command: 'toggle-highlight',
          tooltip: 'Highlight negative numbers.'
        }
      ]
    }
  });
}

// Set multiple buttons on the first column to demonstrate overflow.
columns[0].name = 'Resize me!';
columns[0].header = {
  buttons: [
    {
      image: TagRed
    },
    {
      image: CommentYellow
    },
    {
      image: Info
    },
    {
      image: Help
    }
  ]
};

// Set a button on the second column to demonstrate hover.
columns[1].name = 'Hover me!';
columns[1].header = {
  buttons: [
    {
      image: Help,
      showOnHover: true,
      tooltip: 'This button only appears on hover.',
      handler: function(e){
        alert('Help');
      }
    }
  ]
};

// Set up some test data.
for (let i = 0; i < 100; i++){
  const d = (data[i] = {});
  d['id'] = i;
  for (let j = 0; j < columns.length; j++){
    d[j] = Math.round(Math.random() * 10) - 5;
  }
}

function highlightingFormatter(row, cell, value, columnDef, dataContext){
  if (columnsWithHighlightingById[columnDef.id] && value < 0){
    return "<div style='color:red; font-weight:bold;'>" + value + '</div>';
  } else {
    return value;
  }
}

export default {
  init: id =>{
    grid = new Grid(id, data, columns, options);

    const headerButtonsPlugin = new HeaderButtonsPlugin();

    headerButtonsPlugin.onCommand.subscribe(function(e, args){
      const column = args.column;
      const button = args.button;
      const command = args.command;

      if (command == 'toggle-highlight'){
        if (button.cssClass == 'icon-highlight-on'){
          delete columnsWithHighlightingById[column.id];
          button.cssClass = 'icon-highlight-off';
          button.tooltip = 'Highlight negative numbers.';
        } else {
          columnsWithHighlightingById[column.id] = true;
          button.cssClass = 'icon-highlight-on';
          button.tooltip = 'Remove highlight.';
        }

        grid.invalidate();
      }
    });

    grid.registerPlugin(headerButtonsPlugin);

    return grid;
  },
  title: 'Example 5: Header Button Plugin',
  route: '/example5',
  description: 'This example demonstrates using the <b>Slick.Plugins.HeaderButtons</b> plugin to easily add buttons to colum headers.  These buttons can be specified directly in the column definition, and are very easy to configure and use.'
};

