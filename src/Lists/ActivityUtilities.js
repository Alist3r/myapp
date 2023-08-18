import * as constants from '../Utilities/StringsConst.js'
import * as utilities from '../Utilities/UtilityFunctions.js'

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
            { resource: constants.RES_000.name, clickRatio: 1, flatValue: 1}
        ],
        boost: 0,
        unlocked: true,
        unlockedFrom: null
    },
    {   //Running
        name: constants.ACT_001.name, 
        description: constants.ACT_001.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 12, upgradeCostRatio: 0.13}
        ],
        effect: [
            { resource: constants.RES_001.name, perSecRatio: 0.09, flatValue: 0.09},
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_000.name, neededValue: 12} //Unlocked from Physical Energy
        ]
    },
    {   //Short Rest
        name: constants.ACT_002.name, 
        description: constants.ACT_002.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 10, upgradeCostRatio: 0.40 }
        ],
        effect: [
            { resource: constants.RES_000.name, perSecRatio: 0.18, flatValue: 0.32}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_001.name, neededStage: 4} //Unlocked from Running
        ]
    },
    {   //Sleep
        name: constants.ACT_003.name,
        description: constants.ACT_003.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 10, upgradeCostRatio: 1.2}
        ],
        effect: [
            { resource: constants.RES_000.name, perSecRatio: 0.35, flatRatio: 0.35},
            { resource: constants.RES_000.name, maxValue: 50, flatRatio: 50}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_001.name, neededStage: 6},//Unlocked from Running
            { activity: constants.ACT_001.name, neededStage: 5} //Unlocked from Short Rest
        ]
    },
    /*{   //YOGA
        name: constants.ACT_010.name,
        description: constants.ACT_010.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_004.name, cost: 20, upgradeCostRatio: 0.3}
        ],
        effect: [
            { resource: constants.RES_002.name, perSecRatio: 0.32, flatValue: 0.32}
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { shopItem: constants.SHP_002.name}
        ]
    },
    {   //JOGGING
        name: constants.ACT_004.name,
        description: constants.ACT_004.description,
        grade: 0,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_004.name, cost: 10, upgradeCostRatio: 0.2}
        ],
        effect: [
            { resource: constants.RES_001.name, perSecRatio: 0.32, flatValue: 0.32},
            { resource: constants.RES_000.name, perSecRatio: -0.16, flatValue: -0.16}
        ],
        boost: 0,
        modulable: true,
        unlocked: false,
        unlockedFrom: [
            { shopItem: constants.SHP_001.name}
        ]
    },
    /*{   //REST
        name: constants.ACT_005.name,
        description: constants.ACT_005.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_001.name, cost: 25, upgradeCostRatio: 0.2}
        ],
        effect: [
            { resource: constants.RES_004.name, percRatio: 10, flatValue: 10}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_001.name, neededValue: 10}
        ]
    },
    {   //MEDITATE
        name: constants.ACT_006.name, 
        description: constants.ACT_006.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_002.name, cost: 30, upgradeCostRatio: 0.3}
        ],
        effect: [
            { resource: constants.RES_002.name, percRatio: 7, flatValue: 7}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { shopItem: constants.SHP_002.name}
        ]
    },
    {   //READING BOOK
        name: constants.ACT_007.name,
        description: constants.ACT_007.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_002.name, cost: 23, upgradeCostRatio: 0.3}
        ],
        effect: [
            { resource: constants.RES_003.name, percRatio: 10, flatValue: 10}
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            {shopItem: constants.SHP_003.name}
        ]
    },
    {   //OBSTACLE COURSE
        name: constants.ACT_008.name,
        description: constants.ACT_008.description,
        grade: 0,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_001.name, cost: 100, upgradeCostRatio: 0.3},
            { resource: constants.RES_006.name, cost: 50, upgradeCostRatio: 0.3}
        ],
        effect: [
            { resource: constants.RES_001.name, percRatio: 10, flatValue: 10},
            { resource: constants.RES_006.name, percRatio: 10, flatValue: 10},
            { resource: constants.RES_000.name, perSecRatio: -0.12, flatValue: -0.12}
        ],
        boost: 0,
        modulable: true,
        unlocked: false,
        unlockedFrom: [
            {roomObject: constants.OBJ_001.name}
        ]
    },
    {   //MASSAGE
        name: constants.ACT_009.name,
        description: constants.ACT_009.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 25, upgradeCostRatio: 0.7}
        ],
        effect: [
            { resource: constants.RES_004.name, maxValue: 2500, flatValue: 2500},
            { resource: constants.RES_002.name, maxValue: 2500, flatValue: 2500},
            { resource: constants.RES_001.name, maxValue: 2000, flatValue: 2000},
            { resource: constants.RES_003.name, maxValue: 1000, flatValue: 1000},
            { resource: constants.RES_006.name, maxValue: 1000, flatValue: 1000},
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_005.name, neededValue: 0.01}
        ]
    }*/
    
]

