import React from 'react';

export default class Grid extends React.Component {

  cleanup(example){
    this.grid = example.init('#myGrid');
    example.onReady && example.onReady(this.grid);
    document.title = example.title;
  }

  componentDidMount(){
    const { example } = this.props;
    this.cleanup(example)
  }

  componentWillReceiveProps({example}){
    this.cleanup(example)
  }

  componentWillUnmount(){
    this.grid.destroy();
  }

  render(){
    console.info(this.grid, this.props.example)
    return <div className="demo column is-two-thirds">
      <div id="myGrid" style={{width:`100%`,height:`500px`}} className='slickgrid-container' />
    </div>;
  }
}
