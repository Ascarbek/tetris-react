import React from 'react';
import classNames from 'classnames';

import './Block.css';

class Block extends React.Component {
  render() {
    return (
      <div className={classNames('block', {'not-visible': !this.props.visible})}>

      </div>
    )
  }
}

export default Block;
