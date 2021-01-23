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

    if(activityToDo.effectPerTick != null) {
      let upgradeCosts = activityToDo.upgradeCost.slice()
      let upgradable = false
      upgradeCosts.forEach(cost => {
        for(let i=0; i<resourcesList.length;i++) {
          if((resourcesList[i].name === cost.resource) && resourcesList[i].currentValue >= cost.cost) {
            upgradable = true
          } 
          else {
            upgradable = false
          }
        }
      })

      if(upgradable) {
        let effects = activityToDo.effectPerTick.slice()
        
        effects.forEach(effect => {
          for(let i=0; i<resourcesList.length;i++) {
            if(resourcesList[i].name === effect.resource) {
              let indexToPay = upgradeCosts.findIndex(x => x.resource === resourcesList[i].name)
              if(indexToPay !== -1) {
                resourcesList[i].currentValue -= upgradeCosts[indexToPay].cost
                if (effect.perSecRatio != null)
                  resourcesList[i].incRatio += effect.perSecRatio
                /* DA AGGIUNGERE ALTRE TIPOLOGIE DI INCREMENTO */   
                upgradeCosts[indexToPay].cost += ((upgradeCosts[indexToPay].upgradeCostRatio * upgradeCosts[indexToPay].cost))
                activityToDo.stage += 1
              } 
             
              this.setState ({
                gameResources: resourcesList,
                activity: activityToDo
              })
            }  
          }
        })
      }
    }

  }

  render() {
    let activity = this.state.activity
      return(
        <Tooltip activity={activity} direction="right">
          <button onClick={() => this.doActivity()} className='activity'> {activity.name} {activity.stage != null && ( <span>[{activity.stage}]</span>)} </button>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

