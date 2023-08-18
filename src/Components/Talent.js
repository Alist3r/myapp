import React from 'react'
import ShopItemTooltip from './Tooltips/ShopItemTooltip.js'
import {haveEnoughResource} from '../Utilities/UtilityFunctions.js'
import {applyEffectsToResources} from '../Lists/ResourcesUtilities.js'
import {applyEffectsToActivity} from '../Lists/ActivityUtilities.js'

class Talent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      talent: props.talent,
      resources: props.resources,
      activities: props.activities
    }
  }

  applyEffects(howManyTimes) {
    let talent = this.state.talent

    //EFFECT APPLIED DIRECTLY TO RESOURCES
    if(talent.effect != null)
      applyEffectsToResources(this.state.resources, talent.effect, howManyTimes, "add")

    //EFFECT APPLIED DIRECTLY TO ACTIVITIES
    if(talent.effectActivity != null)
      applyEffectsToActivity(talent, this.state.resources, this.state.activities, howManyTimes, "add")  

  }


  buyObject() {
    let resources = this.state.resources.slice()
    let talent = this.state.talent

    var upgradable = true 
    var havetoPay = false
    var upgradeCosts = []

    if(talent.upgradeCost != null) {
      upgradeCosts = talent.upgradeCost.slice()
      upgradable = haveEnoughResource(upgradeCosts, resources)
      havetoPay = true
    }

    if(upgradable) {
      
      if(havetoPay) {
        for(let i=0; i < resources.length;i++) {

          if(upgradeCosts.length > 0) {
            let index = upgradeCosts.findIndex(x => x.resource === resources[i].name)  
            if(index !== -1) {
                resources[i].currentValue -= upgradeCosts[index].cost  
                upgradeCosts[index].cost += (upgradeCosts[index].upgradeCostRatio * upgradeCosts[index].cost)
                
            }
          } 
        }
      }
    }

    talent.upgradeCost = upgradeCosts.slice()
    talent.isBought = true

    this.applyEffects(1)
     
    this.setState ({
      resources: resources,
      talent: talent
    })

  }

  getRoomObjectStyle(costs, resources) {
    let className = "RoomObject-Btn"

    if(haveEnoughResource(costs, resources)) 
      className = className + " Upgradable"

    return className
  }

  render() {
    let talent = this.state.talent
    let resources = this.state.resources
    let costs = talent.upgradeCost

    return(
      <ShopItemTooltip talent={talent} resourcesList={resources} direction="right">
      <div onClick={() => this.buyObject()} className={this.getRoomObjectStyle(costs,resources)}>
        <span className="RoomObject-Btn-Label">
          {talent.name}
        </span>
      </div>
      </ShopItemTooltip>
    )
  }
}

export default Talent;

