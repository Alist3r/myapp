import React from 'react'
import RoomObject from './RoomObject.js'

import * as constants from '../Utilities/StringsConst.js'

class CityTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomObjects: props.roomObjects,
            resources: props.resources,
            activities: props.activities,
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
        let activities = this.state.activities.slice()

        return (
            <div className="Middle-Panel-City-Tab" style={{'display': this.state.activeTab === constants.TAB_002 ? 'block' : 'none'}}>
                <span>{resources[6].name} : {resources[6].currentValue}</span>
                <div className="Middle-Panel-City-Section-Container">
                    <div className="Middle-Panel-Section-Title">Job</div>

                    
                </div>
                <div className="Middle-Panel-City-Section-Container">
                    <div className="Middle-Panel-Section-Title">Home</div>

                    <div className="Middle-Panel-Room-Panel">
                        {roomObjects.map(roomObject => (
                            this.isUnlocked(roomObject) && (
                                <div className="Middle-Panel-RoomObj-Container">
                                    <RoomObject roomObject={roomObject} resources={resources} activities={activities} />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default CityTab;