import React from 'react'
import RoomObjectTooltip from '../Components/Tooltips/RoomObjectTooltip.js'
import * as constants from '..//Utilities/StringsConst.js'
import {haveEnoughResource} from '../Utilities/UtilityFunctions.js'
import {applyEffectsToResources} from '../Lists/ResourcesUtilities.js'
import {applyEffectsToActivity} from '../Lists/ActivityUtilities.js'

class RoomObject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomObject: props.roomObject,
      resources: props.resources,
      activities: props.activities
    }
  }

  applyEffects(howManyTimes) {
    let roomObj = this.state.roomObject

    //EFFECT APPLIED DIRECTLY TO RESOURCES
    if(roomObj.effect != null)
      applyEffectsToResources(this.state.resources, roomObj.effect, howManyTimes, "add")

    //EFFECT APPLIED DIRECTLY TO ACTIVITIES
    if(roomObj.effectActivity != null)
      applyEffectsToActivity(roomObj, this.state.resources, this.state.activities, howManyTimes, "add")  

  }

  removeEffects(howManyTimes) {
    let roomObj = this.state.roomObject

    //REMOVE EFFECT FROM RESOURCES
    if(roomObj.effect != null)
      applyEffectsToResources(this.state.resources, roomObj.effect, howManyTimes, "remove")

    //REMOVE EFFECT FROM ACTIVITIES
    if(roomObj.effectActivity != null)
      applyEffectsToActivity(roomObj, this.state.resources, this.state.activities, howManyTimes, "remove") 

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
              if(upgradeCosts[index].resource !== constants.RES_007.name) {
                resources[i].currentValue -= upgradeCosts[index].cost  
                upgradeCosts[index].cost += (upgradeCosts[index].upgradeCostRatio * upgradeCosts[index].cost)
              }
              else {
                if(roomObj.isActive === false) {
                  resources[i].currentValue -= upgradeCosts[index].cost  
                  upgradeCosts[index].cost += (upgradeCosts[index].upgradeCostRatio * upgradeCosts[index].cost)
                }
              }
            } 
          }
        }
      }

      roomObj.upgradeCost = upgradeCosts.slice()
      roomObj.isBought = true

      //if(roomObj.isPassive && roomObj.isActive === false)
        roomObj.isActive = true

      //if(roomObj.isActive) 
        this.applyEffects(1)
      

      if (roomObj.stage != null) 
        roomObj.stage += 1

        
      this.setState ({
        resources: resources,
        roomObject: roomObj
      })

    }


  }

  objectON(roomObj) {
    //let roomSlotUsed = this.state.roomSlotUsed
    let resources = this.state.resources

    let index = resources.findIndex(x => x.name === constants.RES_007.name)
    let timeSlot = resources[index]

    let costIndex = roomObj.upgradeCost.findIndex(x => x.resource === constants.RES_007.name)
    let timeSlotRequired = roomObj.upgradeCost[costIndex]

    if ((timeSlot.currentValue - timeSlotRequired.cost) >= 0) {
     
      timeSlot.currentValue -= timeSlotRequired.cost

      //applying effects
      this.applyEffects(roomObj.stage) //need to apply the boost multiple times
      roomObj.isActive = true
       
      this.setState({
        resources: resources,
        roomObject: roomObj
      })

      //this.props.changeRoomSlotUsed(roomSlotUsed)
    }   
  }

  objectOFF(roomObj) {
    let resources = this.state.resources

    let index = resources.findIndex(x => x.name === constants.RES_007.name)
    let timeSlot = resources[index]

    let costIndex = roomObj.upgradeCost.findIndex(x => x.resource === constants.RES_007.name)
    let timeSlotRequired = roomObj.upgradeCost[costIndex]

    if (timeSlotRequired.cost > 0) {
      roomObj.isActive = false
      timeSlot.currentValue += timeSlotRequired.cost

      //Remove Effect 
      this.removeEffects(roomObj.stage)

      this.setState({
        resources: resources,
        roomObject: roomObj
      })

      //this.props.changeRoomSlotUsed(roomSlotUsed)
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

        {roomObject.isActive === false && roomObject.isBought === true && !roomObject.isPassive && (<button onClick={(e) => {e.stopPropagation(); this.objectON(roomObject)}} className="RoomObject-Btn-Sell">On</button>)}
        {roomObject.isActive === true && roomObject.isBought === true && !roomObject.isPassive && (<button onClick={(e) => {e.stopPropagation(); this.objectOFF(roomObject)}} className="RoomObject-Btn-Sell">Off</button>)}

      </div>
      </RoomObjectTooltip>
    )
  }
}

export default RoomObject;

