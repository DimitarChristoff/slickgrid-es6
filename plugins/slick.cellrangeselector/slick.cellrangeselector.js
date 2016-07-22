import $ from 'jquery';
import Slick from '../../src/slick.core';
import CellRangeDecorator from '../slick.cellrangedecorator/slick.cellrangedecorator';

Slick.CellRangeSelector = CellRangeSelector;
export default CellRangeSelector;

function CellRangeSelector(options){
  let _grid;
  let _canvas;
  let _dragging;
  let _decorator;

  const _self = this;
  const _handler = new Slick.EventHandler();
  const _defaults = {
    selectionCss: {
      'border': '2px dashed blue'
    }
  };

  function init(grid){
    options = Object.assign({}, _defaults, options);
    _decorator = new CellRangeDecorator(grid, options);
    _grid = grid;
    _canvas = _grid.getCanvasNode();
    _handler
      .subscribe(_grid.onDragInit, handleDragInit)
      .subscribe(_grid.onDragStart, handleDragStart)
      .subscribe(_grid.onDrag, handleDrag)
      .subscribe(_grid.onDragEnd, handleDragEnd);
  }

  function destroy(){
    _handler.unsubscribeAll();
  }

  function handleDragInit(e, dd){
    // prevent the grid from cancelling drag'n'drop by default
    e.stopImmediatePropagation();
  }

  function handleDragStart(e, dd){
    const cell = _grid.getCellFromEvent(e);
    if (_self.onBeforeCellRangeSelected.notify(cell) !== false){
      if (_grid.canCellBeSelected(cell.row, cell.cell)){
        _dragging = true;
        e.stopImmediatePropagation();
      }
    }
    if (!_dragging){
      return;
    }

    _grid.focus();

    const start = _grid.getCellFromPoint(
      dd.startX - $(_canvas).offset().left,
      dd.startY - $(_canvas).offset().top);

    dd.range = {start: start, end: {}};

    return _decorator.show(new Slick.Range(start.row, start.cell));
  }

  function handleDrag(e, dd){
    if (!_dragging){
      return;
    }
    e.stopImmediatePropagation();

    const end = _grid.getCellFromPoint(
      e.pageX - $(_canvas).offset().left,
      e.pageY - $(_canvas).offset().top);

    if (!_grid.canCellBeSelected(end.row, end.cell)){
      return;
    }

    dd.range.end = end;
    _decorator.show(new Slick.Range(dd.range.start.row, dd.range.start.cell, end.row, end.cell));
  }

  function handleDragEnd(e, dd){
    if (!_dragging){
      return;
    }

    _dragging = false;
    e.stopImmediatePropagation();

    _decorator.hide();
    _self.onCellRangeSelected.notify({
      range: new Slick.Range(
        dd.range.start.row,
        dd.range.start.cell,
        dd.range.end.row,
        dd.range.end.cell
      )
    });
  }

  Object.assign(this, {
    init,
    destroy,

    onBeforeCellRangeSelected: new Slick.Event(),
    onCellRangeSelected: new Slick.Event()
  });
}
