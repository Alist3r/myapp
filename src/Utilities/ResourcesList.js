import * as resNames from './StringsConst.js';

const resourcesList = [
    {
        name: resNames.RES_ATL, 
        currentValue: 0, 
        maxValue: 1000, 
        incRatio: 0, 
        unlocked: true,
        unlockedFrom: null
    },
    {
        name: resNames.RES_PSI, 
        currentValue: 0, 
        maxValue: 500, 
        incRatio: 0, 
        unlocked: false,
        unlockedFrom: null
    }
]

export default resourcesList