import React from 'react';

export default class Grid extends React.Component {

  cleanup(example, id){
    this.grid && this.grid.destroy();
    this.grid = example.init('#myGrid');
    const node = this.grid.getContainerNode();
    node.classList.remove(`example-${this.props.id}`);
    node.classList.add(`example-${id}`);

    example.onReady && example.onReady(this.grid);
    document.title = example.title;
  }

  componentDidMount(){
    const { example, id } = this.props;
    this.cleanup(example, id);
  }

  componentWillReceiveProps({example, id}){
    this.cleanup(example, id);
  }

  componentWillUnmount(){
    this.grid.destroy();
  }

  render(){
    return <div className="demo column">
      <div id="myGrid" style={{width:'100%',height:'400px'}} className='slickgrid-container' />
      <div className="log">
      </div>
    </div>;
  }
}
