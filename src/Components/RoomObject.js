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

  render() {
    return(
      <div>
        {this.state.roomObject.name}
      </div>
    )
  }
}

export default RoomObject;

