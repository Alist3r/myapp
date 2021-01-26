import React from 'react'
import Tooltip from '../Components/Tooltip.js'

class ActivityPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity,
      gameResources: props.resourcesList
    }
  }


  doActivity() {
    var activityToDo = this.state.activity //one activity
    var resourcesList = this.state.gameResources

    // ---------- CLICK EFFECT ---------- //
    /*if(activityToDo.effectPerClick != null) { 
      let effects = activityToDo.effectPerClick.slice()
      effects.forEach(effect => { //for each effect

        let resourceIndex = resourcesList.findIndex(x => x.name === effect.resource) //find the respective resource
        resourcesList[resourceIndex].currentValue += effect.clickValue //add effect clickvalue
        this.setState({
          gameResources: resourcesList
        })

      });
    }*/

    // ---------- TICK EFFECT ---------- //
    if(activityToDo.effect != null) {
      
      var upgradable = true 
      var havetoPay = false
      var upgradeCosts = []

      if(activityToDo.upgradeCost != null) {
        upgradeCosts = activityToDo.upgradeCost.slice()
      
        upgradeCosts.forEach(cost => { //Checking if resources are enough
          let resourceIndex = resourcesList.findIndex(x => x.name === cost.resource)
          if (upgradable && resourcesList[resourceIndex].currentValue >= cost.cost)
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
            let indexToPay = upgradeCosts.findIndex(x => x.resource === resourcesList[i].name)  
              if(indexToPay !== -1) {
                resourcesList[i].currentValue -= upgradeCosts[indexToPay].cost  
                upgradeCosts[indexToPay].cost += ((upgradeCosts[indexToPay].upgradeCostRatio * upgradeCosts[indexToPay].cost))
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
        if (activityToDo.stage != null) activityToDo.stage += 1
        this.setState ({
          gameResources: resourcesList,
          activity: activityToDo
        })
      }
    }
  }

  render() {
    let activity = this.state.activity
    let resources = this.state.gameResources
      return(
        <Tooltip activity={activity} resourcesList={resources} direction="right">
          <button onClick={() => this.doActivity()} className='Activity-Btn'> {activity.name} {activity.stage != null && ( <span>[{activity.stage}]</span>)} </button>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

