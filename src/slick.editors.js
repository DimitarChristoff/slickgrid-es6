import Slick from './slick.core';
import flatpickr from 'flatpickr';
//import 'flatpickr/dist/flatpickr.min.css';
import $ from 'jquery';

const { keyCode } = Slick;

/** *
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

const Editors = {
  Text: TextEditor,
  Integer: IntegerEditor,
  Float: FloatEditor,
  Date: DateEditor,
  YesNoSelect: YesNoSelectEditor,
  Checkbox: CheckboxEditor,
  LongText: LongTextEditor
};

Slick.Editors = Editors;
export default Editors;

function TextEditor(args){
  let $input;
  let defaultValue;

  this.init = function(){
    $input = $("<INPUT type=text class='editor-text' />")
      .appendTo(args.container)
      .bind('keydown.nav', function(e){
        if (e.keyCode === keyCode.LEFT || e.keyCode === keyCode.RIGHT){
          e.stopImmediatePropagation();
        }
      })
      .focus()
      .select();
  };

  this.destroy = function(){
    $input.remove();
  };

  this.focus = function(){
    $input.focus();
  };

  this.getValue = function(){
    return $input.val();
  };

  this.setValue = function(val){
    $input.val(val);
  };

  this.loadValue = function(item){
    defaultValue = item[args.column.field] || '';
    $input.val(defaultValue);
    $input[0].defaultValue = defaultValue;
    $input.select();
  };

  this.serializeValue = function(){
    return $input.val();
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return (!($input.val() == '' && defaultValue == null)) && ($input.val() != defaultValue);
  };

  this.validate = function(){
    let valid = true;
    let msg = null;
    if (args.column.validator){
      let validationResults = args.column.validator($input.val(), args);
      valid = validationResults.valid;
      msg = validationResults.msg;
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}

function IntegerEditor(args){
  let $input;
  let defaultValue;

  this.init = function(){
    $input = $("<INPUT type=text class='editor-text' />");

    $input.bind('keydown.nav', function(e){
      if (e.keyCode === keyCode.LEFT || e.keyCode === keyCode.RIGHT){
        e.stopImmediatePropagation();
      }
    });

    $input.appendTo(args.container);
    $input.focus().select();
  };

  this.destroy = function(){
    $input.remove();
  };

  this.focus = function(){
    $input.focus();
  };

  this.loadValue = function(item){
    defaultValue = item[args.column.field];
    $input.val(defaultValue);
    $input[0].defaultValue = defaultValue;
    $input.select();
  };

  this.serializeValue = function(){
    return parseInt($input.val(), 10) || 0;
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return (!($input.val() == '' && defaultValue == null)) && ($input.val() != defaultValue);
  };

  this.validate = function(){
    if (isNaN($input.val())){
      return {
        valid: false,
        msg: 'Please enter a valid integer'
      };
    }

    if (args.column.validator){
      let validationResults = args.column.validator($input.val());
      if (!validationResults.valid){
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}

function FloatEditor(args){
  let $input;
  let defaultValue;
  let scope = this;

  this.init = function(){
    $input = $("<INPUT type=text class='editor-text' />");

    $input.bind('keydown.nav', function(e){
      if (e.keyCode === keyCode.LEFT || e.keyCode === keyCode.RIGHT){
        e.stopImmediatePropagation();
      }
    });

    $input.appendTo(args.container);
    $input.focus().select();
  };

  this.destroy = function(){
    $input.remove();
  };

  this.focus = function(){
    $input.focus();
  };

  function getDecimalPlaces(){
    // returns the number of fixed decimal places or null
    let rtn = args.column.editorFixedDecimalPlaces;
    if (typeof rtn == 'undefined'){
      rtn = FloatEditor.DefaultDecimalPlaces;
    }
    return (!rtn && rtn !== 0 ? null : rtn);
  }

  this.loadValue = function(item){
    defaultValue = item[args.column.field];

    let decPlaces = getDecimalPlaces();
    if (decPlaces !== null
      && (defaultValue || defaultValue === 0)
      && defaultValue.toFixed){
      defaultValue = defaultValue.toFixed(decPlaces);
    }

    $input.val(defaultValue);
    $input[0].defaultValue = defaultValue;
    $input.select();
  };

  this.serializeValue = function(){
    let rtn = parseFloat($input.val()) || 0;

    let decPlaces = getDecimalPlaces();
    if (decPlaces !== null
      && (rtn || rtn === 0)
      && rtn.toFixed){
      rtn = parseFloat(rtn.toFixed(decPlaces));
    }

    return rtn;
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return (!($input.val() == '' && defaultValue == null)) && ($input.val() != defaultValue);
  };

  this.validate = function(){
    if (isNaN($input.val())){
      return {
        valid: false,
        msg: 'Please enter a valid number'
      };
    }

    if (args.column.validator){
      let validationResults = args.column.validator($input.val(), args);
      if (!validationResults.valid){
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}

FloatEditor.DefaultDecimalPlaces = null;

/**
 * see https://chmln.github.io/flatpickr/#options - pass as column.options.date = {}
 * @param args
 * @constructor
 */
