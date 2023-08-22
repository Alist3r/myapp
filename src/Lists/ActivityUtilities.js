import * as constants from '../Utilities/StringsConst.js'
import * as utilities from '../Utilities/UtilityFunctions.js'
import {applyEffectToResource} from '../Lists/ResourcesUtilities.js'

//RESOURCES
//000 Energy
//001 
//002 
//003 
//004 
//005 
//006 

//ACTIVITIES
//000 Collect Energy!
//001 Running
//002
//003 
//004 
//005 
//006 
//007 
//008 
//009 
//010 


export const activityList = [
    {   //Collect Energy!
        name: constants.ACT_000.name,
        description: constants.ACT_000.description,
        stage: null,
        upgradeCost: null,
        effect: [
            { resource: constants.RES_000.name, clickRatio: 1, baseRatio: 1}
        ],
        multiplier: 1,
        unlocked: true,
        unlockedFrom: null,
        modul: false
    },
    {   //Running
        name: constants.ACT_001.name, 
        description: constants.ACT_001.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 12, upgradeCostRatio: 0.13}
        ],
        effect: [
            { resource: constants.RES_001.name, perSecRatio: 0.09, baseRatio: 0.09},
        ],
        multiplier: 1,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_000.name, neededValue: 12} //Unlocked from Physical Energy
        ],
        modul: false
    },
    {   //Short Rest
        name: constants.ACT_002.name, 
        description: constants.ACT_002.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 10, upgradeCostRatio: 0.35 }
        ],
        effect: [
            { resource: constants.RES_000.name, perSecRatio: 0.45, baseRatio: 0.45}
        ],
        multiplier: 1,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_001.name, neededStage: 1} //Unlocked from Running
        ],
        modul: false
    },
    {   //Sleep
        name: constants.ACT_003.name,
        description: constants.ACT_003.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 10, upgradeCostRatio: 0.8}
        ],
        effect: [
            { resource: constants.RES_000.name, perSecRatio: 0.87, baseRatio: 0.87},
            { resource: constants.RES_000.name, maxValue: 100, baseRatio: 100}
        ],
        multiplier: 1,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_001.name, neededStage: 1}//Unlocked from Running
            //{ activity: constants.ACT_001.name, neededStage: 1} //Unlocked from Short Rest
        ],
        modul: false
    }    
]

export function applyEffectsToActivity(talent, resources, activities, howManyTimes, type) {
    
    //let modifier = 1
    //if(type === "remove")
      //modifier = -1

    let talentEffects = talent.effectActivity.slice() //copy the activities to boost

    talentEffects.forEach(effect => {
        let index = activities.findIndex(x => x.name === effect.activity) //find the correct activity to boost
        let activityToBoost = activities[index] //activity to boos
        let activityEffects 

        activityToBoost.multiplier *= (effect.multiRatio * howManyTimes)   //update the boost to the activity
        activityEffects = activityToBoost.effect ////activity's effect

        let stageOrGrade
        if (activityToBoost.modul) //we need to reference to the current stage or grade of the activity to boost
            stageOrGrade = activityToBoost.grade
        else  
            stageOrGrade = activityToBoost.stage

        activityEffects.forEach(actEffect => {
            /* It's necessary to remove from the resource the actual bonus from the activity
            according to the boost received by the activity*/
            let resourceToUpdate
            let resIndex = resources.findIndex(x => x.name === actEffect.resource) // find the resource to modify
            let effectType = utilities.wichEffect(actEffect)
            
            resourceToUpdate = resources[resIndex]

        
            switch (effectType) {
                // OK OK OK OK 
                case "perSecRatio": if(actEffect.perSecRatio > 0) { //applies only to positive effects of the activity
                                        resourceToUpdate.baseIncRatio -= (actEffect.perSecRatio * stageOrGrade) //remove from the resource the actual value from the activity
                                        actEffect.perSecRatio = actEffect.baseRatio * activityToBoost.multiplier

                                        applyEffectToResource(resourceToUpdate,actEffect,stageOrGrade)                                    
                                    }           
                                    break;
                // OK OK OK OK
                /*case "multiRatio":   if(actEffect.multiRatio > 0) {
                                        resourceToUpdate.boost -= (actEffect.multiRatio * stageOrGrade)

                                        actEffect.multiRatio = actEffect.flatValue + utilities.percValue(actEffect.flatValue, activityToBoost.boost)

                                        if(stageOrGrade > 0) {
                                            resourceToUpdate.boost += (actEffect.multiRatio * stageOrGrade)
                                            resourceToUpdate.incRatio = resourceToUpdate.flatRatio + utilities.percValue(resourceToUpdate.flatRatio, resourceToUpdate.boost)
                                        }
                                    }
                                    break;*/
                // OK OK OK OK               
                case "maxValue":    resourceToUpdate.maxValue -= (actEffect.maxValue * stageOrGrade)                                   
                                    actEffect.maxValue = actEffect.baseRatio * activityToBoost.multiplier                                 
                                    applyEffectToResource(resourceToUpdate,actEffect,stageOrGrade)   
                                    break;
                // OK OK OK OK
                /*case "clickRatio":  if(actEffect.clickRatio > 0 )
                                        actEffect.clickRatio = actEffect.flatRatio + utilities.percValue(actEffect.flatValue, activityToBoost.boost)
                                    
                                    break;*/
                                    
                
                                    
            default: break;
            }

        });
    });
    
}

