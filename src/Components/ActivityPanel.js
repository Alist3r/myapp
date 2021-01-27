import React from 'react'
import Tooltip from '../Components/Tooltip.js'

class ActivityPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity,
      resources: props.resources
    }
  }


  doActivity() {
    var activityToDo = this.state.activity //one activity
    var resourcesList = this.state.resources
      
    var upgradable = true 
    var havetoPay = false
    var upgradeCosts = []
    var clickCosts = []

    if(activityToDo.upgradeCost != null) {
      upgradeCosts = activityToDo.upgradeCost.slice()
    
      upgradeCosts.forEach(cost => { //Checking if resources are enough
        let index = resourcesList.findIndex(x => x.name === cost.resource)
        if (upgradable && resourcesList[index].currentValue >= cost.cost)
          upgradable = true
        else
          upgradable = false
      })

      havetoPay = true
    }

    if(activityToDo.clickCost != null) {
      clickCosts = activityToDo.clickCost.slice()

      clickCosts.forEach(cost => {
        let index = resourcesList.findIndex(x => x.name === cost.resource)
        if (upgradable && resourcesList[index].currentValue >= cost.cost)
          upgradable = true
        else
          upgradable = false
      })

      havetoPay = true
    }

    if(upgradable) {
      let effects = activityToDo.effect.slice()

      //paying resources and update the next cost
      if(havetoPay) {
        for(let i=0; i<resourcesList.length;i++) {

          if(upgradeCosts.length > 0) {
            let index = upgradeCosts.findIndex(x => x.resource === resourcesList[i].name)  
            if(index !== -1) {
              resourcesList[i].currentValue -= upgradeCosts[index].cost  
              upgradeCosts[index].cost += ((upgradeCosts[index].upgradeCostRatio * upgradeCosts[index].cost))
            } 
          }

          if(clickCosts.length > 0) {
            let index = clickCosts.findIndex(x => x.resource === resourcesList[i].name)
            if(index !== -1) {
              resourcesList[i].currentValue -= clickCosts[index].cost
            }
          }
        }
      }
      
      //applying effects
      effects.forEach(effect => {          
          let index = resourcesList.findIndex(x => x.name === effect.resource)                     
          if (effect.perSecRatio != null)
            resourcesList[index].incRatio += effect.perSecRatio
          if (effect.percRatio != null)
            resourcesList[index].incRatio += ((resourcesList[index].incRatio * effect.percRatio) / 100)
          if (effect.maxValue != null)
            resourcesList[index].maxValue += effect.maxValue
          if (effect.clickRatio != null)
            resourcesList[index].currentValue += effect.clickRatio     
      })

      activityToDo.upgradeCost = upgradeCosts.slice()

      if (activityToDo.stage != null) 
        activityToDo.stage += 1
        
      this.setState ({
        gameResources: resourcesList,
        activity: activityToDo
      })
    }
  }

  render() {
    let activity = this.state.activity
    let resources = this.state.resources
      return(
        <Tooltip activity={activity} resourcesList={resources} direction="right">
          <span onClick={() => this.doActivity()} className='Activity-Btn'> {activity.name} {activity.stage != null && ( <span>[{activity.stage}]</span>)} </span>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

