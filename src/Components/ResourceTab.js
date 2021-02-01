import React from 'react'
import Resource from './Resource.js'

import * as constants from '../Utilities/StringsConst.js'

class ResourceTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resources: props.resources,
        }
    }

    unlockResource(resource) {
        if(resource.unlocked === false && resource.currentValue > 0)
            resource.unlocked = true
        
        return resource.unlocked
    }

    render() {
        let resources = this.state.resources.slice()

        return (
            <div>
                {resources.map(resource => (                                     
                    <div style={{'visibility': resource.type !== constants.RES_TYPE_002.name ? 'visible' : 'hidden'}}>
                        {this.unlockResource(resource) && (<Resource  resource={resource} />)}
                    </div>                                     
                ))}
           </div>
        )
    }
}

export default ResourceTab;