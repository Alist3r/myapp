import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import ActivityPanel from './ActivityPanel.js'
import TopBar from './TopBar.js'

import resourcesList from '../Utilities/ResourcesList.js'
import activityList from '../Utilities/ActivityList.js'
import * as utility from '../Utilities/UtilityFunctions.js'
import * as constants from '../Utilities/StringsConst.js'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            gameResources: resourcesList.slice(),
            gameActivities: activityList.slice(),
            activeTab: constants.TAB_ACT
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

    updateActiveTab(tabToActivate) {
        this.setState({
            activeTab: tabToActivate
        })
    }
   

    render() {
        let gameResources = this.state.gameResources.slice()
        let gameActivities = this.state.gameActivities.slice()
 
        return(
            
            <div className="Game-Main-Container">
                <TopBar gameState={this.state}/>
                <div className="Left-Panel">
                    {gameResources.map(resource => (                                     
                        <div>{this.unlockResource(resource) && (<ResourcePanel  resource={resource} />)}</div>                                        
                    ))}
                </div>

                <div className="Middle-Panel">
                    {/** TABS SELECTOR */}
                    <div className="Middle-Panel-Tabs-Container">
                        <span className="Middle-Panel-Tab-Name" style={{'fontWeight': this.state.activeTab === constants.TAB_ACT ? 'bold' : 'normal'}} onClick={() => this.updateActiveTab(constants.TAB_ACT)}>{constants.TAB_ACT}</span>
                        <span>|</span>
                        <span className="Middle-Panel-Tab-Name" style={{'fontWeight': this.state.activeTab === "Attributes" ? 'bold' : 'normal'}} onClick={() => this.updateActiveTab("Attributes")}>Attributes</span>
                    </div>
                    {/** ACTIVITY PANEL */}
                    <div className="Middle-Panel-Game-View">
                        <div className="Middle-Panel-Activity-Tab" style={{'visibility': this.state.activeTab === constants.TAB_ACT ? 'visible' : 'hidden'}}>
                            {gameActivities.map(activity => (                  
                                this.unlockActivity(activity) && (
                                    <div className="Middle-Panel-Activity-Container" > 
                                        <ActivityPanel activity={activity} resources ={gameResources} />
                                    </div>
                                )             
                            ))}     
                        </div>  
                    </div>     
                </div>
            </div>                        
            
        )
    }
}

export default Game;

