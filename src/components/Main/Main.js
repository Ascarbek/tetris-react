import React from 'react';

import './Main.css'

import Block from "../Block/Block";
import Figure from "../Figure/Figure";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Figure/>
      </div>
    )
  }
}

export default Main;
