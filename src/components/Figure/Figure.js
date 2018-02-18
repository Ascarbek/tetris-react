import React from 'react';

import './Figure.css';

import Block from '../Block/Block';

class Figure extends React.Component {
  render() {
    return (
      <div className="figure">
        {this.props.shape.map((r, rowIndex) => (
          <div key={rowIndex} className="figure-row">{r.map((b, index) => (
            b === 1 ? <Block key={index} visible={true}/> : <Block key={index} visible={false}/>
          ))}</div>
        ))}
      </div>
    )
  }
}

export default Figure;
