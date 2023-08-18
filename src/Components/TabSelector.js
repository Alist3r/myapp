import React from 'react'
import {checkUnlockCondition} from '../Utilities/UtilityFunctions.js'

class TabSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: props.tab,
      isActive: props.isActive,
      resources: props.resources,
      activities: props.activities,
      talents: props.talents
    }
  }

  isUnlocked() {
    let tab = this.state.tab
    let resources = this.state.resources.slice()
    let activities = this.state.activities.slice()
    let talents = this.state.talents.slice()
    
    if(tab.unlocked === false) {
      let unlockCondition = tab.unlockedFrom.slice()
      
      let unlockable = checkUnlockCondition(resources, activities, unlockCondition)

      if(unlockable) {
        tab.unlocked = true
      }
    }

    return tab.unlocked
  }

  render() {
    let tab = this.state.tab

    return(
      <span>
        {this.isUnlocked() && (<span>
          <span className="Middle-Panel-Tab-Name" 
                style={{'font-weight': this.props.isActive ? 'bold' : 'normal'}} 
                onClick={() => this.props.updateActiveTab(tab.name)}
          >
                  {tab.name}
          </span>       
          <span> / </span>
        </span>)} 
      </span>
    )

  }
}

export default TabSelector;

