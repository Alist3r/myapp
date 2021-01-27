import React from 'react'
import * as utility from '../Utilities/UtilityFunctions.js'
import * as constants from '../Utilities/StringsConst.js'

class TopBar extends React.Component {
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

  timeCounterConverter(number){
    let timeStamp = number
    let hours = Math.floor(timeStamp / 60 / 60)
    let minutes = Math.floor(timeStamp / 60) - (hours * 60);
    let seconds = timeStamp % 60

    let formattedTimeStamp = hours + "h " + minutes + "m " + seconds + "s "
    return formattedTimeStamp
  }

  resetData() {
    localStorage.clear()
    window.location.reload();
  }

  render() {
      return(
        <div className="Top-Bar">
          <div className="Top-Bar-Div">Game Time: {this.timeCounterConverter(this.state.gameState.gameTime)}</div>
          <div className="Top-Bar-Div">Game Speed: {constants.OPT_GAMESPEED}x</div>
          <div className="Top-Bar-Div"><button onClick={() => this.resetData()}>Clear Storage</button></div>    
        </div>     
      )
    }
}

export default TopBar;

