import * as constants from '../Utilities/StringsConst.js'
import * as utilities from '../Utilities/UtilityFunctions.js'

//RESOURCERS
//001 Athleticism
//002 Psiche
//003 Knowledge
//004 Free Time

//ACTIVITIES
//001 Save Energy
//002 Meditate
//003 Jogging
//004 Rest
//005 Reading Books
//006 Save Time
//007 Go to Job
//008 Cook Food


export const activityList = [
    {   //SAVE ENERGY
        name: constants.ACT_001.name, 
        description: constants.ACT_001.description,
        stage: null,
        upgradeCost: null,
        effect: [
            { resource: constants.RES_004.name, clickRatio: 1, flatValue: 1}
        ],
        boost: 0,
        unlocked: true,
        unlockedFrom: null
    },
    {   //JOGGING
        name: constants.ACT_003.name,
        description: constants.ACT_003.description,
        grade: 0,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_004.name, cost: 10, upgradeCostRatio: 0.02}
        ],
        effect: [
            { resource: constants.RES_001.name, perSecRatio: 0.56, flatValue: 0.56},
            { resource: constants.RES_000.name, perSecRatio: -0.16, flatValue: -0.16}
        ],
        boost: 0,
        modulable: true,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_004.name, neededValue: 10}
        ]
    },
    {   //REST
        name: constants.ACT_004.name,
        description: constants.ACT_004.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_001.name, cost: 15, upgradeCostRatio: 0.02}
        ],
        effect: [
            { resource: constants.RES_004.name, perSecRatio: 0.27, flatValue: 0.27}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_003.name, neededStage: 5}
        ]
    },
    {   //GO TO JOB
        name: constants.ACT_007.name,
        description: constants.ACT_007.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_004.name, cost: 37, upgradeCostRatio: 0.05}
        ],
        effect: [
            { resource: constants.RES_005.name, perSecRatio: 0.1, flatValue: 0.1}
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_004.name, neededStage: 5}
        ]
    },
    {   //MEDITATE
        name: constants.ACT_002.name, 
        description: constants.ACT_002.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_004.name, cost: 3, upgradeCostRatio: 0.03 }
        ],
        effect: [
            { resource: constants.RES_002.name, percRatio: 7, flatValue: 7}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { roomObject: constants.OBJ_004.name}
        ]
    },
    {   //READING BOOK
        name: constants.ACT_005.name,
        description: constants.ACT_005.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_002.name, cost: 23, upgradeCostRatio: 0.03},
            { resource: constants.RES_004.name, cost: 25, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: constants.RES_003.name, percRatio: 3, flatValue: 3}
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            {roomObject: constants.OBJ_002.name}
        ]
    },
    {   //MASSAGE
        name: constants.ACT_008.name,
        description: constants.ACT_008.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 25, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: constants.RES_004.name, maxValue: 800, flatValue: 800},
            { resource: constants.RES_001.name, maxValue: 750, flatValue: 750},
            { resource: constants.RES_002.name, maxValue: 500, flatValue: 500},
            { resource: constants.RES_003.name, maxValue: 200, flatValue: 200}
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_005.name, neededValue: 0.01}
        ]
    },
    {   //COOK FOOD
        name: constants.ACT_009.name,
        description: constants.ACT_009.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_003.name, cost: 10, upgradeCostRatio: 0.01},
            { resource: constants.RES_004.name, cost: 25, upgradeCostRatio: 0.02}
        ],
        effect: [
            { resource: constants.RES_000.name, perSecRatio: 0.62, flatValue: 0.62},
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { activity: constants.ACT_005.name, neededStage: 5}
        ]
    },
    /*{   //SAVE TIME
        name: constants.ACT_006.name,
        description: constants.ACT_006.description,
        stage: null,
        clickCost: [
            { resource: constants.RES_001.name, cost: 100}
        ],
        effect: [
            { resource: constants.RES_004.name, clickRatio: 37}
        ],
        unlocked: false,
        unlockedFrom: null
    },*/
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

