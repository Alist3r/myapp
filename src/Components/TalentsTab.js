import React from 'react'

import * as constants from '../Utilities/StringsConst.js'
import Talent from './Talent.js'
import { checkUnlockCondition } from '../Utilities/UtilityFunctions.js'

class TalentsTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            talents: props.talents,
            resources: props.resources,
            activities: props.activities,
            activeTab: props.activeTab,
        }
    }

    componentWillReceiveProps({activeTab}) {
        this.setState({
            activeTab: activeTab
        })
    } 

    isUnlocked(talent) {

        if(talent.unlocked === false && talent.unlockedFrom !== null) {
            let unlockCondition = talent.unlockedFrom.slice()
            let resourcesList = this.state.resources.slice()
            let activityList = this.state.activities.slice()
            let talentList = this.state.talents.slice()

            let unlockable = checkUnlockCondition(resourcesList, activityList, talentList, unlockCondition)

            if(unlockable) {
                talent.unlocked = true
            }
        }

        return talent.unlocked
    }

    render() {
        let talents = this.state.talents.slice()
        let resources = this.state.resources.slice()
        let activities = this.state.activities.slice()

        return (
            <div className="Middle-Panel-City-Tab" style={{'display': this.state.activeTab === constants.TAB_002 ? 'block' : 'none'}}>
                                   
                <div className="Middle-Panel-City-Section-Container">
                
                    <div className="Middle-Panel-Room-Panel">
                        {talents.map(talent => (
                            this.isUnlocked(talent) && talent.isBought === false && (
                                <span>
                                    <div className="Middle-Panel-RoomObj-Container">
                                        <Talent talent={talent} resources={resources} activities={activities} />
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

export default TalentsTab;