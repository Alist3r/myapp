import * as constants from '../Utilities/StringsConst.js'

export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
    localStorage.setItem("gameActivities", JSON.stringify(state.gameActivities));
    localStorage.setItem("gameRoomObjects", JSON.stringify(state.gameRoomObjects));
    localStorage.setItem("gameGlobalEffects", JSON.stringify(state.gameGlobalEffects));
    localStorage.setItem("activeTab", state.activeTab);
    localStorage.setItem("roomSlotMax", JSON.stringify(state.roomSlotMax));
    localStorage.setItem("roomSlotUsed", JSON.stringify(state.roomSlotUsed));
}

export function loadState(state) {
    let updatedstate
    let gameTime
    let gameResources
    let gameActivities
    let gameRoomObjects
    let gameGlobalEffects
    let activeTab
    let roomSlotMax
    let roomSlotUsed

    if(parseInt(localStorage.getItem('gameTime'))) {
        gameTime = parseInt(localStorage.getItem('gameTime'))
    }
    else {
        gameTime = state.gameTime
    }
         
    if(JSON.parse(localStorage.getItem("gameResources"))) {
        gameResources = JSON.parse(localStorage.getItem("gameResources"))
    }
    else {
        gameResources = state.gameResources
    }

    if(JSON.parse(localStorage.getItem("gameActivities"))) {
        gameActivities = JSON.parse(localStorage.getItem("gameActivities"))
    }
    else {
        gameActivities = state.gameActivities
    }

    if(JSON.parse(localStorage.getItem("gameRoomObjects"))) {
        gameRoomObjects = JSON.parse(localStorage.getItem("gameRoomObjects"))
    }
    else {
        gameRoomObjects = state.gameRoomObjects
    }

    if(JSON.parse(localStorage.getItem("gameGlobalEffects"))) {
        gameGlobalEffects = JSON.parse(localStorage.getItem("gameGlobalEffects"))
    }
    else {
        gameGlobalEffects = state.gameGlobalEffects
    }

    if(localStorage.getItem('activeTab')) {
        activeTab = localStorage.getItem('activeTab')
    }
    else {
        activeTab = state.activeTab
    }

    if(parseInt(localStorage.getItem('roomSlotMax'))) {
        roomSlotMax = parseInt(localStorage.getItem('roomSlotMax'))
    }
    else {
        roomSlotMax = state.roomSlotMax
    }

    if(parseInt(localStorage.getItem('roomSlotUsed'))) {
        roomSlotUsed = parseInt(localStorage.getItem('roomSlotUsed'))
    }
    else {
        roomSlotUsed = state.roomSlotUsed
    }

    

    updatedstate = {
        gameTime,
        gameResources,
        gameActivities,
        gameRoomObjects,
        gameGlobalEffects,
        activeTab,
        roomSlotMax,
        roomSlotUsed
    }

    return updatedstate
}

export function tooltipReverseTimerConverter (costValue, currentValue, incRatio) {
    let formattedTimeStamp = ""

    if(incRatio > 0) {

        let timeStamp = Math.floor((costValue - currentValue) / (incRatio * constants.OPT_GAMESPEED))

        let hours = Math.floor(timeStamp / 60 / 60)
        let minutes = Math.floor(timeStamp / 60) - (hours * 60);
        let seconds = timeStamp % 60 

        if(hours > 0) {
            formattedTimeStamp += hours + "h "
        }
        if(minutes > 0) {
            formattedTimeStamp += minutes + "m "
        }

        formattedTimeStamp += seconds + "s"
        formattedTimeStamp = "(" + formattedTimeStamp + ")"
    }   

    return formattedTimeStamp
  }

export function countDecimals(value) {
    let text = value.toString()
    // verify if number 0.000005 is represented as "5e-6"
    if (text.indexOf('e-') > -1) {
      let [base, trail] = text.split('e-');
      let deg = parseInt(trail, 10);
      return deg;
    }
    // count decimals for number in representation like "0.123456"
    if (Math.floor(value) !== value) {
      return value.toString().split(".")[1].length || 0;
    }
    return 0;
  }

export function roundNumber(number, decimal) {

    let formatNumber = (Math.round(number * 100) / 100).toFixed(decimal)

    let numberOfDecimal = countDecimals(number)
    if(numberOfDecimal >= 3 && number > -1 && number < 1) {
        formatNumber = (number * 100 / 100).toFixed(3)
    }    

    if(formatNumber > 4999 && formatNumber <= 999999) 
        formatNumber = (Math.round(number * 1) / 1000).toFixed(decimal) + "K"
    
    if(formatNumber > 999999 && formatNumber <= 999999999) 
        formatNumber = (Math.round(number * 1) / 1000000).toFixed(decimal) + "M"  
    
    if(formatNumber > 999999999 && formatNumber <= 999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000).toFixed(decimal) + "G"  
    
    if(formatNumber > 999999999 && formatNumber <= 999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000).toFixed(decimal) + "T"  

    if(formatNumber > 999999999999999 && formatNumber <= 999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000).toFixed(decimal) + "P"  

    if(formatNumber > 999999999999999999 && formatNumber <= 999999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000000).toFixed(decimal) + "E"

    if(formatNumber > 999999999999999999999 && formatNumber <= 999999999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000000000).toFixed(decimal) + "Z"

    if(formatNumber > 999999999999999999999999 && formatNumber <= 999999999999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000000000000).toFixed(decimal) + "Y"
    
    if(formatNumber > 999999999999999999999999999)
        formatNumber = (Math.round(number * 1) / 1000000000000000000000000).toFixed(decimal) + "Y"   

    return formatNumber; 
}

export function percValue(number, percent) {
    let result = (number * percent) / 100
    return result
}

export function removePerc(finalValue, percent) {
    let result = (finalValue * 100) / (percent + 100)
    return result
}

export function checkUnlockCondition(resourcesList, activityList, unlockCondition) {

    let unlockable = true

    for (let i=0; i < unlockCondition.length; i++) {

        //UNLOCK BY RESOURCES VALUES
        if(unlockable && unlockCondition[i].resource != null) {
            let index = resourcesList.findIndex(x => x.name === unlockCondition[i].resource) 
            if (resourcesList[index].currentValue >= unlockCondition[i].neededValue)
                unlockable = true
            else {
                unlockable = false
            }   
        }

        //UNLOCK BY ACTIVITY STAGE
        if(unlockable && unlockCondition[i].activity != null) {
            let index = activityList.findIndex(x => x.name === unlockCondition[i].activity)
            if (activityList[index].stage >= unlockCondition[i].neededStage)
                unlockable = true
            else
                unlockable = false
        }
       
    }

    return unlockable

}
