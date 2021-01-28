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

  isUpgradable(costs, resources) {
    let upgradable = true
    costs.forEach(cost => {
      let index = resources.findIndex(x => x.name === cost.resource)
        if (upgradable && resources[index].currentValue >= cost.cost)
          upgradable = true
        else
          upgradable = false
    })

    return upgradable
  }

  checkUpgradable(costs, resources) {
    let cssClass = "Activity-Btn"
    if(costs != null) {
      if(this.isUpgradable(costs, resources)) {
        cssClass = "Activity-Btn Upgradable"
      }
    }
    else {
      cssClass = "Activity-Btn Upgradable"
    }
    
    return cssClass
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
      upgradable = this.isUpgradable(upgradeCosts, resourcesList)
      havetoPay = true
    }

    if(activityToDo.clickCost != null) {
      clickCosts = activityToDo.clickCost.slice()
      upgradable = this.isUpgradable(clickCosts, resourcesList)
      havetoPay = true
    }

    if(upgradable) {
      let effects = activityToDo.effect.slice()

      //paying resources and update the next cost
      if(havetoPay) {
        for(let i=0; i < resourcesList.length;i++) {

          if(upgradeCosts.length > 0) {
            let index = upgradeCosts.findIndex(x => x.resource === resourcesList[i].name)  
            if(index !== -1) {
              resourcesList[i].currentValue -= upgradeCosts[index].cost  
              upgradeCosts[index].cost += ((upgradeCosts[index].upgradeCostRatio * upgradeCosts[index].cost * (activityToDo.stage+1)))
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

          if(resourcesList[index].unlocked === false)
            resourcesList[index].unlocked = true   
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
    let costs

    if(activity.upgradeCost != null)
      costs = activity.upgradeCost
    if(activity.clickCost != null)
      costs = activity.clickCost

      return(
        <Tooltip activity={activity} resourcesList={resources} direction="right">
          <span onClick={() => this.doActivity()} className={this.checkUpgradable(costs,resources)}> 
            <span className="Activity-Btn-Label">{activity.name} {activity.stage != null && (<span>[{activity.stage}]</span>)}</span>
            {activity.stage != null && (<span className="Activity-Btn-Sell">Sell</span>)}
          </span>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

