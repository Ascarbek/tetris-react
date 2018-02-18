import React from 'react';

import './Main.css'

import Block from "../Block/Block";
import Figure from "../Figure/Figure";

import { shapeL, shapeT, shapeI, shapeZ } from './../Figure/figureConfig';

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Figure shape={shapeZ()}/>
      </div>
    )
  }
}

export default Main;
