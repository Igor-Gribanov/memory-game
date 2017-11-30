import React from 'react';

require('./GameControls.css');

class GameControls extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isResultOpened: false
    }
  }
  _handleResultClick(){
    this.setState({
      isResultOpened: !this.state.isResultOpened
    });
  }
  _handleModeClick(mode){
    this.props.changeMode(mode);
  }
  _getResults(){
    if (this.state.isResultOpened && this.props.results.length > 0){
      return(
        <div className="game-results">
          {
            this.props.results.map((result, index)=>{
                return (
                  <div className="result-wrapper"key={index}>
                    <span className="result" key={index}>
                      {`Режим: ${result.mode} Раунды: ${result.rounds}`}
                    </span>
                  </div>);
            })
          }
        </div>
      );
    } else if (this.state.isResultOpened){
      return (
        <div className="game-results">
          <span>Результатов ещё нет</span>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="game-controls">
        <div>
          <span className="controls" onClick={this._handleResultClick.bind(this)}>Рекорды</span>
          {
            this._getResults()
          }
        </div>
        <div className="controls" onClick={this.props.onStart}>
          <span>Играть</span>
          <i className="fa fa-refresh restart-icon" aria-hidden="true"></i>
        </div>
        <div className="controls-mode">
          <span>Режим:</span>
          <div className="controls-mode__buttons">
            <div className="current-mode">
              <span className="current-mode_text">{`${this.props.mode}x${this.props.mode}`}</span>
              <i className="fa fa-caret-down current-mode_caret" aria-hidden="true"></i>
            </div>
            <div className="buttons__dropdown">
              <button className="option-button" onClick={this._handleModeClick.bind(this,4)}>4x4</button>
              <button className="option-button" onClick={this._handleModeClick.bind(this,6)}>6x6</button>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default GameControls;
