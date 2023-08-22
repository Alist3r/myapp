import React from 'react'
import Activity from './Activity.js'

import {checkUnlockCondition} from '../Utilities/UtilityFunctions.js'
import * as constants from '../Utilities/StringsConst.js'

class ActivityTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: props.activities,
            resources: props.resources,
            talents: props.talents,
            activeTab: props.activeTab
        }
    }

    isUnlocked(activity) {

        if(activity.unlocked === false && activity.unlockedFrom !== null) {
            let unlockCondition = activity.unlockedFrom.slice()
            let resourcesList = this.state.resources.slice()
            let activityList = this.state.activities.slice()
            let talentsList = this.state.talents.slice()

            let unlockable = checkUnlockCondition(resourcesList, activityList, talentsList, unlockCondition)

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
                    this.isUnlocked(activity) && (
                        <div className="Middle-Panel-Activity-Container" > 
                            <Activity updateResources={this.props.updateResources} activity={activity} resources={resources} />
                        </div>
                    )             
                ))}     
            </div>  
        )
    }
}

export default ActivityTab;