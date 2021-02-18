import React from 'react'
import RoomObject from './RoomObject.js'
import Job from './Job.js'

import * as constants from '../Utilities/StringsConst.js'

class CityTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomObjects: props.roomObjects,
            resources: props.resources,
            activities: props.activities,
            jobs: props.jobs,
            activeTab: props.activeTab,
        }
    }

    componentWillReceiveProps({activeTab, roomSlotUsed}) {
        this.setState({
            activeTab: activeTab
        })
    } 

    isUnlocked(obj) {
        let unlocked = obj.unlocked

        if (unlocked === false) {
            /** TO DO */
        }

        return unlocked
    }

    /*getTimeSlotUsed() {
        let timeSlotUsed = 0
        let jobs = this.state.jobs.slice()
        let roomObjs = this.state.roomObjects.slice()

        jobs.forEach(job => {
            timeSlotUsed += job.timeSlot
        });

        roomObjs.forEach(roomObj => {
            timeSlotUsed += roomObj.timeSlot
        });

        return timeSlotUsed
    }*/

    render() {
        let roomObjects = this.state.roomObjects.slice()
        let resources = this.state.resources.slice()
        let activities = this.state.activities.slice()
        let jobs = this.state.jobs.slice()

        return (
            <div className="Middle-Panel-City-Tab" style={{'display': this.state.activeTab === constants.TAB_002 ? 'block' : 'none'}}>
                <span>{resources[6].name} : {resources[6].currentValue}/{resources[6].maxValue}</span>

                <div className="Middle-Panel-City-Section-Container">
                    <div className="Middle-Panel-Section-Title">Job</div>
                    
                    <div className="Middle-Panel-Job-Panel ">
                        {jobs.map(job =>(
                            this.isUnlocked(job) && (
                                <div className="Middle-Panel-Job-Container">
                                   <Job resources={resources} job={job} />
                                </div>
                            )
                        ))}
                    </div>
                    
                </div>
                <div className="Middle-Panel-City-Section-Container">
                    <div className="Middle-Panel-Section-Title">Home</div>

                    <div className="Middle-Panel-Room-Panel">
                        {roomObjects.map(roomObject => (
                            this.isUnlocked(roomObject) && (
                                <span>
                                    <div className="Middle-Panel-RoomObj-Container">
                                        <RoomObject roomObject={roomObject} resources={resources} activities={activities} />
                                    </div>
                                </span>
                            )
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default CityTab;