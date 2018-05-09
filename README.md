# SlickGrid ES6 

[![npm version](https://img.shields.io/npm/v/slickgrid-es6.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-es6) [![npm downloads](https://img.shields.io/npm/dm/slickgrid-es6.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-es6) ![gzip size](http://img.badgesize.io/https://npmcdn.com/slickgrid-es6/dist/slick.es6.min.js?compression=gzip)

> This is a clone of the two biggest forks of SlickGrid - [6pac fork](https://github.com/6pac/SlickGrid/) and [X-SlickGrid](https://github.com/ddomingues/X-SlickGrid), both of which have been converted to align with this project's goals and build strategy, both ready to be used out of the box[1]  

> **NEW** See it running in a create-react-app here: https://dimitarchristoff.github.io/slickgrid-example/

![image](https://user-images.githubusercontent.com/119500/39813726-711c9d86-5389-11e8-886a-27e9250955f1.png)

The main goals are:

* Make it easy to consume in a modern ES2016 codebase
* Transpile down to ES5
* Keep the existing SlickGrid API for both grids
* Make dependency consumption implicit and not reliant on globals
* Remove reliance on `Slick.` object namespace, everything just exports and needs to be imported, no more `Slick.Editors` etc.
* **Remove `jquery-ui` from deps list** - replaced with Interact.js

______

[1] _Yes, there are some compatibility issues, such as drag and reorder of columns with X-SlickGrid's frozenRows from frozen to none._
 
NB: Going forward, the 6pac version may be dropped.  

![Default Example Styles](https://cloud.githubusercontent.com/assets/119500/24247817/1fda096c-0fc5-11e7-94b7-e71afb520999.png)

![Custom Styles](https://cloud.githubusercontent.com/assets/119500/24247974/7436191a-0fc5-11e7-9df5-86c8c3bfdc74.png)

## Installing and use

```sh
$ npm i slickgrid-es6 --save
```

In code:

```js
import { Grid, Data, Formatters } from 'slickgrid-es6';
import { options, columns } from './grid-config';

const gridColumns = [{
  id: "%", 
  name: "% Complete", 
  field: "percentComplete", 
  formatter: Formatters.PercentCompleteBar
}, ...columns]; // some column def

const dataView = new Data.DataView();
dataView.setItems([ ... ]); // some data

const grid = new Grid('someid', dataView, columns, options);
```

Full list of exports you can de-structure:

 - `Slick` - returns the original namespace (`Slick.core` - events etc)
 - `Grid` - returns 6pac's SlickGrid
 - `FrozenGrid` - returns X-SlickGrid (frozen rows/columns)
 - `Data` - returns the `Slick.Data` model
 - `Plugins` - returns the default plugins converted/tweaked 
 - `Editors` - returns the original pre-defined default editors 
 - `Formatters` - returns the original pre-defined default cell formatters
 
To import stylesheets in LESS (for now):
```less
// some vars like @grid-border-color: red;, see slick.grid.variables.less

@import "~slickgrid-es6/dist/slick.grid.less";
@import "~slickgrid-es6/dist/slick-default-theme.less";
...
```

## Examples and development

Currently, the examples are being ported. You can start a webpack-dev-server with hot reload like this:

```sh
$ npm start
```

Then point your browser to [http://localhost:8888/](http://localhost:8888/).

To create a new build for `dist`, run:

```sh
$ npm run build
```

## Contributing

Any pull requests and help with this are appreciated - both from conversion stand point and from SlickGrid bug fixes or 
feature additions. 

## Changelog

### `2.0.4`

* Fixed critical bug with Data and `setFilter`  

### `2.0.3`

* Fixed query-ui legacy exception on `grid.destroy()`

### `2.0.2`

* Fixed critical break in Interact.js with PointerEvent and new Chrome 51+

### `2.0.1`
 
* Fixed `.npmrc` to still ship images for custom builds 

### `2.0.0`

* Skipped 1.0.0 due to previously published tag
* Changed webpack build
* BREAKING: deprecated UMD exports
* BREAKING: deprecated reliance on globals (eg. Slick.Formatters)
* Fixed some formatters and plugins
* Slight tweaks to LESS files

### `0.4.1`

* Enabled grouped headers code, including resize and reorder

### `0.3.0`

* Added X-SlickGrid to exports, available via `Slick.FrozenGrid` or `import { FrozenGrid as Grid } from 'slickgrid-es6'`
* Added validator support for some editors
* Fixed plugins yet to be converted

### `0.2.3`

* moved to using `slick.frozen.grid.js` from X-SlickGrid for FrozenRows/Columns feature, converted to ES6 and with deprecated jquery-ui
* Styling fixes, moved to `box-sizing: border-box` for `.slick-cell`
* Updated examples to use React but grid has no dependency on React

### Changes completed as per `0.1.1`:

The goal is to keep the grid API of the 6pac repository unchanged. Howe 

* converted to ES6
* dropped IE8 support
* jquery 3.1.0
* dropped jquery-ui (replaced with interact.js)
* dropped event.drag (replaced with interact.js)
* move to LESS (SCSS soon)


## Original mleibman README follows:


Find documentation and examples in [the wiki](https://github.com/mleibman/SlickGrid/wiki).

# Welcome to SlickGrid

## SlickGrid is an advanced JavaScript grid/spreadsheet component

Some highlights:

* Adaptive virtual scrolling (handle hundreds of thousands of rows with extreme responsiveness)
* Extremely fast rendering speed
* Supports jQuery UI Themes
* Background post-rendering for richer cells
* Configurable & customizable
* Full keyboard navigation
* Column resize/reorder/show/hide
* Column autosizing & force-fit
* Pluggable cell formatters & editors
* Support for editing and creating new rows.
* Grouping, filtering, custom aggregators, and more!
* Advanced detached & multi-field editors with undo/redo support.
* “GlobalEditorLock” to manage concurrent edits in cases where multiple Views on a page can edit the same data.
* Support for [millions of rows](http://stackoverflow.com/a/2569488/1269037)
