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

  render() {
    let roomObject = this.state.roomObject

    return(
      <div className="RoomObject-Btn">
        <span className="RoomObject-Btn-Label">
          {roomObject.name} {roomObject.stage != null && roomObject.isBought && (<span>[{roomObject.stage}]</span>)}
        </span>

        {roomObject.isBought === false && (<button onClick={(e) => {e.stopPropagation(); this.buyObject()}} className="Activity-Btn-Sell">Buy</button>)}

      </div>
    )
  }
}

export default RoomObject;

