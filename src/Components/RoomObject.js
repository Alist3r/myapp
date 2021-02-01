import React from 'react'
import Tooltip from '../Components/Tooltip.js'

class RoomObject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomObject: props.roomObject,
      resources: props.resources
    }
  }

  buyObject() {
    
  }

  getRoomObjectStyle(roomObj) {
    let className = "RoomObject-Btn"
    if(roomObj.isActive) 
      className = "RoomObject-Btn Active"

    return className
  }

  render() {
    let roomObject = this.state.roomObject

    return(
      <div className={this.getRoomObjectStyle(roomObject)}>
        <span className="RoomObject-Btn-Label">
          {roomObject.name} {roomObject.stage != null && roomObject.isBought && (<span>[{roomObject.stage}]</span>)}
        </span>

        {roomObject.isBought === false && (<button onClick={(e) => {e.stopPropagation(); this.buyObject()}} className="RoomObject-Btn-Sell">Buy</button>)}
        {roomObject.isActive === false && roomObject.isBought === true && (<button onClick={(e) => {e.stopPropagation(); this.activateObject()}} className="RoomObject-Btn-Sell">Use</button>)}

      </div>
    )
  }
}

export default RoomObject;