function DateEditor(args){
  let $input,
    flatInstance,
    defaultDate,
    options = args.column.options && args.column.options.date ? args.column.options.date : {};

  this.init = function(){
    defaultDate = options.defaultDate = args.item[args.column.field];

    $input = $('<input type=text data-default-date="'+defaultDate+'" class="editor-text" />');
    $input.appendTo(args.container);
    $input.focus().val(defaultDate).select();
    flatInstance = flatpickr($input[0], options);
  };

  this.destroy = function(){
    flatInstance.destroy();
    $input.remove();
  };

  this.show = function(){
    flatInstance.open();
    flatInstance.positionCalendar();
  };

  this.hide = function(){
    flatInstance.close();
  };

  this.position = function(position){
    //todo: fix how scrolling is affected
    flatInstance.positionCalendar();
  };

  this.focus = function(){
    $input.focus();
  };

  this.loadValue = function(item){
    defaultDate = item[args.column.field];
    $input.val(defaultDate);
    $input.select();
  };

  this.serializeValue = function(){
    return $input.val();
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return (!($input.val() == '' && defaultDate == null)) && ($input.val() != defaultDate);
  };

  this.validate = function(){
    if (args.column.validator){
      let validationResults = args.column.validator($input.val(), args);
      if (!validationResults.valid){
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}

function YesNoSelectEditor(args){
  let $select;
  let defaultValue;
  let scope = this;

  this.init = function(){
    $select = $("<select tabIndex='0' class='editor-yesno'><option value='yes'>Yes</option><option value='no'>No</option></select>");
    $select.appendTo(args.container);
    $select.focus();
  };

  this.destroy = function(){
    $select.remove();
  };

  this.focus = function(){
    $select.focus();
  };

  this.loadValue = function(item){
    $select.val((defaultValue = item[args.column.field]) ? 'yes' : 'no');
    $select.select();
  };

  this.serializeValue = function(){
    return ($select.val() == 'yes');
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return ($select.val() != defaultValue);
  };

  this.validate = function(){
    let valid = true;
    let msg = null;
    if (args.column.validator){
      let validationResults = args.column.validator($select.val(), args);
      valid = validationResults.valid;
      msg = validationResults.msg;
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}

function CheckboxEditor(args){
  let $select;
  let defaultValue;
  let scope = this;

  this.init = function(){
    $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
    $select.appendTo(args.container);
    $select.focus();
  };

  this.destroy = function(){
    $select.remove();
  };

  this.focus = function(){
    $select.focus();
  };

  this.loadValue = function(item){
    defaultValue = !!item[args.column.field];
    if (defaultValue){
      $select.prop('checked', true);
    } else {
      $select.prop('checked', false);
    }
  };

  this.serializeValue = function(){
    return $select.prop('checked');
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return (this.serializeValue() !== defaultValue);
  };

  this.validate = function(){
    let valid = true;
    let msg = null;
    if (args.column.validator){
      let validationResults = args.column.validator($select.val(), args);
      valid = validationResults.valid;
      msg = validationResults.msg;
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}

function PercentCompleteEditor(args){
  console.error('PercentCompleteEditor is derecated');
}

/*
 * An example of a "detached" editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
function LongTextEditor(args){
  let $input, $wrapper;
  let defaultValue;
  let scope = this;

  this.init = function(){
    let $container = $('body');

    $wrapper = $("<div class='slick-large-editor-text' />").appendTo($container);
    $input = $("<textarea hidefocus rows=5 />").appendTo($wrapper);

    $("<div><button>Save</button> <button>Cancel</button></div>").appendTo($wrapper);

    $wrapper.find('button:first').bind('click', this.save);
    $wrapper.find('button:last').bind('click', this.cancel);
    $input.bind('keydown', this.handleKeyDown);

    scope.position(args.position);
    $input.focus().select();
  };

  this.handleKeyDown = function(e){
    if (e.which == keyCode.ENTER && e.ctrlKey){
      scope.save();
    } else if (e.which == keyCode.ESCAPE){
      e.preventDefault();
      scope.cancel();
    } else if (e.which == keyCode.TAB && e.shiftKey){
      e.preventDefault();
      args.grid.navigatePrev();
    } else if (e.which == keyCode.TAB){
      e.preventDefault();
      args.grid.navigateNext();
    }
  };

  this.save = function(){
    args.commitChanges();
  };

  this.cancel = function(){
    $input.val(defaultValue);
    args.cancelChanges();
  };

  this.hide = function(){
    $wrapper.hide();
  };

  this.show = function(){
    $wrapper.show();
  };

  this.position = function(position){
    $wrapper
      .css('top', position.top - 5)
      .css('left', position.left - 5);
  };

  this.destroy = function(){
    $wrapper.remove();
  };

  this.focus = function(){
    $input.focus();
  };

  this.loadValue = function(item){
    $input.val(defaultValue = item[args.column.field]);
    $input.select();
  };

  this.serializeValue = function(){
    return $input.val();
  };

  this.applyValue = function(item, state){
    item[args.column.field] = state;
  };

  this.isValueChanged = function(){
    return (!($input.val() == '' && defaultValue == null)) && ($input.val() != defaultValue);
  };

  this.validate = function(){
    let valid = true;
    let msg = null;
    if (args.column.validator){
      let validationResults = args.column.validator($select.val(), args);
      valid = validationResults.valid;
      msg = validationResults.msg;
    }

    return {
      valid: true,
      msg: null
    };
  };

  this.init();
}
