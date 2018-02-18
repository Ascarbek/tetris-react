import React from 'react';

import './Figure.css';

import Block from '../Block/Block';

import { shapeL } from './figureConfig';

class Figure extends React.Component {
  constructor() {
    super();

    this.shape = shapeL();
  }

  render() {
    return (
      <div className="figure">
        {this.shape.map((r) => (
          <div className="figure-row">{r.map((ccc) => (
            ccc === 1 ? <Block/> : ''
          ))}</div>
        ))}
      </div>
    )
  }
}

export default Figure;
