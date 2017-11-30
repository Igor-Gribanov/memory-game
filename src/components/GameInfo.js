import React from 'react';

require('./GameInfo.css');

class GameInfo extends React.Component{
  render() {
    return (
      <div className="game-info">
        <span>Раундов: {this.props.rounds}</span>
      </div>);
  }
}

export default GameInfo;
