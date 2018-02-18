import React from 'react';

import './PlayBoard.css';

import Block from '../Block/Block';

class PlayBoard extends React.Component {
  render() {
    return (
      <div className="play-board">
        {this.props.board.map((r, rowIndex) => (
          <div key={rowIndex} className="board-row">{r.map((b, index) => (
            b === 1 ? <Block key={index} visible={true}/> : <Block key={index} visible={false}/>
          ))}</div>
        ))}
      </div>
    )
  }
}

export default PlayBoard;
