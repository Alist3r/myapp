import * as constants from '../Utilities/StringsConst.js';
import * as utilities from '../Utilities/UtilityFunctions.js'

//000 Food
//001 Athleticism
//002 Psiche
//003 Knowledge
//004 Energy
//005 Demir

export const resourcesList = [
    {   //FOOD
        name: constants.RES_000.name,
        currentValue: 5000,
        maxValue: 5000,
        incRatio: -3.92,
        boost: 0,
        flatRatio: -3.92,
        unlocked: true,
        unlockedFrom: null

    },
    {   //ENERGY
        name: constants.RES_004.name, 
        currentValue: 0, 
        maxValue: 4000, 
        baseRatio: 0, 
        incRatio: 0,
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //ATHLETICISM
        name: constants.RES_001.name, 
        currentValue: 0, 
        maxValue: 4000, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //PSICHE
        name: constants.RES_002.name, 
        currentValue: 0, 
        maxValue: 2500, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //KNOWLEDGE
        name: constants.RES_003.name, 
        currentValue: 0, 
        maxValue: 1000, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //DEMIR
        name: constants.RES_005.name, 
        currentValue: 0, 
        maxValue: 800, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null,
        type: constants.RES_TYPE_002.name,
        color: "darkorange"
    }
]

export function applyEffectsToResources(resources, effects, howManyTimes, type) {

    
    let modifier = 1
    if (type === "remove") // in case we need to remove the effects from the resources
        modifier = -1
    
    effects.forEach(effect => {
        let index = resources.findIndex(x => x.name === effect.resource) //find the correct resource to modify
        let resource = resources[index]
        let effectType = utilities.wichEffect(effect) //return the correct effect type

        switch (effectType) {

            case "perSecRatio":     resource.flatRatio += (effect.perSecRatio * howManyTimes * modifier)
                                    resource.incRatio = resource.flatRatio + utilities.percValue(resource.flatRatio, resource.boost)
                                    break;

            case "maxValue":        resources[index].maxValue += (effect.maxValue * howManyTimes * modifier);
                                    break;

            case "clickRatio":      resources[index].currentValue += (effect.clickRatio * modifier);
                                    break;

            case "percRatio":       resources[index].boost += effect.percRatio * howManyTimes * modifier
                                    resource.incRatio = resource.flatRatio + utilities.percValue(resource.flatRatio, resource.boost)
                                    break;          
        
            default: break;
        }    

        if(resources[index].unlocked === false && resources[index].incRatio > 0)
            resources[index].unlocked = true   
    });

}