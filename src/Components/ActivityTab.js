import React from 'react'
import ActivityPanel from './ActivityPanel.js'

import * as constants from '../Utilities/StringsConst.js'

class ActivityTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: props.activities,
            resources: props.resources,
            activeTab: props.activeTab
        }
    }

    unlockActivity(activity) {
        let unlocked = activity.unlocked

        if(unlocked === false) {
            let unlockCondition = activity.unlockedFrom.slice()
            let unlockable = true
            let resourcesList = this.state.resources.slice()
            let activityList = this.state.activities.slice()

            for (let i=0; i < unlockCondition.length; i++) {

                //UNLOCK BY RESOURCES VALUES
                if(unlockable && unlockCondition[i].resource != null) {
                    let index = resourcesList.findIndex(x => x.name === unlockCondition[i].resource) 
                    if (resourcesList[index].currentValue >= unlockCondition[i].neededValue)
                        unlockable = true
                    else {
                        unlockable = false
                    }   
                }

                //UNLOCK BY ACTIVITY STAGE
                if(unlockable && unlockCondition[i].activity != null) {
                    let index = activityList.findIndex(x => x.name === unlockCondition[i].activity)
                    if (activityList[index].stage >= unlockCondition[i].neededStage)
                        unlockable = true
                    else
                        unlockable = false
                }
               
            }

            if(unlockable) {
                activity.unlocked = true
            }
        }
        return activity.unlocked
    }

    componentWillReceiveProps({activeTab}) {
        this.setState({
            activeTab: activeTab
        })
    }

    render() {
        let activities = this.state.activities.slice()
        let resources = this.state.resources.slice()

        return (
            <div className="Middle-Panel-Activity-Tab" style={{'display': this.state.activeTab === constants.TAB_001 ? 'block' : 'none'}}>
                {activities.map(activity => (                  
                    this.unlockActivity(activity) && (
                        <div className="Middle-Panel-Activity-Container" > 
                            <ActivityPanel activity={activity} resources ={resources} />
                        </div>
                    )             
                ))}     
            </div>  
        )
    }
}

export default ActivityTab;