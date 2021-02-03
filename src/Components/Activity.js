import React from 'react'
import Tooltip from './Tooltip.js'
import {percValue, removePerc} from '../Utilities/UtilityFunctions.js'

class Activity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity,
      resources: props.resources
    }
  }

  applyEffect(resourcesList,effects,type) {
    let modifier = 1
    if(type === "remove") // in case we need to remove the effects from the resources
      modifier = -1

    effects.forEach(effect => {          
      let index = resourcesList.findIndex(x => x.name === effect.resource)
      
      //FLAT EFFECTS
      if (effect.perSecRatio != null)
        resourcesList[index].incRatio += (effect.perSecRatio * modifier)
      if (effect.maxValue != null)
        resourcesList[index].maxValue += (effect.maxValue * modifier)
      if (effect.clickRatio != null) 
        resourcesList[index].currentValue += (effect.clickRatio * modifier)  

      // % EFFECTS  
      if (effect.percRatio != null) {
        if(modifier === 1)
          resourcesList[index].incRatio += percValue(resourcesList[index].incRatio, effect.percRatio)
        else
          resourcesList[index].incRatio = removePerc(resourcesList[index].incRatio, effect.percRatio)
      }

      if (effect.percMaxValue != null) {
        if(modifier === 1)
          resourcesList[index].maxValue += percValue(resourcesList[index].maxValue, effect.percMaxValue)
        else
          resourcesList[index].maxValue = removePerc(resourcesList[index].maxValue, effect.percMaxValue)
      }


      if(resourcesList[index].unlocked === false)
        resourcesList[index].unlocked = true   
    })
  }

  haveEnoughResource(costs, resources) {
    let haveEnoughResource = true
    costs.forEach(cost => { // for each resource cost value
      let index = resources.findIndex(x => x.name === cost.resource) // find the matching resource
        if (haveEnoughResource && resources[index].currentValue >= cost.cost) // if the current resource value is major than the cost
          haveEnoughResource = true
        else
          haveEnoughResource = false
    })

    return haveEnoughResource
  }

  getActivityBtnClass(costs, resources) {
    // if the activity can be upgraded, then the button its more visible
    let cssClass = "Activity-Btn"
    if(costs != null) {
      if(this.haveEnoughResource(costs, resources)) {
        cssClass = "Activity-Btn Upgradable"
      }
    }
    else {
      cssClass = "Activity-Btn Upgradable"
    }
    
    return cssClass
  }

  buyActivity(costs) {
    var activityToDo = this.state.activity //one activity
    var resourcesList = this.state.resources
      
    var upgradable = true 
    var havetoPay = false

    if(costs != null) { // if the activity have costs, then check if the resource are enough
      upgradable = this.haveEnoughResource(costs, resourcesList)
      havetoPay = true
    }

    if(upgradable) { //if the resource are enough
      let effects = activityToDo.effect.slice()

      //paying resources and update the next cost if necessary
      if(havetoPay) {
        for(let i=0; i < resourcesList.length;i++) { //for each resource

        let index = costs.findIndex(x => x.resource === resourcesList[i].name) //find the matching cost
        if(index !== -1) { //if matching cost found
          resourcesList[i].currentValue -= costs[index].cost  //paying resource
          if(activityToDo.upgradeCost != null) //if its an upgradable resource, then update the cost value for the next step
            costs[index].cost += ((costs[index].upgradeCostRatio * costs[index].cost * (activityToDo.stage+1)))
        } 
          

        }
      }
      
      this.applyEffect(resourcesList,effects,"add")      

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
 
      this.applyEffect(resources,effects,"remove")  

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

      this.applyEffect(resources,effects,"add")

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

      this.applyEffect(resources,effects,"remove")

      this.setState ({
        gameResources: resources,
        activity: activity
      })
    }

  }

  render() {
    let activity = this.state.activity
    let resources = this.state.resources
    let costs = null

    if(activity.upgradeCost != null)
      costs = activity.upgradeCost
    if(activity.clickCost != null)
      costs = activity.clickCost

      return(
        <Tooltip activity={activity} resourcesList={resources} tooltipType="activity" direction="right">
          <span onClick={() => this.buyActivity(costs)} className={this.getActivityBtnClass(costs,resources)}> 
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

export default Activity;

