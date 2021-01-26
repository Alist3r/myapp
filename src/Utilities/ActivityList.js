import * as resNames from './StringsConst.js';

const activityList = [
    {
        name: resNames.ACT_PUNCH, 
        description: 'Punches on a wall',
        effectDesc:  'Gain 1 Athleticism and 2 Psiche on every click',
        stage: null,
        upgradeCost: null,
        effect: [
            { resource: resNames.RES_ATL, clickRatio: 1},
            { resource: resNames.RES_PSI, clickRatio: 2}
        ],
        defaultUnlocked: true,
        unlockedFrom: null    
    },
    {
        name: resNames.ACT_MEDIT, 
        description: 'Enter a meditate state',
        effectDesc:  'Every level of meditate grants Psiche and Athleticism production',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_ATL, cost: 15, upgradeCostRatio: 0.5},
            { resource: resNames.RES_PSI, cost: 30, upgradeCostRatio: 0.3 }
        ],
        effect: [
            { resource: resNames.RES_ATL, perSecRatio: null, percRatio: 3, clickRatio: null, maxValue: null },
            { resource: resNames.RES_ATL, maxValue: 1},
            { resource: resNames.RES_PSI, perSecRatio: 0.2},
            { resource: resNames.RES_PSI, maxValue: 50}
        ],
        defaultUnlocked: true,
        unlockedFrom: null    
    }

]

export default activityList;