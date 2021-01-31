import * as resNames from './StringsConst.js';

//001 Athleticism
//002 Psiche
//003 Knowledge
//004 Free Time
//005 Demir

const resourcesList = [
    {   //ATHLETICISM
        name: resNames.RES_001.name, 
        currentValue: 0, 
        maxValue: 2000, 
        incRatio: 0, 
        unlocked: true,
        unlockedFrom: null
    },
    {   //PSICHE
        name: resNames.RES_002.name, 
        currentValue: 0, 
        maxValue: 1500, 
        incRatio: 0, 
        unlocked: false,
        unlockedFrom: null
    },
    {   //KNOWLEDGE
        name: resNames.RES_003.name, 
        currentValue: 0, 
        maxValue: 400, 
        incRatio: 0, 
        unlocked: false,
        unlockedFrom: null
    },
    {   //FREE TIME
        name: resNames.RES_004.name, 
        currentValue: 0, 
        maxValue: 500, 
        incRatio: 0, 
        unlocked: false,
        unlockedFrom: null
    },
    {   //DEMIR
        name: resNames.RES_005.name, 
        currentValue: 0.1, 
        maxValue: 500, 
        incRatio: 0, 
        unlocked: false,
        unlockedFrom: null,
        type: resNames.RES_TYPE_002.name,
        color: "darkorange"
    }
]

export default resourcesList