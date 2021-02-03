import React from 'react'
import Tooltip from '../Components/Tooltip.js'
import {percValue, removePerc} from '../Utilities/UtilityFunctions.js'

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
    

    //EFFECT APPLIED DIRECTLY TO RESOURCES
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

    //EFFECT APPLIED TO ACTIVITIES
    if(roomObj.effectActivity != null) {
      let effects = roomObj.effectActivity.slice()
      let activities = this.state.activities.slice()
      

      effects.forEach(effect => {
        let index = activities.findIndex(x => x.name === effect.activity)
        activities[index].percBoost += effect.percRatio

        let activityEffects = activities[index].effect
        let stageOrGrade
          if(activities[index].modulable)
            stageOrGrade = activities[index].grade
          else
            stageOrGrade = activities[index].stage

        activityEffects.forEach(actEffect => {
          let resources = this.state.resources.slice()
          let resIndex = resources.findIndex(x => x.name === actEffect.resource)  

          
          // FLAT EFFECTS
          if (actEffect.perSecRatio != null) {
            resources[resIndex].incRatio -= (actEffect.perSecRatio * stageOrGrade)
            if (roomObj.isActive) {
                actEffect.perSecRatio = removePerc(actEffect.perSecRatio, effect.percRatio)
            }
            actEffect.perSecRatio += percValue(actEffect.perSecRatio, effect.percRatio * roomObj.stage)          
            resources[resIndex].incRatio += (actEffect.perSecRatio * stageOrGrade)
          }
          if (actEffect.maxValue != null) {
            resources[resIndex].maxValue -= (actEffect.maxValue * stageOrGrade)
            if (roomObj.isActive) {
                actEffect.maxValue = removePerc(actEffect.maxValue, effect.percRatio)
            }
            actEffect.maxValue += percValue(actEffect.maxValue, effect.percRatio * roomObj.stage)
            resources[resIndex].maxValue += (actEffect.maxValue * stageOrGrade)
          }
          if (actEffect.clickRatio != null) 
            actEffect.clickRatio += percValue(actEffect.clickRatio, effect.percRatio * roomObj.stage)

          // % EFFECTS  
          if (actEffect.percRatio != null) {
            resources[resIndex].incRatio -= percValue(resources[resIndex].incRatio, actEffect.percRatio) * stageOrGrade
            if(roomObj.isActive) {
              actEffect.percRatio = removePerc(actEffect.percRatio, effect.percRatio)
            }
            actEffect.percRatio += percValue(actEffect.percRatio, effect.percRatio * roomObj.stage)
            resources[resIndex].incRatio += percValue(resources[resIndex].incRatio, actEffect.percRatio) * stageOrGrade
          }
          if (actEffect.percMaxValue != null) {
            resources[resIndex].maxValue -= percValue(resources[resIndex].maxValue, actEffect.percRatio) * stageOrGrade
            if(roomObj.isActive) {
              actEffect.percMaxValue = removePerc(actEffect.percMaxValue, effect.percRatio)
            }
            actEffect.percMaxValue += percValue(actEffect.percMaxValue, effect.percRatio * roomObj.stage)
            resources[resIndex].maxValue += percValue(resources[resIndex].maxValue, actEffect.percRatio) * stageOrGrade
          }
        });
      })
    }

  }

  removeEffects() {
    let roomObj = this.state.roomObject

    if(roomObj.effect != null) {
      let effects = roomObj.effect.slice()
      let resources = this.state.resources.slice()

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

    //EFFECT REMOVED FROM ACTIVITIES
    if(roomObj.effectActivity != null) {
      let effects = roomObj.effectActivity.slice()
      let activities = this.state.activities.slice()
      

      effects.forEach(effect => {
        let index = activities.findIndex(x => x.name === effect.activity)
        activities[index].percBoost -= effect.percRatio

        let stageOrGrade
          if(activities[index].modulable)
            stageOrGrade = activities[index].grade
          else
            stageOrGrade = activities[index].stage
       

        let activityEffects = activities[index].effect
        activityEffects.forEach(actEffect => {
          let resources = this.state.resources.slice()
          let resIndex = resources.findIndex(x => x.name === actEffect.resource)  
       
          // FLAT EFFECTS
          if (actEffect.perSecRatio != null) {
            resources[resIndex].incRatio -= (actEffect.perSecRatio * stageOrGrade)
            actEffect.perSecRatio = removePerc(actEffect.perSecRatio, effect.percRatio * roomObj.stage)          
            resources[resIndex].incRatio += (actEffect.perSecRatio * stageOrGrade)
          }
          if (actEffect.maxValue != null) {
            resources[resIndex].maxValue -= (actEffect.maxValue * stageOrGrade)
            actEffect.maxValue = removePerc(actEffect.maxValue, effect.percRatio * roomObj.stage)
            resources[resIndex].maxValue += (actEffect.maxValue * stageOrGrade)
          }
          if (actEffect.clickRatio != null) 
            actEffect.clickRatio = removePerc(actEffect.clickRatio, effect.percRatio * roomObj.stage)

          // % EFFECTS  
          if (actEffect.percRatio != null) {
            resources[resIndex].incRatio = removePerc(resources[resIndex].incRatio, actEffect.percRatio) * stageOrGrade
            actEffect.percRatio = removePerc(actEffect.percRatio, effect.percRatio * roomObj.stage)
            resources[resIndex].incRatio += percValue(resources[resIndex].incRatio, actEffect.percRatio) * stageOrGrade
          }
          if (actEffect.percMaxValue != null) {
            resources[resIndex].maxValue = removePerc(resources[resIndex].maxValue, actEffect.percRatio) * stageOrGrade
            actEffect.percMaxValue = removePerc(actEffect.percMaxValue, effect.percRatio * roomObj.stage)
            resources[resIndex].maxValue += percValue(resources[resIndex].maxValue, actEffect.percRatio) * stageOrGrade
          }
        });
      })
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

  buyObject() {
    let resources = this.state.resources.slice()
    let roomObj = this.state.roomObject

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

      roomObj.upgradeCost = upgradeCosts.slice()
      roomObj.isBought = true

      if (roomObj.stage != null) 
        roomObj.stage += 1

      if(roomObj.isActive) {
        this.applyEffects()
      }
        
      this.setState ({
        resources: resources,
        roomObject: roomObj
      })

    }


  }

  objectON(roomObj) {
    let roomSlotUsed = this.state.roomSlotUsed
    let roomSlotMax = this.state.roomSlotMax

    if ((roomSlotUsed + roomObj.requiredSlot) <= roomSlotMax) {
     
      roomSlotUsed += roomObj.requiredSlot

      //applying effects
      this.applyEffects()
      roomObj.isActive = true
       
      this.setState({
        roomSlotUsed: roomSlotUsed,
        roomObject: roomObj
      })

      this.props.changeRoomSlotUsed(roomSlotUsed)
    }   
  }

  objectOFF(roomObj) {
    let roomSlotUsed = this.state.roomSlotUsed

    if (roomSlotUsed > 0) {
      roomObj.isActive = false
      roomSlotUsed -= roomObj.requiredSlot

      //Remove Effect 
      this.removeEffects()

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

