import React from 'react'
import RoomObject from './RoomObject.js'

import * as constants from '../Utilities/StringsConst.js'

class RoomObjectTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomObjects: props.roomObjects,
            resources: props.resources,
            activeTab: props.activeTab,
            roomSlotUsed: props.roomSlotUsed,
            roomSlotMax: props.roomSlotMax
        }
    }

    componentWillReceiveProps({activeTab, roomSlotUsed}) {
        this.setState({
            activeTab: activeTab,
            roomSlotUsed: roomSlotUsed
        })
    } 

    isUnlocked(roomObj) {
        let unlocked = roomObj.unlocked

        if (unlocked === false) {
            /** TO DO */
        }

        return unlocked
    }

    render() {
        let roomObjects = this.state.roomObjects.slice()
        let resources = this.state.resources.slice()

        return (
            <div className="Middle-Panel-Room-Tab" style={{'display': this.state.activeTab === constants.TAB_002 ? 'block' : 'none'}}>
                <div className="Middle-Panel-Room-Slot-Label">Room Slot</div>
                <div className="Middle-Panel-Room-Slot-Value">{this.state.roomSlotUsed}/{this.state.roomSlotMax}</div>

                <div className="Middle-Panel-Room-Panel">
                    {roomObjects.map(roomObject => (
                        this.isUnlocked(roomObject) && (
                            <div className="Middle-Panel-RoomObj-Container">
                                <RoomObject changeRoomSlotUsed={this.props.changeRoomSlotUsed} roomObject={roomObject} resources={resources} roomSlotUsed={this.state.roomSlotUsed} roomSlotMax={this.state.roomSlotMax}/>
                            </div>
                        )
                    ))}
                </div>
            </div>
        )
    }
}

export default RoomObjectTab;