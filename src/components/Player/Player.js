import React from 'react';
import { Map, List } from 'immutable';

import './Player.css';

import PlayBoard from '../PlayBoard/PlayBoard';

import * as shapes from '../Figure/shapes';
import { clearBoard } from "./board";
import ActiveFigure from "../ActiveFigure/ActiveFigure";

class Player extends React.Component {
  constructor() {
    super();
    this.moveDown = this.moveDown.bind(this);

    this.state = {
      board: clearBoard,
      left: 0,
      top: 0,
      playingShape: shapes.shapeZ()
    };

    this.intervalHandle = setInterval(this.moveDown, 1000);
  }

  moveDown() {
    this.setState(Map(this.state)
      .set('top', this.state.top + 1)
      .toJS()
    );
  }

  render() {
    return (
      <div className="player">
        <PlayBoard board={this.state.board}>

        </PlayBoard>

        <ActiveFigure left={this.state.left} top={this.state.top} shape={this.state.playingShape}>

        </ActiveFigure>
      </div>
    )
  }
}

export default Player;
