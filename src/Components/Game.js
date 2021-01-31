import React from 'react'
import ResourceTab from './ResourceTab.js'
import ActivityTab from './ActivityTab.js'
import RoomTab from './RoomTab.js'
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
            activeTab: constants.TAB_001,
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

                {/** TOP BAR */}
                <TopBar gameState={this.state}/>

                {/** LEFT PANEL */}
                <div className="Left-Panel">
                    {/** ACTIVITIY PANEL */}
                    <ResourceTab resources={gameResources}/>
                </div>

                {/** MILLE PANEL */}
                <div className="Middle-Panel">
                    {/** TABS SELECTOR */}
                    <div className="Middle-Panel-Tabs-Container">
                        {tabList.map(tab => (
                            <TabSelector tab={tab} isActive={this.state.activeTab === tab.name ? true : false} resources={gameResources} activities={gameActivities} updateActiveTab={this.updateActiveTab}/>
                        ))}
                    </div>
                    
                    <div className="Middle-Panel-Game-View">
                        {/** ACTIVITY PANEL */}
                        <ActivityTab activities={gameActivities} resources={gameResources} activeTab={this.state.activeTab} />

                        {/** YOUR ROOM PANEL */}
                        <RoomTab roomObjects={gameRoomObjects} resources={gameResources} activeTab={this.state.activeTab} roomSlot={this.state.roomSlot}/>
                        
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

