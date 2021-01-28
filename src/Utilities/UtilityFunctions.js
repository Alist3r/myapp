import * as constants from '../Utilities/StringsConst.js'

export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
    localStorage.setItem("gameActivities", JSON.stringify(state.gameActivities));
    localStorage.setItem("activeTab", JSON.stringify(state.activeTab));
}

export function loadState(state) {
    let updatedstate
    let gameTime
    let gameResources
    let gameActivities
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

    if(parseInt(localStorage.getItem('activeTab'))) {
        activeTab = parseInt(localStorage.getItem('activeTab'))
    }
    else {
        activeTab = state.activeTab
    }

    updatedstate = {
        gameTime,
        gameResources,
        gameActivities,
        activeTab
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
        formatNumber = (Math.round(number * 1) / 1000).toFixed(2) + "K"
    
    if(formatNumber > 999999 && formatNumber <= 999999999) 
        formatNumber = (Math.round(number * 1) / 1000000).toFixed(2) + "M"  
    
    if(formatNumber > 999999999 && formatNumber <= 999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000).toFixed(2) + "G"  
    
    if(formatNumber > 999999999 && formatNumber <= 999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000).toFixed(2) + "T"  

    if(formatNumber > 999999999999999 && formatNumber <= 999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000).toFixed(2) + "P"  

    if(formatNumber > 999999999999999999 && formatNumber <= 999999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000000).toFixed(2) + "E"

    if(formatNumber > 999999999999999999999 && formatNumber <= 999999999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000000000).toFixed(2) + "Z"

    if(formatNumber > 999999999999999999999999 && formatNumber <= 999999999999999999999999999)   
        formatNumber = (Math.round(number * 1) / 1000000000000000000000000).toFixed(2) + "Y"
    
    if(formatNumber > 999999999999999999999999999)
        formatNumber = (Math.round(number * 1) / 1000000000000000000000000).toFixed(2) + "Y"   

    return formatNumber; 
}



