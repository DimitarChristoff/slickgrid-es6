import { Grid } from '../src/';

import data from './example-data';
import AutoTooltips from '../plugins/slick.autotooltips';

let grid;
const columns = [
  {id: 'title', name: 'Title', field: 'title'},
  {id: 'duration', name: 'Duration', field: 'duration'},
  {id: '%', name: '% Complete', field: 'percentComplete'},
  {id: 'start', name: 'Start', field: 'start'},
  {id: 'finish', name: 'Finish', field: 'finish'},
  {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
];

const options = {
  enableCellNavigation: true,
  enableColumnReorder: true
};

export default {
  init: id => {
    grid = new Grid(id, data, columns, options);

    const autoTooltips = new AutoTooltips({ enableForHeaderCells: true });

    grid.registerPlugin(autoTooltips);
    grid.render();
  },
  title: 'Example 7: AutoTooltips plugin',
  route: '/example7',
  description: '<h2>Instructions:</h2>' +
  '<p>Resize the columns until see ellipsis in column or header.  Hover over cell to see tooltip.</p>' +
  '<h2>Usage:</h2>' +
  '<pre style="background-color: white; font-size: 110%; border-radius: 5px; padding: 20px; ">plugin = new Slick.AutoTooltips(pluginOptions);' +
  'grid.registerPlugin(plugin);' +
  'grid.render();</pre>'
};
