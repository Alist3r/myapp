import * as resNames from '../Utilities/StringsConst.js';

//000 Food
//001 Athleticism
//002 Psiche
//003 Knowledge
//004 Energy
//005 Demir


const resourcesList = [
    {   //FOOD
        name: resNames.RES_000.name,
        currentValue: 5000,
        maxValue: 5000,
        incRatio: -3.92,
        boost: 0,
        flatRatio: -3.92,
        unlocked: true,
        unlockedFrom: null

    },
    {   //ENERGY
        name: resNames.RES_004.name, 
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
        name: resNames.RES_001.name, 
        currentValue: 0, 
        maxValue: 4000, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //PSICHE
        name: resNames.RES_002.name, 
        currentValue: 0, 
        maxValue: 2500, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //KNOWLEDGE
        name: resNames.RES_003.name, 
        currentValue: 0, 
        maxValue: 1000, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null
    },
    {   //DEMIR
        name: resNames.RES_005.name, 
        currentValue: 0, 
        maxValue: 800, 
        incRatio: 0, 
        boost: 0,
        flatRatio: 0,
        unlocked: false,
        unlockedFrom: null,
        type: resNames.RES_TYPE_002.name,
        color: "darkorange"
    }
]

export default resourcesList