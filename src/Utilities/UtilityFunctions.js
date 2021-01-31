import * as constants from '../Utilities/StringsConst.js'

export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
    localStorage.setItem("gameActivities", JSON.stringify(state.gameActivities));
    localStorage.setItem("gameRoomObjects", JSON.stringify(state.gameRoomObjects));
    localStorage.setItem("activeTab", JSON.stringify(state.activeTab));
    localStorage.setItem("roomSlot", JSON.stringify(state.roomSlot));
}

export function loadState(state) {
    let updatedstate
    let gameTime
    let gameResources
    let gameActivities
    let gameRoomObjects
    let activeTab
    let roomSlot

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

    if(parseInt(localStorage.getItem('activeTab'))) {
        activeTab = parseInt(localStorage.getItem('activeTab'))
    }
    else {
        activeTab = state.activeTab
    }

    if(parseInt(localStorage.getItem('roomSlot'))) {
        roomSlot = parseInt(localStorage.getItem('roomSlot'))
    }
    else {
        roomSlot = state.roomSlot
    }

    updatedstate = {
        gameTime,
        gameResources,
        gameActivities,
        gameRoomObjects,
        activeTab,
        roomSlot
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

export function roundNumber(number, decimal) {
    let formatNumber = (Math.round(number * 100) / 100).toFixed(decimal)

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



