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

      if(activityToDo.modulable != null) 
        activityToDo.grade += 1
        
      this.setState ({
        gameResources: resourcesList,
        activity: activityToDo
      })
    }
  }

  sellActivity() {
    let activityToSell = this.state.activity
    let resources = this.state.resources
    

    if(activityToSell.stage != null && activityToSell.stage > 0) {
      let costs = activityToSell.upgradeCost.slice()
      let effects = activityToSell.effect.slice()

      costs.forEach(cost => {
        let index = resources.findIndex(x => x.name === cost.resource)  
        cost.cost -= ((cost.upgradeCostRatio * cost.cost * (activityToSell.stage)))
        resources[index].currentValue += cost.cost  
      })

      
      effects.forEach(effect => {
        let index = resources.findIndex(x => x.name === effect.resource)
        if(resources[index].incRatio > 0) {
          if (effect.perSecRatio != null)
            resources[index].incRatio -= effect.perSecRatio
          if (effect.percRatio != null)
            resources[index].incRatio -= ((resources[index].incRatio * effect.percRatio) / 100)
          if (effect.maxValue != null)
            resources[index].maxValue -= effect.maxValue
          if (effect.clickRatio != null) 
            resources[index].currentValue -= effect.clickRatio 
        }
      })


      if(activityToSell.modulable === true) {
        if(activityToSell.grade === activityToSell.stage) {
          activityToSell.grade -= 1
        }
      }
      activityToSell.stage -= 1
      

      this.setState ({
        resources: resources,
        activity: activityToSell
      })
    }

  }

  upGrade() {
    let activity = this.state.activity
    let resources = this.state.resources.slice()
    let effects = activity.effect.slice()

    if(activity.grade < activity.stage) {
      activity.grade += 1

      effects.forEach(effect => {          
        let index = resources.findIndex(x => x.name === effect.resource)                     
        if (effect.perSecRatio != null)
          resources[index].incRatio += effect.perSecRatio
        if (effect.percRatio != null)
          resources[index].incRatio += ((resources[index].incRatio * effect.percRatio) / 100)
        if (effect.maxValue != null)
          resources[index].maxValue += effect.maxValue
        if (effect.clickRatio != null) 
         resources[index].currentValue += effect.clickRatio  
        if(resources[index].unlocked === false)
          resources[index].unlocked = true   
      })

      this.setState ({
        gameResources: resources,
        activity: activity
      })
    }
  }

  downGrade() {
    let activity = this.state.activity
    let resources = this.state.resources
    let effects = activity.effect.slice()

    if(activity.grade > 0) {
      activity.grade -= 1

      effects.forEach(effect => {
        let index = resources.findIndex(x => x.name === effect.resource)
        if (effect.perSecRatio != null) 
          resources[index].incRatio -= effect.perSecRatio
        if (effect.percRatio != null)
          resources[index].incRatio -= ((resources[index].incRatio * effect.percRatio) / 100)
        if (effect.maxValue != null)
          resources[index].maxValue -= effect.maxValue
        if (effect.clickRatio != null) 
          resources[index].currentValue -= effect.clickRatio 
      })

      this.setState ({
        gameResources: resources,
        activity: activity
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
        <Tooltip activity={activity} resourcesList={resources} tooltipType="activity" direction="right">
          <span onClick={() => this.doActivity()} className={this.checkUpgradable(costs,resources)}> 
            <span className="Activity-Btn-Label">
              {activity.name} {activity.stage != null && (<span>[{activity.modulable && (<span>{activity.grade}/</span>)}{activity.stage}]</span>)}
            </span>
            
            {activity.stage != null && (<button onClick={(e) => {e.stopPropagation(); this.sellActivity()}} className="Activity-Btn-Sell">Sell</button>)}
            
            {activity.modulable === true && (
              <span>
                <button onClick={(e) => {e.stopPropagation(); this.upGrade()}} className="Activity-Btn-Grade Plus">+</button>
                <button onClick={(e) => {e.stopPropagation(); this.downGrade()}} className="Activity-Btn-Grade Minus">-</button>
              </span>
            )}
          </span>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

