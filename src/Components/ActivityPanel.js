import React from 'react'
import Tooltip from '../Components/Tooltip.js'

class ActivityPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity,
      gameResources: props.resourceList
    }
  }

  doActivity() {
    var activityToDo = this.state.activity //one activity
    var resourcesList = this.state.gameResources.slice() //entire resource list

    // ---------- CLICK EFFECT ---------- //
    if(activityToDo.effectPerClick != null) { 
      let effects = activityToDo.effectPerClick.slice()
      effects.forEach(effect => { //load effects list
        for(let i=0; i<resourcesList.length;i++) { //apply effect to matching resource
          if(resourcesList[i].name === effect.resource) {
            resourcesList[i].currentValue += effect.clickValue //add effect clickvalue
            this.setState({
              gameResources: resourcesList
            })
          }
        }
      });
    }

    // ---------- TICK EFFECT ---------- //
    if(activityToDo.effectPerTick != null) {
      let upgradeCosts = activityToDo.upgradeCost.slice()
      let upgradable = true 
      
      upgradeCosts.forEach(cost => {
        let resourceIndex = resourcesList.findIndex(x => x.name === cost.resource)
        if (upgradable && resourcesList[resourceIndex].currentValue >= cost.cost)
          upgradable = true
        else
          upgradable = false
      })

      if(upgradable) {
        let effects = activityToDo.effectPerTick.slice()

        //paying resources  
        for(let i=0; i<resourcesList.length;i++) {
          let indexToPay = upgradeCosts.findIndex(x => x.resource === resourcesList[i].name)  
            if(indexToPay !== -1) {
              resourcesList[i].currentValue -= upgradeCosts[indexToPay].cost  
              upgradeCosts[indexToPay].cost += ((upgradeCosts[indexToPay].upgradeCostRatio * upgradeCosts[indexToPay].cost))
            } 
        }
        
        //applying effects
        effects.forEach(effect => {          
            let index = resourcesList.findIndex(x => x.name === effect.resource)                     
            if (effect.perSecRatio != null)
              resourcesList[index].incRatio += effect.perSecRatio
            if (effect.percRatio != null)
              resourcesList[index].incRatio += ((resourcesList[index].incRatio * effect.percRatio) / 100)
            if (effect.flatRatio != null)
              resourcesList[index].maxValue += effect.flatRatio     
        })
      }

      activityToDo.upgradeCost = upgradeCosts.slice()
      this.setState ({
        gameResources: resourcesList,
        activity: activityToDo
      })
      activityToDo.stage += 1
    }

    // ---------- FLAT EFFECT ---------- //
  }

  render() {
    let activity = this.state.activity
    let resources = this.state.gameResources
      return(
        <Tooltip activity={activity} resourcesList={resources} direction="right">
          <button onClick={() => this.doActivity()} className='activity'> {activity.name} {activity.stage != null && ( <span>[{activity.stage}]</span>)} </button>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

