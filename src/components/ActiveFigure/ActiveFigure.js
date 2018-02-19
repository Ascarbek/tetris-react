import React from 'react';
import classNames from 'classnames';

import './ActiveFigure.css'

import Figure from "../Figure/Figure";

const padding = 5, blockSize = 26;

class ActiveFigure extends React.Component {
  render() {
    return (
      <div className={classNames('active-figure', {'animating': this.props.animating})} style={{
        left: (padding + blockSize*this.props.left) + 'px',
        top: (padding + blockSize*this.props.top) + 'px'
      }}>
        <Figure shape={this.props.shape}/>
      </div>
    )
  }
}

export default ActiveFigure;
