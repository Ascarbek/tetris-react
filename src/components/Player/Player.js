import React from 'react';
import { Map, List } from 'immutable';

import './Player.css';

import PlayBoard from '../PlayBoard/PlayBoard';

import * as shapes from '../Figure/shapes';
import { clearBoard } from "./board";
import ActiveFigure from "../ActiveFigure/ActiveFigure";
import GameOver from "../GameOver/GameOver";

const boardWidth = 10;
const boardHeight = 20;

class Player extends React.Component {
  constructor() {
    super();
    this.canPutFigure = this.canPutFigure.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.gameMove = this.gameMove.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.changeFigurePosition = this.changeFigurePosition.bind(this);
    this.fixFigureOnBoard = this.fixFigureOnBoard.bind(this);
    this.resetActiveFigure = this.resetActiveFigure.bind(this);
    this.drop = this.drop.bind(this);

    let keys = Object.keys(shapes);
    let rand = Math.floor(Math.random() * (keys.length));
    let newShape = shapes[keys[rand]].call(null);

    this.state = {
      board: clearBoard,
      left: Math.floor(boardWidth/2),
      top: 0,
      shapeIndex: rand,
      playingShape: newShape,
      animateShape: true,
      isGameOver: false
    };

    this.intervalHandle = setInterval(this.gameMove, 1000);
  }

  gameMove() {
    if(this.canPutFigure(this.state.board, this.state.playingShape, this.state.left, this.state.top + 1)) {
      this.moveDown();
    }
    else {
      this.resetActiveFigure(List(this.state.board).toJS(), List(this.state.playingShape).toJS(), this.state.left, this.state.top);
    }
  }

  resetActiveFigure(board, playingShape, left, top) {
    let keys = Object.keys(shapes);

    let rand = Math.floor(Math.random() * (keys.length));
    while (rand === this.state.shapeIndex){
      rand = Math.floor(Math.random() * (keys.length));
    }
    let newShape = shapes[keys[rand]].call(null);

    let newBoard = this.fixFigureOnBoard(board, playingShape, left, top);
    let newLeft = Math.trunc(boardWidth/2);

    if(!this.canPutFigure(newBoard, newShape, newLeft, 0)) {
      this.setState(Map(this.state)
        .set('isGameOver', true)
        .toJS()
      );
      clearInterval(this.intervalHandle);
      return;
    }

    this.setState(Map(this.state)
      .set('board', newBoard)
      .set('playingShape', newShape)
      .set('shapeIndex', rand)
      .set('left', newLeft)
      .set('top', 0)
      .set('animateShape', false)
      .toJS()
    );
  }

  fixFigureOnBoard(board, shape, left, top) {
    for(let fr=0; fr<shape.length; fr++) {
      for (let fc = 0; fc < shape[fr].length; fc++) {
        if(shape[fr][fc] === 1) {
          board[top + fr][left + fc] = shape[fr][fc];
        }
      }
    }
    return board;
  }

  drop() {
    let r;
    for(r=0; r<boardHeight - this.state.top - this.state.playingShape.length + 1; r++) {
      if(!this.canPutFigure(this.state.board, this.state.playingShape, this.state.left, this.state.top + r)) {
        break;
      }
    }
    this.changeFigurePosition(this.state.left, this.state.top + r - 1, true);

    clearInterval(this.intervalHandle);
    setTimeout(() => {
      this.gameMove();

      this.intervalHandle = setInterval(this.gameMove, 1000);
    }, 300);

  }

  canPutFigure(board, shape, left, top) {
    if(top + shape.length > boardHeight) return false;
    for(let fr=0; fr<shape.length; fr++) {
      for(let fc=0; fc<shape[fr].length; fc++) {
        if((board[top + fr][left + fc] !== 0) && (shape[fr][fc] !== 0)) {
          return false
        }
      }
    }

    return true;
  }

  changeFigurePosition(left, top, animate) {
    this.setState(Map(this.state)
      .set('left', left)
      .set('top', top)
      .set('animateShape', animate)
      .toJS()
    );
  }

  moveDown() {
    this.changeFigurePosition(this.state.left, this.state.top + 1, true);
  }

  moveLeft() {
    if((this.state.left > 0)
    && this.canPutFigure(this.state.board, this.state.playingShape, this.state.left - 1, this.state.top)) {
      this.changeFigurePosition(this.state.left - 1, this.state.top, true);
    }
  }

  moveRight() {
    if((this.state.left < boardWidth - this.state.playingShape[0].length + 1 - 1)
    && this.canPutFigure(this.state.board, this.state.playingShape, this.state.left + 1, this.state.top)) {
      this.changeFigurePosition(this.state.left + 1, this.state.top, true);
    }
  }

  rotate(shape) {
    let newShape = [];
    for(let fr=0; fr<shape.length; fr++) {
      for(let fc=0; fc<shape[fr].length; fc++) {
        if(!newShape[fc]) {
          newShape[fc] = [];
        }
        newShape[fc][shape.length - fr - 1] = shape[fr][fc];
      }
    }

    this.setState(Map(this.state)
      .set('playingShape', newShape)
      .set('left', this.state.left + newShape[0].length > boardWidth ? this.state.left - (this.state.left + newShape[0].length - boardWidth) : this.state.left)
      .toJS()
    );
  }

  onKeyDown(e) {
    if(e.keyCode === 37) {
      this.moveLeft();
    }

    if(e.keyCode === 39) {
      this.moveRight();
    }

    if(e.keyCode === 38) {
      this.rotate(this.state.playingShape);
    }

    if(e.keyCode === 32) {
      this.drop();
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

        <ActiveFigure left={this.state.left} top={this.state.top} shape={this.state.playingShape} animating={this.state.animateShape}>

        </ActiveFigure>

        {this.state.isGameOver ? <GameOver/> : ''}
      </div>
    )
  }
}

export default Player;
