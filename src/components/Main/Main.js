import React from 'react';

import './Main.css'

import Player from "../Player/Player";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Player/>
      </div>
    )
  }
}

export default Main;
