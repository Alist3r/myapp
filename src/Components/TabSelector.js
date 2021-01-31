import React from 'react'

class TabSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: props.tab,
      isActive: props.isActive,
      resources: this.props.resources,
      activities: this.props.activities
    }
  }

  isUnlocked() {
    let tab = this.state.tab
    let resources = this.state.resources.slice()
    let activities = this.state.activities.slice()
    
    if(tab.unlocked === false) {
      let unlockCondition = tab.unlockedFrom.slice()
      let unlockable = true

      for (let i=0; i < unlockCondition.length; i++) {

          //UNLOCK BY RESOURCES VALUES
          if(unlockable && unlockCondition[i].resource != null) {
              let index = resources.findIndex(x => x.name === unlockCondition[i].resource) 
              if (resources[index].currentValue >= unlockCondition[i].neededValue)
                  unlockable = true
              else {
                  unlockable = false
              }   
          }

          //UNLOCK BY ACTIVITY STAGE
          if(unlockable && unlockCondition[i].activity != null) {
              let index = activities.findIndex(x => x.name === unlockCondition[i].activity)
              if (activities[index].stage >= unlockCondition[i].neededStage)
                  unlockable = true
              else
                  unlockable = false
          }
          
      }

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
                style={{'text-decoration': this.props.isActive ? 'underline' : 'none'}} 
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

