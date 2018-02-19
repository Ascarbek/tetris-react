import React from 'react';
import classNames from 'classnames';

import './PlayBoard.css';

import Block from '../Block/Block';

class PlayBoard extends React.Component {
  render() {
    return (
      <div className={classNames('play-board', {'animate-rows': this.props.animateRows})}>
        {this.props.board.map((r, rowIndex) => (
          <div key={rowIndex} className={classNames('board-row', {'scale-out': this.props.outRows[rowIndex]})}>{r.map((b, index) => (
            b === 1 ? <Block key={index} visible={true}/> : <Block key={index} visible={false}/>
          ))}</div>
        ))}
      </div>
    )
  }
}

export default PlayBoard;
