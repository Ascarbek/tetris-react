import React from 'react';

import './Figure.css';

import Block from '../Block/Block';

class Figure extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="figure">
        {this.props.shape.map((r) => (
          <div className="figure-row">{r.map((ccc) => (
            ccc === 1 ? <Block visible={true}/> : <Block visible={false}/>
          ))}</div>
        ))}
      </div>
    )
  }
}

export default Figure;
