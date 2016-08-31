import $ from 'jquery';
import Slick from '../../src/slick.core';
const { keyCode } = Slick;

Slick.CellRangeDecorator = CellCopyManager;

export default CellCopyManager;

  function CellCopyManager(){
    var _grid;
    var _self = this;
    var _copiedRanges;

    function init(grid){
      _grid = grid;
      _grid.onKeyDown.subscribe(handleKeyDown);
    }

    function destroy(){
      _grid.onKeyDown.unsubscribe(handleKeyDown);
    }

    function handleKeyDown(event, args){
      var ranges;
      if (!_grid.getEditorLock().isActive()){
        if (event.which == keyCode.ESCAPE){
          if (_copiedRanges){
            event.preventDefault();
            clearCopySelection();
            _self.onCopyCancelled.notify({ranges: _copiedRanges, event});
            _copiedRanges = null;
          }
        }

        if (event.which == 67 && (event.ctrlKey || event.metaKey)){
          ranges = _grid.getSelectionModel().getSelectedRanges();
          if (ranges.length != 0){
            event.preventDefault();
            _copiedRanges = ranges;
            markCopySelection(ranges);
            _self.onCopyCells.notify({ranges: ranges, event});
          }
        }

        if (event.which == 86 && (event.ctrlKey || event.metaKey)){
          if (_copiedRanges){
            event.preventDefault();
            clearCopySelection();
            ranges = _grid.getSelectionModel().getSelectedRanges();
            _self.onPasteCells.notify({from: _copiedRanges, to: ranges, event});
            _copiedRanges = null;
          }
        }
      }
    }

    function markCopySelection(ranges){
      var columns = _grid.getColumns();
      var hash = {};
      for (var i = 0; i < ranges.length; i++){
        for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++){
          hash[j] = {};
          for (var k = ranges[i].fromCell; k <= ranges[i].toCell; k++){
            hash[j][columns[k].id] = 'copied';
          }
        }
      }
      _grid.setCellCssStyles('copy-manager', hash);
    }

    function clearCopySelection(){
      _grid.removeCellCssStyles('copy-manager');
    }

    Object.assign(this, {
      init,
      destroy,
      clearCopySelection,

      onCopyCells: new Slick.Event(),
      onCopyCancelled: new Slick.Event(),
      onPasteCells: new Slick.Event()
    });
  }
