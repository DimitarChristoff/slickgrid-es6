import Slick from '../../src/slick.core';
import $ from 'jquery';

export default RowMoveManager;

function RowMoveManager(options){
  let _grid;
  let _canvas;
  let _dragging;
  let selectedRows;
  let selectionProxy;
  let guide;
  let insertBefore;
  let canMove;
  const _self = this;
  const _handler = new Slick.EventHandler();
  const _defaults = {
    cancelEditOnDrag: false
  };

  function init(grid){
    options = Object.assign({}, _defaults, options);
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

    if (options.cancelEditOnDrag && _grid.getEditorLock().isActive()){
      _grid.getEditorLock().cancelCurrentEdit();
    }

    if (_grid.getEditorLock().isActive() || !/move|selectAndMove/.test(_grid.getColumns()[cell.cell].behavior)){
      return false;
    }

    _dragging = true;
    e.stopImmediatePropagation();

    selectedRows = _grid.getSelectedRows();

    if (selectedRows.length == 0 || $.inArray(cell.row, selectedRows) == -1){
      selectedRows = [cell.row];
      _grid.setSelectedRows(selectedRows);
    }

    const rowHeight = _grid.getOptions().rowHeight;

    selectionProxy = $("<div class='slick-reorder-proxy'/>")
      .css('position', 'absolute')
      .css('zIndex', '99999')
      .css('width', $(_canvas).innerWidth())
      .css('height', rowHeight * selectedRows.length)
      .appendTo(_canvas);

    guide = $("<div class='slick-reorder-guide'/>")
      .css('position', 'absolute')
      .css('zIndex', '99998')
      .css('width', $(_canvas).innerWidth())
      .css('top', -1000)
      .appendTo(_canvas);

    insertBefore = -1;
  }

  function handleDrag(e, dd){
    if (!_dragging){
      return;
    }

    e.stopImmediatePropagation();

    const top = e.pageY - $(_canvas).offset().top;
    selectionProxy.css('top', top - 5);

    const insertBeforeNew = Math
      .max(0, Math.min(Math.round(top / _grid.getOptions().rowHeight), _grid.getDataLength()));

    if (insertBeforeNew !== insertBefore){
      const eventData = {
        'rows': selectedRows,
        'insertBefore': insertBeforeNew
      };

      if (_self.onBeforeMoveRows.notify(eventData) === false){
        guide.css('top', -1000);
        canMove = false;
      } else {
        guide.css('top', insertBeforeNew * _grid.getOptions().rowHeight);
        canMove = true;
      }

      insertBefore = insertBeforeNew;
    }
  }

  function handleDragEnd(e, dd){
    if (!_dragging){
      return;
    }
    _dragging = false;
    e.stopImmediatePropagation();

    guide.remove();
    selectionProxy.remove();

    if (canMove){
      const eventData = {
        'rows': selectedRows,
        'insertBefore': insertBefore
      };
      // TODO:  _grid.remapCellCssClasses ?
      _self.onMoveRows.notify(eventData);
    }
  }

  Object.assign(this, {
    'onBeforeMoveRows': new Slick.Event(),
    'onMoveRows': new Slick.Event(),
    init,
    destroy
  });
}
