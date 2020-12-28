import React from 'react'
import ResourcePanel from './ResourcesPanel.js'
import ResourcesList from '../Utilities/ResourcesList.js'

/*function updateResourceValue(id,value) {
    let resourceList = this.state.gameResources.slice()
    resourceList[id].currentValue = value
    this.setState({
        gameResources: resourceList,
        test: '1'
    })

}*/

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameResources: ResourcesList.slice()
        }
        //this.handlerChange = this.handlerChange.bind(this)
    }


    /**componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          100
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }  
    tick() {
        var updatedGameResources = this.state.gameResources.slice()

        if(updatedGameResources[0].currentValue < updatedGameResources[0].maxValue) {
            updatedGameResources[0].currentValue += (updatedGameResources[0].incRatio / 10)
        }
        else  {
            updatedGameResources[0].currentValue = updatedGameResources[0].maxValue
        }

        this.setState({
            gameResources: updatedGameResources
        });
    }**/

    /**handlerChange() {
        this.setState ({
           test: 'yyy'
        })
    }**/


    render() {
        var gameResources = this.state.gameResources.slice()
        return(
            <table>
                {gameResources.map(resource => (
                    <tr>                  
                        <td><ResourcePanel resourceData={resource} /></td>                   
                    </tr>
                ))}
            </table>
            
        )
    }
}

export default Game;

