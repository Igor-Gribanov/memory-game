import React from 'react';

require('./Tile.css');

class Tile extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isOpened: false,
      isSolved: false
    };
  }
  
  _handleClick(){
    if (!this.props.enabled||this.state.isSolved||this.state.isOpened)
      return;
    this.setState({
      isOpened: true
    });
    this.props.onSelect(this);
  }

  _getClosedCard(){
    return (      
      <img className="tile tile_closed" src="./img/cover.png"/>
    );
  }
  _getOpenedCard(){
    let solvedStyle = {
      opacity: 0
    };
    return (      
      <div className="tile tile_open">
        <img className="image_open" src={this.props.el.imageUrl}/>
      </div>
    );
  }
  _getSolvedCard(){
    let solvedStyle = {
      opacity: 0
    };
    return (
      <img className="tile" src="./img/cover.png" style={solvedStyle}/> 
    );
  }

  render() {
    let card = this._getClosedCard();
    let wrapperClass = `tile-wrapper_${this.props.mode}`;
    if(this.state.isSolved){
      card = this._getSolvedCard();
    } else if(this.state.isOpened){
      card = this._getOpenedCard();
    }
    return (
      <div className={`tile-wrapper ${wrapperClass}`} onClick={this._handleClick.bind(this)}>
        {card}
      </div>);
  }
}

export default Tile;
