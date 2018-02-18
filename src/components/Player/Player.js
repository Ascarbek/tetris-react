import React from 'react';
import { Map, List } from 'immutable';

import './Player.css';

import PlayBoard from '../PlayBoard/PlayBoard';

import * as shapes from '../Figure/shapes';
import { clearBoard } from "./board";
import ActiveFigure from "../ActiveFigure/ActiveFigure";

const boardWidth = 10;
const boardHeight = 20;

class Player extends React.Component {
  constructor() {
    super();
    this.moveDown = this.moveDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.gameMove = this.gameMove.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.changeFigurePosition = this.changeFigurePosition.bind(this);

    this.state = {
      board: clearBoard,
      left: 0,
      top: 0,
      playingShape: shapes.shapeZ()
    };

    this.intervalHandle = setInterval(this.gameMove, 1000);
  }

  gameMove() {
    this.moveDown();
  }

  changeFigurePosition(left, top) {
    this.setState(Map(this.state)
      .set('left', left)
      .set('top', top)
      .toJS()
    );
  }

  moveDown() {
    this.changeFigurePosition(this.state.left, this.state.top + 1);
  }

  moveLeft() {
    if(this.state.left > 0) {
      this.changeFigurePosition(this.state.left - 1, this.state.top);
    }
  }

  moveRight() {
    if(this.state.left < boardWidth - this.state.playingShape[0].length + 1 - 1) {
      this.changeFigurePosition(this.state.left + 1, this.state.top);
    }
  }

  onKeyDown(e) {
    // 32

    if(e.keyCode === 37) {
      this.moveLeft();
    }

    if(e.keyCode === 39) {
      this.moveRight()
    }
  }

  componentDidMount() {
    document.getElementById('player').focus();
  }

  onBlur() {
    document.getElementById('player').focus();
  }

  render() {
    return (
      <div id="player" className="player" onKeyDown={this.onKeyDown} tabIndex='1' onBlur={this.onBlur}>
        <PlayBoard board={this.state.board}>

        </PlayBoard>

        <ActiveFigure left={this.state.left} top={this.state.top} shape={this.state.playingShape}>

        </ActiveFigure>
      </div>
    )
  }
}

export default Player;
