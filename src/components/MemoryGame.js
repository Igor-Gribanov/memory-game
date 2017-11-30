import React from 'react';
import GameControls from './GameControls.js';
import GameInfo from './GameInfo.js';
import TilesGrid from './TilesGrid.js';
import {CARD_IMAGES} from './TilesGrid.js';

require('./MemoryGame.css');

class MemoryGame extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      rounds: 0,
      mode: props.mode,
      pairs: (props.mode**2)/2,
      imagePreload: true,
      isStarted: true,
      isFinished: false,
      restart: false,
      results: []
    }
  }
  _imagesPreload(){
    return(
      <div className="image-preload">
        {
          CARD_IMAGES.map((element, index)=>{
            return(
              <img key={index} src={element.imageUrl}/>
            );
          })
        }
      </div>
    );
  }
  _removeMatch(){
    this.setState({
      pairs: this.state.pairs - 1
    })
  }

  _nextRound(){
    this.setState({
      rounds: this.state.rounds + 1
    })
  }

  componentWillMount(){
    let result = JSON.parse(localStorage.getItem("results"));

    if (result != null){
      this.setState({
        results: result
      });
    }
  }

  componentDidUpdate(){
    if (!this.state.isFinished && this.state.pairs == 0){
      this.setState({
        isFinished: true
      })
      this._saveResults();
    }
    if(this.state.restart){
      this.setState({
        restart: false,
      })
    }
  }
  componentDidMount(){
    if(this.state.imagePreload){
      this.setState({
        imagePreload: false,
      })
    }
  }
  _startGame(){
    this.setState({
      isStarted: true,
      isFinished: false,
      restart: true,
      rounds: 0,
      pairs: (this.state.mode**2)/2
    })
  }

  _setMode(mode){
    this.setState({
      isStarted: true,
      isFinished: false,
      restart: true,
      rounds: 0,
      mode: mode,
      pairs: (mode**2)/2
    })
  }

  _saveResults(){
    let results = [].concat(this.state.results);
    let recentResult = {
      mode: this.state.mode,
      rounds: this.state.rounds
    }
    results = results.concat(recentResult);
    var serializeResult = JSON.stringify(results);
    localStorage.setItem("results", serializeResult);
    this.setState({
      results: results
    })
  }

  _getPluralEnding(){
    let rounds = this.state.rounds;
    if (rounds >= 11 && rounds <= 14)
      return "ов";
    else{
      let lastDigit = rounds % 10;
      if (lastDigit == 1){
        return "";
      } else if (lastDigit >= 2 && lastDigit <= 4){
        return "a";
      } else {
        return "ов"
      }
    }
  }

  render() {
    let isTileGridRender = this.state.isStarted && !this.state.isFinished && !this.state.restart;
    let isResultsOpen = true;
    return (
      <div className="memory-game">
        {
          this.state.imagePreload ?
            this._imagesPreload()
          : null
        }
        <GameControls 
          results={this.state.results} 
          onStart={this._startGame.bind(this)} 
          changeMode={this._setMode.bind(this)} 
          mode={this.state.mode}
        />
        <GameInfo rounds={this.state.rounds}/>
        {
          isTileGridRender ?
            <TilesGrid 
              onFail={this._nextRound.bind(this)} 
              onSuccess={this._removeMatch.bind(this)} 
              mode={this.state.mode}
            />
          :
            <div className="winner-congratz">
              <div className="congatz-message">
                <div className="message-header">
                  <span>Поздравляем!</span>
                </div>
                <div className="message-body">
                  <span>{`Вы прошли игру в режиме ${this.state.mode}х${this.state.mode} за ${this.state.rounds} раунд${this._getPluralEnding()}`}</span>
                </div>
                <div className="message-footer">
                  <span className="footer-button" onClick={this._startGame.bind(this)}>Начать заново</span>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default MemoryGame;
