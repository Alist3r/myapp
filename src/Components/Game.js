import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import ActivityPanel from './ActivityPanel.js'
import RoomObject from './RoomObject.js'
import TopBar from './TopBar.js'
import BeltResourcePanel from './BeltResourcePanel.js'

import resourcesList from '../Utilities/ResourcesList.js'
import activityList from '../Utilities/ActivityList.js'
import roomObjectsList from '../Utilities/RoomObjectsList.js'
import tabList from '../Utilities/TabList.js'
import * as utility from '../Utilities/UtilityFunctions.js'
import * as constants from '../Utilities/StringsConst.js'
import TabSelector from './TabSelector.js'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            gameResources: resourcesList.slice(),
            gameActivities: activityList.slice(),
            gameRoomObjects: roomObjectsList.slice(),
            activeTab: constants.TAB_002,
            roomSlot: 3
        }
        
        //If a storage exist, the load the datas
        this.state = utility.loadState(this.state);   
    }

    tick() {
       this.setState({})
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }  

    unlockActivity(activity) {
        let unlocked = activity.unlocked

        if(unlocked === false) {
            let unlockCondition = activity.unlockedFrom.slice()
            let unlockable = true
            let resourcesList = this.state.gameResources.slice()
            let activityList = this.state.gameActivities.slice()

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

    unlockResource(resource) {
        if(resource.unlocked === false && resource.currentValue > 0)
            resource.unlocked = true
        
        return resource.unlocked
    }

    updateActiveTab = (tabToActivate) => {
        this.setState({
            activeTab: tabToActivate
        })
    }
   

    render() {
        let gameResources = this.state.gameResources.slice()
        let gameActivities = this.state.gameActivities.slice()
        let gameRoomObjects = this.state.gameRoomObjects.slice()
 
        return(
            
            <div className="Game-Main-Container">
                <TopBar gameState={this.state}/>
                <div className="Left-Panel">
                    {gameResources.map(resource => (                                     
                         <div style={{'visibility': resource.type !== constants.RES_TYPE_002.name ? 'visible' : 'hidden'}}>{this.unlockResource(resource) && (<ResourcePanel  resource={resource} />)}</div>                                     
                    ))}
                </div>

                <div className="Middle-Panel">
                    {/** TABS SELECTOR */}
                    <div className="Middle-Panel-Tabs-Container">
                        {tabList.map(tab => (
                            <TabSelector tab={tab} isActive={this.state.activeTab === tab.name ? true : false} resources={gameResources} activities={gameActivities} updateActiveTab={this.updateActiveTab}/>
                        ))}
                    </div>
                    
                    <div className="Middle-Panel-Game-View">
                        {/** ACTIVITY PANEL */}
                        <div className="Middle-Panel-Activity-Tab" style={{'display': this.state.activeTab === constants.TAB_001 ? 'block' : 'none'}}>
                            {gameActivities.map(activity => (                  
                                this.unlockActivity(activity) && (
                                    <div className="Middle-Panel-Activity-Container" > 
                                        <ActivityPanel activity={activity} resources ={gameResources} />
                                    </div>
                                )             
                            ))}     
                        </div>  

                        {/** YOUR ROOM PANEL */}
                        <div className="Middle-Panel-Room-Tab" style={{'display': this.state.activeTab === constants.TAB_002 ? 'block' : 'none'}}>
                            <div className="Middle-Panel-Room-Slot">
                                <div className="Middle-Panel-Room-Slot-Label">Room Slot</div>
                                <div className="Middle-Panel-Room-Slot-Value">{this.state.roomSlot}</div>
                            </div>
                            <div>
                                {gameRoomObjects.map(roomObject => (
                                    <div className="Middle-Panel-RoomObj-Container">
                                        <RoomObject roomObject={roomObject} resources = {gameResources} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>  

                    {/** BELT RESOURCE PANEL */}
                    <div className="Middle-Panel-Bag-Resources">
                        {gameResources.map(resource => (                                     
                            resource.type === constants.RES_TYPE_002.name && (<div>{this.unlockResource(resource) && (<BeltResourcePanel  resource={resource} />)}</div>)                               
                        ))}
                    </div> 
                </div>
            </div>                        
            
        )
    }
}

export default Game;

