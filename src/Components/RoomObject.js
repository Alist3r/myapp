import React from 'react'
import RoomObjectTooltip from '../Components/Tooltips/RoomObjectTooltip.js'
import {haveEnoughResource, applyEffectsToResources, applyEffectsToActivity} from '../Utilities/UtilityFunctions.js'

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
    let howManyTimes = roomObj.stage
    if(roomObj.isActive) {
      howManyTimes = 1
    }
    if(roomObj.effect != null)
      applyEffectsToResources(this.state.resources, roomObj.effect, howManyTimes, "add", "roomObject")

    //EFFECT APPLIED DIRECTLY TO ACTIVITIES
    if(roomObj.effectActivity != null)
      applyEffectsToActivity(roomObj, this.state.resources, this.state.activities, "add")  

  }

  removeEffects() {
    let roomObj = this.state.roomObject

    //REMOVE EFFECT FROM RESOURCES
    if(roomObj.effect != null)
      applyEffectsToResources(this.state.resources, roomObj.effect, roomObj.stage, "remove","roomObject")

    //REMOVE EFFECT FROM ACTIVITIES
    if(roomObj.effectActivity != null)
      applyEffectsToActivity(roomObj, this.state.resources, this.state.activities, "remove") 

  }

  buyObject() {
    let resources = this.state.resources.slice()
    let roomObj = this.state.roomObject

    var upgradable = true 
    var havetoPay = false
    var upgradeCosts = []

    if(roomObj.upgradeCost != null) {
      upgradeCosts = roomObj.upgradeCost.slice()
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

    if(haveEnoughResource(costs, resources)) 
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
      <RoomObjectTooltip roomObj={roomObject} resourcesList={resources} direction="right">
      <div onClick={() => this.buyObject(roomObject)} className={this.getRoomObjectStyle(costs,resources)}>
        <span className="RoomObject-Btn-Label">
          {roomObject.name} {roomObject.stage != null && roomObject.isBought && (<span>[{roomObject.stage}]</span>)}
        </span>

        {roomObject.isActive === false && roomObject.isBought === true && (<button onClick={(e) => {e.stopPropagation(); this.objectON(roomObject)}} className="RoomObject-Btn-Sell">On</button>)}
        {roomObject.isActive === true && roomObject.isBought === true && (<button onClick={(e) => {e.stopPropagation(); this.objectOFF(roomObject)}} className="RoomObject-Btn-Sell">Off</button>)}

      </div>
      </RoomObjectTooltip>
    )
  }
}

export default RoomObject;

