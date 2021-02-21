import React from 'react'
import Job from './Job.js'

import * as constants from '../Utilities/StringsConst.js'
import ShopItem from './ShopItem.js'
import { checkUnlockCondition } from '../Utilities/UtilityFunctions.js'

class CityTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopItems: props.shopItems,
            resources: props.resources,
            activities: props.activities,
            jobs: props.jobs,
            activeTab: props.activeTab,
            shopUnlocked: false
        }
    }

    componentWillReceiveProps({activeTab}) {
        this.setState({
            activeTab: activeTab
        })
    } 

    isUnlocked(obj) {

        if(obj.unlocked === false && obj.unlockedFrom !== null) {
            let unlockCondition = obj.unlockedFrom.slice()
            let resourcesList = this.state.resources.slice()
            let activityList = this.state.activities.slice()
            let shopItems = this.state.shopItems.slice()

            let unlockable = checkUnlockCondition(resourcesList, activityList, shopItems, unlockCondition)

            if(unlockable) {
                obj.unlocked = true
            }
        }

        return obj.unlocked
    }

    isShopUnlocked(demir) {
        if(this.state.shopUnlocked === false && demir > 30) {
            this.setState({
                shopUnlocked: true
            })
        }
        
        return this.state.shopUnlocked
    }

    render() {
        let shopItems = this.state.shopItems.slice()
        let resources = this.state.resources.slice()
        let activities = this.state.activities.slice()
        let jobs = this.state.jobs.slice()

        let demirIndex = resources.findIndex(x => x.name === constants.RES_005.name)

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

                {this.isShopUnlocked(resources[demirIndex].currentValue) && (<div className="Middle-Panel-City-Section-Container">
                    <div className="Middle-Panel-Section-Title">Shop</div>

                    <div className="Middle-Panel-Room-Panel">
                        {shopItems.map(item => (
                            this.isUnlocked(item) && item.isBought === false && (
                                <span>
                                    <div className="Middle-Panel-RoomObj-Container">
                                        <ShopItem item={item} resources={resources} activities={activities} />
                                    </div>
                                </span>
                            )
                        ))}
                    </div>
                </div>)}
               
              
            </div>
        )
    }
}

export default CityTab;