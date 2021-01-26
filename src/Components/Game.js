import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import ActivityPanel from './ActivityPanel.js'
import GameTime from './GameTime.js'

import resourcesList from '../Utilities/ResourcesList.js'
import activityList from '../Utilities/ActivityList.js'
import {loadState} from '../Utilities/UtilityFunctions.js'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            gameResources: resourcesList.slice(),
            gameActivities: activityList.slice()
        }
        
        //If a storage exist, the load the datas
        this.state = loadState(this.state);   
    }

    tick() {
        this.setState({
            
        });
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

    render() {
        let gameResources = this.state.gameResources.slice()
        let gameActivities = this.state.gameActivities.slice()
        let i=0;
        let j=0;
        return(
            <div>
                <GameTime gameState={this.state} />
                <table id='mainTable'>
                    <tr>
                        <td>
                            <table> 
                                {gameResources.map(resource => (
                                    <tr key={i++}>                  
                                        <td><ResourcePanel  resourceData={resource}  /></td>                   
                                    </tr>
                                ))}
                            </table>
                        </td>
                        <td>
                            <table>
                                {gameActivities.map(activity => (
                                    <tr key={j++}>                  
                                        <td>
                                            <ActivityPanel activity={activity} resourcesList ={gameResources} />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </td>
                    </tr>

                </table>
            </div>                        
            
        )
    }
}

export default Game;

