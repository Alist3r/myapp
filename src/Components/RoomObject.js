import React from 'react'
import Tooltip from '../Components/Tooltip.js'

class RoomObject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomObject: props.roomObject,
      resources: props.resources,
      activities: props.activities,
      roomSlotUsed: props.roomSlotUsed,
      roomSlotMax: props.roomSlotMax
    }
  }

  applyEffects() {
    let roomObj = this.state.roomObject
    

    if(roomObj.effect != null) {
      let effects = roomObj.effect.slice()
      let resources = this.state.resources.slice()
      effects.forEach(effect => {          
        let index = resources.findIndex(x => x.name === effect.resource)                     
        if (effect.perSecRatio != null)
          resources[index].incRatio += (effect.perSecRatio * roomObj.stage)
        if (effect.percRatio != null) {
          for(let i=0; i<roomObj.stage; i++)
            resources[index].incRatio += ((resources[index].incRatio * effect.percRatio) / 100)
        }
        if (effect.maxValue != null)
          resources[index].maxValue += (effect.maxValue * roomObj.stage)
        if (effect.percMaxValue != null) {
          for(let i=0; i<roomObj.stage; i++)
            resources[index].maxValue += ((resources[index].maxValue * effect.percMaxValue) / 100)
          }
        if (effect.clickRatio != null) 
          resources[index].currentValue += (effect.clickRatio * roomObj.stage)
        if(resources[index].unlocked === false)
          resources[index].unlocked = true   
      })
    }

    /*if(roomObj.effectActivity != null) {
      let effects = roomObj.effectActivity.slice()
      let activities = this.state.activities.slice()
      effects.forEach(effect => {
        let index = activities.findIndex(x => x.name === effect.activity)
        let activityEffects = activities[index].effect.slice()
        activityEffects.forEach(actEffect => {
          actEffect.boost += effect.percRatio
        })
      })
    }*/

  }

  removeEffects(resources, effects, roomObj) {
    effects.forEach(effect => {          
      let index = resources.findIndex(x => x.name === effect.resource)                     
      if (effect.perSecRatio != null)
        resources[index].incRatio -= (effect.perSecRatio * roomObj.stage)
      if (effect.percRatio != null) {
        for(let i=0; i<roomObj.stage; i++)
        resources[index].incRatio = (((resources[index].incRatio * 100) / (effect.percRatio + 100)))
      }     
      if (effect.maxValue != null)
        resources[index].maxValue -= (effect.maxValue * roomObj.stage)
      if (effect.percMaxValue != null) {
        for(let i=0; i<roomObj.stage; i++) 
          resources[index].maxValue = (((resources[index].maxValue * 100) / (effect.percMaxValue + 100)))
      }
      if (effect.clickRatio != null) 
        resources[index].currentValue -= (effect.clickRatio * roomObj.stage)

    })
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

  buyObject(roomObj) {
    let resources = this.state.resources.slice()

    var upgradable = true 
    var havetoPay = false
    var upgradeCosts = []

    if(roomObj.upgradeCost != null) {
      upgradeCosts = roomObj.upgradeCost.slice()
      upgradable = this.isUpgradable(upgradeCosts, resources)
      havetoPay = true
    }

    if(upgradable) {
      
      if(havetoPay) {
        for(let i=0; i < resources.length;i++) {

          if(upgradeCosts.length > 0) {
            let index = upgradeCosts.findIndex(x => x.resource === resources[i].name)  
            if(index !== -1) {
              resources[i].currentValue -= upgradeCosts[index].cost  
              upgradeCosts[index].cost += ((upgradeCosts[index].upgradeCostRatio * upgradeCosts[index].cost * (roomObj.stage+1)))
            } 
          }
        }
      }

      if(roomObj.isActive) {
        this.applyEffects(resources, roomObj.effect, roomObj)
      }

      roomObj.upgradeCost = upgradeCosts.slice()
      roomObj.isBought = true

      if (roomObj.stage != null) 
        roomObj.stage += 1
        
      this.setState ({
        resources: resources,
        roomObject: roomObj
      })

    }


  }

  objectON(roomObj) {
    let roomSlotUsed = this.state.roomSlotUsed
    let roomSlotMax = this.state.roomSlotMax
    let resources = this.state.resources.slice()

    if ((roomSlotUsed + roomObj.requiredSlot) <= roomSlotMax) {
      roomObj.isActive = true
      roomSlotUsed += roomObj.requiredSlot

      //applying effects
      this.applyEffects(resources, roomObj)
       
      this.setState({
        roomSlotUsed: roomSlotUsed,
        roomObject: roomObj
      })

      this.props.changeRoomSlotUsed(roomSlotUsed)
    }   
  }

  objectOFF(roomObj) {
    let effects = roomObj.effect.slice()
    let resources = this.state.resources.slice()
    let roomSlotUsed = this.state.roomSlotUsed

    if (roomSlotUsed > 0) {
      roomObj.isActive = false
      roomSlotUsed -= roomObj.requiredSlot

      //Remove Effect 
      this.removeEffects(resources, effects, roomObj)

      this.setState({
        roomSlotUsed: roomSlotUsed,
        roomObject: roomObj
      })

      this.props.changeRoomSlotUsed(roomSlotUsed)
    }
  }

  getRoomObjectStyle(costs, resources) {
    let roomObj = this.state.roomObject
    let className = "RoomObject-Btn"

    if(this.isUpgradable(costs, resources)) 
      className = className + " Upgradable"
    
    if(roomObj.isActive) 
      className = className + " Active"

    return className
  }

  componentWillReceiveProps({roomSlotUsed, roomSlotMax}) {
    this.setState({
        roomSlotUsed: roomSlotUsed,
        roomSlotMax: roomSlotMax
    })
} 

  render() {
    let roomObject = this.state.roomObject
    let resources = this.state.resources
    let costs = roomObject.upgradeCost

    return(
      <Tooltip activity={roomObject} resourcesList={resources} tooltipType="activity" direction="right">
      <div onClick={() => this.buyObject(roomObject)} className={this.getRoomObjectStyle(costs,resources)}>
        <span className="RoomObject-Btn-Label">
          {roomObject.name} {roomObject.stage != null && roomObject.isBought && (<span>[{roomObject.stage}]</span>)}
        </span>

        {roomObject.isActive === false && roomObject.isBought === true && (<button onClick={(e) => {e.stopPropagation(); this.objectON(roomObject)}} className="RoomObject-Btn-Sell">On</button>)}
        {roomObject.isActive === true && roomObject.isBought === true && (<button onClick={(e) => {e.stopPropagation(); this.objectOFF(roomObject)}} className="RoomObject-Btn-Sell">Off</button>)}

      </div>
      </Tooltip>
    )
  }
}

export default RoomObject;

