import React    from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {

  render(){
    const { examples } = this.props;

    return <div className="menu-container column is-2">
      <p className="menu-label">
        Example list
      </p>
      <div className="menu">
        <ul className='menu-list'>
          {examples.map((example, index) => {
            return <li key={index}>
              <Link className="demo-link" to={`/examples/${index}`}>{example.title}</Link>
            </li>;
          })}
        </ul>
      </div>
    </div>;
  }
}

export default Menu;
