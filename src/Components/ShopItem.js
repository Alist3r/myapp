import React from 'react'
import ShopItemTooltip from './Tooltips/ShopItemTooltip.js'
import {haveEnoughResource} from '../Utilities/UtilityFunctions.js'
import {applyEffectsToResources} from '../Lists/ResourcesUtilities.js'
import {applyEffectsToActivity} from '../Lists/ActivityUtilities.js'

class ShopItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.item,
      resources: props.resources,
      activities: props.activities
    }
  }

  applyEffects(howManyTimes) {
    let item = this.state.item

    //EFFECT APPLIED DIRECTLY TO RESOURCES
    if(item.effect != null)
      applyEffectsToResources(this.state.resources, item.effect, howManyTimes, "add")

    //EFFECT APPLIED DIRECTLY TO ACTIVITIES
    if(item.effectActivity != null)
      applyEffectsToActivity(item, this.state.resources, this.state.activities, howManyTimes, "add")  

  }


  buyObject() {
    let resources = this.state.resources.slice()
    let item = this.state.item

    var upgradable = true 
    var havetoPay = false
    var upgradeCosts = []

    if(item.upgradeCost != null) {
      upgradeCosts = item.upgradeCost.slice()
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

    item.upgradeCost = upgradeCosts.slice()
    item.isBought = true

    this.applyEffects(1)
     
    this.setState ({
      resources: resources,
      item: item
    })

  }

  getRoomObjectStyle(costs, resources) {
    let className = "RoomObject-Btn"

    if(haveEnoughResource(costs, resources)) 
      className = className + " Upgradable"

    return className
  }

  render() {
    let item = this.state.item
    let resources = this.state.resources
    let costs = item.upgradeCost

    return(
      <ShopItemTooltip item={item} resourcesList={resources} direction="right">
      <div onClick={() => this.buyObject()} className={this.getRoomObjectStyle(costs,resources)}>
        <span className="RoomObject-Btn-Label">
          {item.name}
        </span>
      </div>
      </ShopItemTooltip>
    )
  }
}

export default ShopItem;

