import React from 'react';

import './Player.css';

import Figure from "../Figure/Figure";
import PlayBoard from '../PlayBoard/PlayBoard';

import * as shapes from '../Figure/shapes';
import { clearBoard } from "./board";

class Player extends React.Component {
  constructor() {
    super();

    this.state = {
      board: clearBoard,
      playingShape: shapes.shapeZ()
    }
  }

  render() {
    return (
      <div className="player">
        <PlayBoard board={this.state.board}>

        </PlayBoard>

        <Figure shape={this.state.playingShape}>

        </Figure>
      </div>
    )
  }
}

export default Player;
