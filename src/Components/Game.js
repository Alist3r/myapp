import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import resourcesList from '../Utilities/ResourcesList.js'
import {saveState, loadState} from '../Utilities/UtilityFunctions.js'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            gameResources: resourcesList.slice()
        }
        
        //If a storage exist, the load the datas
        if(localStorage.getItem('gameTime')) {
            this.state = loadState();
        }
      
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
                        
                    </td>
                </tr>

            </table>
         
            
        )
    }
}

export default Game;

