import React from 'react'
import Resource from './Resource.js'

import * as constants from '../Utilities/StringsConst.js'

class ResourceTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resources: props.resources,
            globalEffects: props.globalEffects
        }
    }

    unlockResource(resource) {
        if(resource.unlocked === false && resource.currentValue > 0)
            resource.unlocked = true
        
        return resource.unlocked
    }

    render() {
        let resources = this.state.resources.slice()
        let globalEffects = this.state.globalEffects.slice()

        return (
            <div>
                {resources.map(resource => (                    
                    <div style={{'visibility': resource.type !== constants.RES_TYPE_002.name ? 'visible' : 'hidden'}}>
                        {this.unlockResource(resource) && (<Resource  resource={resource} globalEffects={globalEffects}/>)}
                    </div>                                     
                ))}
           </div>
        )
    }
}

export default ResourceTab;