export function applyEffectsToActivity(booster, resources, activities, howManyTimes, type) {
    
    let modifier = 1
    if(type === "remove")
      modifier = -1

    let boosterEffects = booster.effectActivity.slice()

    boosterEffects.forEach(effect => {
        let index = activities.findIndex(x => x.name === effect.activity) //find the correct activity to boost
        let activityToBoost = activities[index]
        let activityEffects


        activityToBoost.boost += effect.percRatio * howManyTimes * modifier  //update the boost to the activity
        activityEffects = activityToBoost.effect //effects of the activity

        let stageOrGrade
        if (activityToBoost.modulable) //we need to reference to the current stage or grade of the activity to boost
            stageOrGrade = activityToBoost.grade
        else  
            stageOrGrade = activityToBoost.stage

        activityEffects.forEach(actEffect => {
            /* It's necessary to remove from the resource the actual bonus from thea activity
            according to the boost received by the activity*/
            let resourceToUpdate
            let resIndex = resources.findIndex(x => x.name === actEffect.resource) // find the resource to modify
            let effectType = utilities.wichEffect(actEffect)
            
            resourceToUpdate = resources[resIndex]

        
        switch (effectType) {
            // OK OK OK OK 
            case "perSecRatio": if(actEffect.perSecRatio > 0) { //applies only to positive effects of the activity
                                    resourceToUpdate.flatRatio -= (actEffect.perSecRatio * stageOrGrade) //remove from the resource the actual value from the activity

                                    actEffect.perSecRatio = actEffect.flatValue + utilities.percValue(actEffect.flatValue, activityToBoost.boost)

                                    if(stageOrGrade > 0) {
                                        resourceToUpdate.flatRatio += (actEffect.perSecRatio * stageOrGrade)
                                        resourceToUpdate.incRatio = resourceToUpdate.flatRatio + utilities.percValue(resourceToUpdate.flatRatio, resourceToUpdate.boost)
                                    }
                                }           
                                break;
            // OK OK OK OK
            case "percRatio":   if(actEffect.percRatio > 0) {
                                    resourceToUpdate.boost -= (actEffect.percRatio * stageOrGrade)

                                    actEffect.percRatio = actEffect.flatValue + utilities.percValue(actEffect.flatValue, activityToBoost.boost)

                                    if(stageOrGrade > 0) {
                                        resourceToUpdate.boost += (actEffect.percRatio * stageOrGrade)
                                        resourceToUpdate.incRatio = resourceToUpdate.flatRatio + utilities.percValue(resourceToUpdate.flatRatio, resourceToUpdate.boost)
                                    }
                                }
                                break;
            // OK OK OK OK               
            case "maxValue":    resourceToUpdate.maxValue -= (actEffect.maxValue * stageOrGrade)
                                
                                actEffect.maxValue = actEffect.flatValue + utilities.percValue(actEffect.flatValue, activityToBoost.boost)

                                if(stageOrGrade > 0) {
                                    resourceToUpdate.maxValue += (actEffect.maxValue * stageOrGrade)
                                }
                                break;
            // OK OK OK OK
            case "clickRatio":  if(actEffect.clickRatio > 0 )
                                    actEffect.clickRatio = actEffect.flatValue + utilities.percValue(actEffect.flatValue, activityToBoost.boost)
                                   
                                break;
                                
            
                                
          default: break;
        }

      });
    });
    
}

