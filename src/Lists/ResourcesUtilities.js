import * as constants from '../Utilities/StringsConst.js';
import * as utilities from '../Utilities/UtilityFunctions.js'

//000 Physical Energy
//001 Physical Condition
//002 
//003 
//004 
//005 

export const resourcesList = [
    {   //Physical Energy
        name: constants.RES_000.name, 
        type: constants.RES_TYPE_000.name,
        currentValue: 0,
        maxValue: 200,
        baseMaxValue: 200,
        incRatio: 0,
        multiplier: 0,
        baseIncRatio: 0,
        unlocked: true,
        unlockedFrom: null,
    },
    {   //Physical Condition
        name: constants.RES_001.name, 
        type: constants.RES_TYPE_000.name,
        currentValue: 0, 
        maxValue: 150, 
        baseMaxValue: 150,
        incRatio: 0,
        baseIncRatio: 0, 
        multiplier: 0,
        unlocked: false,
        unlockedFrom: null
    }
]

export function applyEffectToResource(resource, effect, howManyTimes) {

    let effectType = utilities.wichEffect(effect) //return the correct effect type

    switch (effectType) {

        case "perSecRatio":     resource.baseIncRatio += (effect.perSecRatio * howManyTimes) //increases the base n times
                                if(resource.multiplier > 0) //if we have a multiplier on the resource
                                    resource.incRatio = resource.baseIncRatio * resource.multiplier // multiplies the base and the multiplier
                                else
                                    resource.incRatio = resource.baseIncRatio //else the new incRatio is equal to the base
                                break;

        case "maxValue":        resource.baseMaxValue += (effect.maxValue * howManyTimes);
                                if(resource.multiplier > 0) //if we have a multiplier on the resource
                                    resource.maxValue = resource.baseMaxValue * resource.multiplier // multiplies the base and the multiplier
                                else
                                    resource.maxValue = resource.baseMaxValue //else the new incRatio is equal to the base
                                break;

        case "clickRatio":      resource.currentValue += (effect.clickRatio);
                                break;

        case "multiRatio":      if(resource.multiplier > 0)
                                    resource.multiplier *= (effect.multiRatio * howManyTimes)
                                else    
                                    resource.multiplier += (effect.multiRatio * howManyTimes)
                                resource.incRatio = resource.baseRatio * resource.multiplier                               
                                break;          
    
        default: break;
    }    

}

export function applyEffectsToResources(resources, effects, howManyTimes, type) {

  
    //let modifier = 1
    //if (type === "remove") // in case we need to remove the effects from the resources
        //modifier = -1
    
    effects.forEach(effect => {
        let index = resources.findIndex(x => x.name === effect.resource) //find the correct resource to modify
        let resource = resources[index]

        applyEffectToResource(resource,effect,howManyTimes)

        if(resources[index].unlocked === false && resources[index].incRatio > 0)
            resources[index].unlocked = true   
    });

}