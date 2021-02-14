
import * as constants from '../Utilities/StringsConst.js'

export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
    localStorage.setItem("gameActivities", JSON.stringify(state.gameActivities));
    localStorage.setItem("gameRoomObjects", JSON.stringify(state.gameRoomObjects));
    localStorage.setItem("gameJobs", JSON.stringify(state.gameJobs));
    localStorage.setItem("activeTab", state.activeTab);

    //localStorage.setItem("roomSlotMax", JSON.stringify(state.roomSlotMax));
    //localStorage.setItem("roomSlotUsed", JSON.stringify(state.roomSlotUsed));
}

export function loadState(state) {
    let updatedstate
    let gameTime
    let gameResources
    let gameActivities
    let gameRoomObjects
    let gameJobs
    let activeTab

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

    if(JSON.parse(localStorage.getItem("gameJobs"))) {
        gameJobs = JSON.parse(localStorage.getItem("gameJobs"))
    }
    else {
        gameJobs = state.gameJobs
    }

    if(localStorage.getItem('activeTab')) {
        activeTab = localStorage.getItem('activeTab')
    }
    else {
        activeTab = state.activeTab
    }

    
    updatedstate = {
        gameTime,
        gameResources,
        gameActivities,
        gameRoomObjects,
        gameJobs,
        activeTab
    }

    return updatedstate
}

export function timerConverter(finalValue, currentValue, incRatio) {
    let formattedTimeStamp = ""

    if(incRatio !== 0) {

        let timeStamp = Math.floor((finalValue - currentValue) / (incRatio * constants.OPT_GAMESPEED))

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
    }   

    return formattedTimeStamp
}

export function formatNumber(number, precision) {

    let formattedNumber

    if (number % 1 === 0) {
        if(number > 4999)
            formattedNumber = addSuffix(number, 2)
        else
            formattedNumber = addSuffix(number, 0)  
        return formattedNumber
    }

    if(Math.abs(number) < 0.001) { 
        formattedNumber = number.toFixed(2) + "..."
        return formattedNumber
    }

    if(Math.abs(number) < 0.01) {
        formattedNumber = number.toFixed(3)
        return formattedNumber
    }

    formattedNumber = number.toFixed(precision)

    formattedNumber = addSuffix(formattedNumber, precision)  
 
    return formattedNumber
      
}

export function formatNumberWPrefix(number, precision) {
    let formattedNumber = formatNumber(number, precision)

    if(number > 0) {
        return "+" + formattedNumber
    }

    return formattedNumber
}

export function addSuffix(number, precision) {

    let formatNumber = number

    if(Math.abs(formatNumber) > 4999 && formatNumber <= 999999) 
        formatNumber = (number * 1 / 1000).toFixed(precision) + "K"
    
    if(Math.abs(formatNumber) > 999999 && formatNumber <= 999999999) 
        formatNumber = (number * 1 / 1000000).toFixed(precision) + "M"  
    
    if(Math.abs(formatNumber) > 999999999 && formatNumber <= 999999999999)   
        formatNumber = (number * 1 / 1000000000).toFixed(precision) + "G"  
    
    if(Math.abs(formatNumber) > 999999999 && formatNumber <= 999999999999999)   
        formatNumber = (number * 1 / 1000000000000).toFixed(precision) + "T"  

    if(Math.abs(formatNumber) > 999999999999999 && formatNumber <= 999999999999999999)   
        formatNumber = (number * 1 / 1000000000000000).toFixed(precision) + "P"  

    if(Math.abs(formatNumber) > 999999999999999999 && formatNumber <= 999999999999999999999)   
        formatNumber = (number * 1 / 1000000000000000000).toFixed(precision) + "E"

    if(Math.abs(formatNumber) > 999999999999999999999 && formatNumber <= 999999999999999999999999)   
        formatNumber = (number * 1 / 1000000000000000000000).toFixed(precision) + "Z"

    if(Math.abs(formatNumber) > 999999999999999999999999 && formatNumber <= 999999999999999999999999999)   
        formatNumber = (number * 1 / 1000000000000000000000000).toFixed(precision) + "Y"
    
    if(Math.abs(formatNumber) > 999999999999999999999999999)
        formatNumber = (number * 1 / 1000000000000000000000000).toFixed(precision) + "Y"   

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

export function checkUnlockCondition(resourcesList, activityList, roomObjectsList, unlockCondition) {

    let unlockable = true
    if(unlockCondition != null) {

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

            //UNLOCK BY ROOMOBJECT
            if(unlockable && unlockCondition[i].roomObject != null) {
                let index = roomObjectsList.findIndex(x => x.name === unlockCondition[i].roomObject)
                if(roomObjectsList[index].isBought)
                    unlockable = true
                else
                    unlockable = false
            }
        
        }
    }

    return unlockable

}

export function haveEnoughResource(costs, resources) {
    let haveEnoughResource = true
    costs.forEach(cost => {
      let index = resources.findIndex(x => x.name === cost.resource)
        if (haveEnoughResource && resources[index].currentValue >= cost.cost)
          haveEnoughResource = true
        else
          haveEnoughResource = false
    })

    return haveEnoughResource
}

export function wichEffect(effect) {
        
    if(effect.perSecRatio != null) {
        return "perSecRatio"
    }

    if(effect.percRatio != null) {
        return "percRatio"
    }    

    if(effect.maxValue != null) {
        return "maxValue"
    } 

    if(effect.percMaxValue != null) {
        return "percMaxValue"
    } 

    if(effect.clickRatio != null) {
        return "clickRatio"
    }

    return null
}
