import React from 'react'
import * as utility from '../Utilities/UtilityFunctions.js'

class GameTime extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameState: props.gameState,
    }
  }

  tick() {
    let updateState = this.state.gameState
    updateState.gameTime += 1
    this.setState({
      gameState: updateState
    });

    if(updateState.gameTime % 5 === 0) {
        utility.saveState(this.state.gameState)
    }
}

componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
}

componentWillUnmount() {
    clearInterval(this.timerID);
}  

  render() {
      return(
        <div>
          <div>Game Time: {this.state.gameState.gameTime}</div>
          <div><button onClick={() => {localStorage.clear()}}>Clear Storage</button></div>    
        </div>     
      )
    }
}

export default GameTime;

