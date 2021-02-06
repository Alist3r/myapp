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

export function applyEffectsToResources(resources, effects, howManyTimes, type) {
    
    let modifier = 1
    if (type === "remove") // in case we need to remove the effects from the resources
        modifier = -1
    
    effects.forEach(effect => {
        let index = resources.findIndex(x => x.name === effect.resource) //find the correct resource to modify
        let effectType = wichEffect(effect) //return the correct effect type

        switch (effectType) {

            case "perSecRatio":     resources[index].incRatio += (effect.perSecRatio * howManyTimes * modifier); // (i.e.: 0.25 = 0.34 * 2 * -1) add 2 times -0.34 to the old ratio
                                    break;

            case "maxValue":        resources[index].maxValue += (effect.maxValue * howManyTimes * modifier);
                                    break;

            case "clickRatio":      resources[index].currentValue += (effect.clickRatio * modifier);
                                    break;

            case "percRatio":       if(modifier === 1) {
                                        for(let i=0; i < howManyTimes; i++)
                                            resources[index].incRatio += percValue(resources[index].incRatio, effect.percRatio)
                                    }
                                    else {
                                        for(let i=0; i < howManyTimes; i++)
                                            resources[index].incRatio = removePerc(resources[index].incRatio, effect.percRatio)
                                    }
                                    break;
            
            case "percMaxValue":    if(modifier === 1) {
                                        for(let i=0; i < howManyTimes; i++)
                                            resources[index].maxValue += percValue(resources[index].maxValue, effect.percMaxValue)
                                    }
                                    else {
                                        for(let i=0; i < howManyTimes; i++)
                                            resources[index].maxValue = removePerc(resources[index].maxValue, effect.percMaxValue)
                                    }
                                    break; 
        
            default: break;
        }    

        if(resources[index].unlocked === false)
            resources[index].unlocked = true   
    });

}

export function applyEffectsToActivity(booster, resources, activities, type) {
    
    let modifier = 1
    if(type === "remove")
      modifier = -1

    let effects = booster.effectActivity.slice()

    effects.forEach(effect => {
      let index = activities.findIndex(x => x.name === effect.activity) //find the correct activity to boost
      //activities[index].percBoost += effect.percRatio

      let activityEffects = activities[index].effect //effects to boost
      let stageOrGrade
      if (activities[index].modulable) //we need to reference to the current stage or grade of the activity to boost
        stageOrGrade = activities[index].grade
      else  
        stageOrGrade = activities[index].stage

      activityEffects.forEach(actEffect => {
        /* It's necessary to modifing the resource 
        according to the boost received by the activity*/
        let resIndex = resources.findIndex(x => x.name === actEffect.resource) // find the resource to modify
        let effectType = wichEffect(actEffect)
        let howManyToRemove = booster.stage
        if(booster.stage > 1)
          howManyToRemove -= 1

        
        switch (effectType) {
          case "perSecRatio":   if(actEffect.perSecRatio > 0) { //applies only to positive effects of the activity
                                  resources[resIndex].incRatio -= (actEffect.perSecRatio * stageOrGrade) //remove the entire old perSecRatio from the resource
                                  
                                  if(modifier === 1 && booster.isActive)  //if we are adding the effects to the activity and the booster was active
                                    actEffect.perSecRatio = removePerc(actEffect.perSecRatio, effect.percRatio * howManyToRemove) //Removing the old boost
                                  if(modifier === 1)
                                    actEffect.perSecRatio += percValue(actEffect.perSecRatio, effect.percRatio * booster.stage) //add the boost
                                  else
                                    actEffect.perSecRatio = removePerc(actEffect.perSecRatio, effect.percRatio * booster.stage) ///or remove the boost
                                  
                                  resources[resIndex].incRatio += (actEffect.perSecRatio * stageOrGrade) //recalculate the incRatio of the resource
                                }           
                                break;
                              
        case "maxValue":        resources[resIndex].maxValue -= (actEffect.maxValue * stageOrGrade)

                                if(modifier === 1 && booster.isActive) 
                                    actEffect.maxValue = removePerc(actEffect.maxValue, effect.percRatio * howManyToRemove)
                                if(modifier === 1)
                                  actEffect.maxValue += percValue(actEffect.maxValue, effect.percRatio * booster.stage)
                                else
                                  actEffect.maxValue = removePerc(actEffect.maxValue, effect.percRatio * booster.stage) 
                                  
                                resources[resIndex].maxValue += (actEffect.maxValue * stageOrGrade)                                    
                                break;    

          case "clickRatio":    if(actEffect.clickRatio > 0 ) {
                                  if(modifier === 1)
                                    actEffect.clickRatio += percValue(actEffect.clickRatio, effect.percRatio * booster.stage)
                                  else
                                    actEffect.clickRatio = removePerc(actEffect.clickRatio, effect.percRatio * booster.stage)
                                }    
                                break;
                                
          case "percRatio":     if(actEffect.percRatio > 0) {
                                  resources[resIndex].incRatio -= percValue(resources[resIndex].incRatio, actEffect.percRatio) * stageOrGrade

                                  if(modifier === 1 && booster.isActive) 
                                    actEffect.percRatio = removePerc(actEffect.percRatio, effect.percRatio * howManyToRemove)
                                  if(modifier === 1)
                                    actEffect.percRatio += percValue(actEffect.percRatio, effect.percRatio * booster.stage)
                                  else
                                    actEffect.percRatio = removePerc(actEffect.percRatio, effect.percRatio * booster.stage)

                                  resources[resIndex].incRatio += percValue(resources[resIndex].incRatio, actEffect.percRatio) * stageOrGrade
                                }
                                break;    
                                
          
          case "percMaxValue":  resources[resIndex].maxValue -= percValue(resources[resIndex].maxValue, actEffect.percRatio) * stageOrGrade
                                
                                if(modifier === 1 && booster.isActive) 
                                  actEffect.percMaxValue = removePerc(actEffect.percMaxValue, effect.percRatio * howManyToRemove)
                                if(modifier === 1)
                                  actEffect.percMaxValue += percValue(actEffect.percMaxValue, effect.percRatio * booster.stage)
                                else  
                                  actEffect.percMaxValue = removePerc(actEffect.percMaxValue, effect.percRatio * booster.stage)

                                resources[resIndex].maxValue += percValue(resources[resIndex].maxValue, actEffect.percRatio) * stageOrGrade
                                break;
          default: break;
        }

      });
    });
    
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
