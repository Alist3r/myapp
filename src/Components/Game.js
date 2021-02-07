import React from 'react'
import ResourceTab from './ResourceTab.js'
import ActivityTab from './ActivityTab.js'
import RoomObjectTab from './RoomObjectTab.js'
import TopBar from './TopBar.js'
import BeltResourcePanel from './BeltResourcePanel.js'

import resourcesList from '../Lists/ResourcesList.js'
import activityList from '../Lists/ActivityList.js'
import roomObjectsList from '../Lists/RoomObjectsList.js'
import globalEffectsList from '../Lists/GlobalEffectsList.js'
import tabList from '../Lists/TabList.js'
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
            gameGlobalEffects: globalEffectsList.slice(),
            activeTab: constants.TAB_001,
            roomSlotMax: 3,
            roomSlotUsed: 0,
        
        }     
        
        //If a storage exist, then load the datas
        this.state = utility.loadState(this.state);   
    }

    tick() {
       this.setState({})
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            constants.OPT_REFRESHRATE
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

    changeRoomSlotUsed = (roomSlotUsed) => {
        this.setState({
            roomSlotUsed: roomSlotUsed
        })
    }
   

    render() {
        let gameResources = this.state.gameResources.slice()
        let gameActivities = this.state.gameActivities.slice()
        let gameRoomObjects = this.state.gameRoomObjects.slice()
        let gameGlobalEffects = this.state.gameGlobalEffects.slice()
 
        return(
            
            <div className="Game-Main-Container">

                {/** TOP BAR */}
                <TopBar gameState={this.state}/>

                {/** LEFT PANEL */}
                <div className="Left-Panel">
                    {/** ACTIVITIY PANEL */}
                    <ResourceTab resources={gameResources} globalEffects={gameGlobalEffects}/>
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
                        {/** ACTIVITY TAB */}
                        <ActivityTab updateResources={this.updateResources} activities={gameActivities} resources={gameResources} globalEffects={gameGlobalEffects} activeTab={this.state.activeTab} />

                        {/** YOUR ROOM TAB */}
                        <RoomObjectTab changeRoomSlotUsed={this.changeRoomSlotUsed} roomObjects={gameRoomObjects} resources={gameResources} activities={gameActivities} activeTab={this.state.activeTab} roomSlotUsed={this.state.roomSlotUsed} roomSlotMax={this.state.roomSlotMax}/>
                        
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

