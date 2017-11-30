import React from 'react';
import Tile from './Tile.js';

require('./TilesGrid.css');

const CARD_IMAGES = [
  {
    imageUrl: './img/girls/1.png'
  }, {
    imageUrl: './img/girls/2.png'
  }, {
    imageUrl: './img/girls/3.png'
  }, {
    imageUrl: './img/girls/4.png'
  }, {
    imageUrl: './img/girls/5.png'
  }, {
    imageUrl: './img/girls/6.png'
  }, {
    imageUrl: './img/girls/7.png'
  }, {
    imageUrl: './img/girls/8.png'
  }, {
    imageUrl: './img/girls/9.png'
  }, {
    imageUrl: './img/girls/10.png'
  }, {
    imageUrl: './img/girls/11.png'
  }, {
    imageUrl: './img/girls/12.png'
  }, {
    imageUrl: './img/girls/13.png'
  }, {
    imageUrl: './img/girls/14.png'
  }, {
    imageUrl: './img/girls/15.png'
  }, {
    imageUrl: './img/girls/16.png'
  }, {
    imageUrl: './img/girls/17.png'
  }, {
    imageUrl: './img/girls/18.png'
  }
];
export {CARD_IMAGES};
function compareRandom(a, b) {
  return Math.random() - 0.5
};

class TilesGrid extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      mode: props.mode,
      tiles: null,
      grid: null,
      enabled: true,
      selectedCards: []   
    }
  }

  componentWillMount(){
    let newTiles = this._setTiles();
    let newGrid = this._setGrid(newTiles);
    this.setState({
      grid: newGrid,
      tiles: newTiles
    });
  }

  _setTiles(){
    let cardNums = (this.props.mode**2)/2;
    let tiles = CARD_IMAGES.slice(0, cardNums)
    tiles.forEach(function(element, index){
      element.pairNum = index;
    });
    tiles = tiles.concat(tiles);
    tiles.sort(compareRandom);
    return tiles;
  }

  _setGrid(tiles){
    let grid = [].concat(tiles);
    let finalgrid = [];
    let numcols = this.state.mode;
    let numrows = tiles.length/numcols;
    for(let i = 0; i < numrows; i++){    
      let row = grid.splice(0,numcols);
      finalgrid.push(row);
    }
    return finalgrid;
  }

  componentDidUpdate(){
    if (this.state.selectedCards.length == 2){
      this._compareCards();
    }
  }

  _compareCards(){
    let cards = [...this.state.selectedCards];
    this.setState({
      enabled: false
    });
    if(cards[0].props.el.pairNum == cards[1].props.el.pairNum){
      setTimeout(()=>{
        cards.map((tile)=>{
          tile.setState({
            isSolved: true
          })
        });
        this.setState({
          enabled: true
        });
        this.props.onSuccess();
      }, 1000);
      
    } else {
      setTimeout(()=>{
        cards.map((tile)=>{
          tile.setState({
            isOpened: false
          })
        });
        this.setState({
          enabled: true
        });
        this.props.onFail();
      }, 1000);
    }
    this.setState({
      selectedCards: [],
    });
  }

  _selectCards(card){
    if(this.state.selectedCards.length <= 1){
      this.setState({
        selectedCards: this.state.selectedCards.concat(card)
      })
    } 
  }

  render() {
    return (
      <div className="tiles-grid">
        {
          this.state.grid.map((row,index)=> {
            return(
              <div className="row" key={index}>
                {
                  row.map((element,index)=>{
                    return (
                      <Tile
                        key={index}
                        el={element}
                        mode={this.state.mode}
                        enabled={this.state.enabled}
                        onSelect={this._selectCards.bind(this)}
                      />
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>);
  }
}

export default TilesGrid;
