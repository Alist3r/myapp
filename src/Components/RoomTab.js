import React from 'react'
import RoomObject from './RoomObject.js'

import * as constants from '../Utilities/StringsConst.js'

class RoomTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomObjects: props.roomObjects,
            resources: props.resources,
            activeTab: props.activeTab,
            roomSlot: props.roomSlot
        }
    }

    componentWillReceiveProps({activeTab}) {
        this.setState({
            activeTab: activeTab
        })
    }

    render() {
        let roomObjects = this.state.roomObjects.slice()
        let resources = this.state.resources.slice()

        return (
            <div className="Middle-Panel-Room-Tab" style={{'display': this.state.activeTab === constants.TAB_002 ? 'block' : 'none'}}>
                <div className="Middle-Panel-Room-Slot">
                    <div className="Middle-Panel-Room-Slot-Label">Room Slot</div>
                    <div className="Middle-Panel-Room-Slot-Value">{this.state.roomSlot}</div>
                </div>
                <div className="Middle-Panel-Room-Panel">
                    {roomObjects.map(roomObject => (
                        <div className="Middle-Panel-RoomObj-Container">
                            <RoomObject roomObject={roomObject} resources={resources} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default RoomTab;