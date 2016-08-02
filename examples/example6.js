import { Grid } from '../src/';
import Help from '../images/help.png';
import TagRed from '../images/tag_red.png';
import CommentYellow from '../images/comment_yellow.gif';
import Info from '../images/info.gif';

import data from './example-data';

// import './slick.headermenu-example.css';

import HeaderMenu from '../plugins/slick.headermenu';

import sortASC from '../images/sort-asc.gif';
import sortDSC from '../images/sort-desc.gif';

let grid;
const columns = [
  {id: 'title', name: 'Title', field: 'title'},
  {id: 'duration', name: 'Duration', field: 'duration'},
  {id: '%', name: '% Complete', field: 'percentComplete'},
  {id: 'start', name: 'Start', field: 'start'},
  {id: 'finish', name: 'Finish', field: 'finish'},
  {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
];

for (let i = 0; i < columns.length; i++){
  columns[i].header = {
    menu: {
      items: [
        {
          iconImage: sortASC,
          title: 'Sort Ascending',
          command: 'sort-asc'
        },
        {
          iconImage: sortDSC,
          title: 'Sort Descending',
          command: 'sort-desc'
        },
        {
          title: 'Hide Column',
          command: 'hide',
          disabled: true,
          tooltip: "Can't hide this column"
        },
        {
          iconCssClass: 'icon-help',
          title: 'Help',
          command: 'help'
        }
      ]
    }
  };
}

const options = {
  enableColumnReorder: !false
};

export default {
  init: id => {
    grid = new Grid(id, data, columns, options);

    const headerMenuPlugin = new HeaderMenu({});

    headerMenuPlugin.onBeforeMenuShow.subscribe(function(e, args){
      const menu = args.menu;

      // We can add or modify the menu here, or cancel it by returning false.
      const i = menu.items.length;
      menu.items.push({
        title: 'Menu item ' + i,
        command: 'item' + i
      });
    });

    headerMenuPlugin.onCommand.subscribe(function(e, args){
      alert('Command: ' + args.command);
    });

    grid.registerPlugin(headerMenuPlugin);

    return grid;
  },
  title: 'Example 6: Header Menu Plugin',
  route: '/example6',
  description: '<p>This example demonstrates using the <b>Slick.Plugins.HeaderMenu</b> plugin to add drop-down menus to column' +
               ' headers.  (Hover over the headers.)</p>'
};
