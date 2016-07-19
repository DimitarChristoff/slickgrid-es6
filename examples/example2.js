import { Grid, Formatters } from '../src/';

function formatter(row, cell, value, columnDef, dataContext) {
  return value;
}


var grid;
var data = [];
var columns = [
  {id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", formatter: formatter},
  {id: "duration", name: "Duration", field: "duration"},
  {id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Formatters.PercentCompleteBar},
  {id: "start", name: "Start", field: "start", minWidth: 60},
  {id: "finish", name: "Finish", field: "finish", minWidth: 60},
  {id: "effort-driven", name: "Effort Driven", sortable: false, width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Formatters.Checkmark}
];

var options = {
  editable: false,
  enableAddRow: false,
  enableCellNavigation: true
};

for (var i = 0; i < 5; i++) {
  var d = (data[i] = {});

  d["title"] = "<a href='#' tabindex='0'>Task</a> " + i;
  d["duration"] = "5 days";
  d["percentComplete"] = Math.min(100, Math.round(Math.random() * 110));
  d["start"] = "01/01/2009";
  d["finish"] = "01/05/2009";
  d["effortDriven"] = (i % 5 == 0);
}

export default {
  init: id => {
    new Grid(id, data, columns, options);
  },
  title: 'Example 2: Formatters',
  route: '/example2'
}
