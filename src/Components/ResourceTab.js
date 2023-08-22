import React from 'react'
import Resource from './Resource.js'

import * as constants from '../Utilities/StringsConst.js'

class ResourceTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameState: props.gameState
        }
    }

    unlockResource(resource) {
        if(resource.unlocked === false && resource.currentValue > 0) //if resource si locked but the value is > 0
            resource.unlocked = true
        
        return resource.unlocked
    }

    render() {
        let resources = this.state.gameState.gameResources.slice()

        return (
            <div>
                {resources.map(resource => (                    
                    <div style={{'visibility': resource.type !== constants.RES_TYPE_002.name ? 'visible' : 'hidden'}}>
                        {this.unlockResource(resource) && (
                            <Resource  resource={resource} gameState={this.state.gameState}/>
                        )}
                    </div>                                     
                ))}
           </div>
        )
    }
}

export default ResourceTab;