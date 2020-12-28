import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import ResourcesList from '../Utilities/ResourcesList.js'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            gameResources: ResourcesList.slice()
        }
    }

    tick() {
        this.setState({
            gameTime: this.state.gameTime + 1
        });
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
            <div>
                <div>Game Time: {this.state.gameTime}</div>
                <table> 
                    {gameResources.map(resource => (
                        <tr key={i++}>                  
                            <td><ResourcePanel  resourceData={resource}  /></td>                   
                        </tr>
                    ))}
                </table>
            </div>
            
        )
    }
}

export default Game;

