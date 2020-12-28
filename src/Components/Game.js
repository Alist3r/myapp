import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import ActivityPanel from './ActivityPanel.js'

import resourcesList from '../Utilities/ResourcesList.js'
import activityList from '../Utilities/ActivityList.js'
import {saveState, loadState} from '../Utilities/UtilityFunctions.js'

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
            gameTime: this.state.gameTime + 1
        });

        if(this.state.gameTime % 5 === 0) {
            saveState(this.state)
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }  

    render() {
        let gameResources = this.state.gameResources.slice()
        let gameActivities = this.state.gameActivities.slice()
        let i=0;
        return(
            
            <table id='mainTable'>
                <tr>
                    <td>
                        <div>Game Time: {this.state.gameTime}</div>
                        {/* poi da togliere */}
                        <div><button onClick={() => {localStorage.clear()}}>Clear Storage</button></div>
                        {/* ^^^^^^^^^^^^^^^ */}
                        <table> 
                            {gameResources.map(resource => (
                                <tr key={i++}>                  
                                    <td><ResourcePanel  resourceData={resource}  /></td>                   
                                </tr>
                            ))}
                        </table>
                    </td>
                    <td>
                    <ActivityPanel activity={gameActivities[0]} />
                    </td>
                </tr>

            </table>
         
            
        )
    }
}

export default Game;

