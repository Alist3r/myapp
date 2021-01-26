import * as resNames from './StringsConst.js';

const activityList = [
    {   //PUNCH THE WALL
        name: resNames.ACT_PUNCH, 
        description: 'Punches on a wall and improves your Athleticism',
        stage: null,
        upgradeCost: null,
        effect: [
            { resource: resNames.RES_ATL, clickRatio: 1}
        ],
        unlocked: true,
        unlockedFrom: null    
    },
    {   //JOGGING
        name: resNames.ACT_JOGG,
        description: 'Just doing some Jogging around, helping you to produce Athleticism',
        stage: 0,
        upgradeCost: [
            {resource: resNames.RES_ATL, cost: 10, upgradeCostRatio: 0.3}
        ],
        effect: [
            {resource: resNames.RES_ATL, perSecRatio: 0.5}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_ATL, neededValue: 35}
        ]
    },
    {   //REST
        name: resNames.ACT_REST,
        description: 'Rest and consume some of your Athleticism',
        stage: null,
        upgradeCost: null,
        clickCost: [
            {resource: resNames.RES_ATL, cost: 100}
        ],
        effect: [
            {resource: resNames.RES_PSI, clickRatio: 1}
        ],
        unlocked: true,
        unlockedFrom: null
    },
    {   //MEDITATE
        name: resNames.ACT_MEDIT, 
        description: 'Enter a meditate state, improves your mental state. Produces Psiche.',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_PSI, cost: 7, upgradeCostRatio: 0.3 }
        ],
        effect: [
            { resource: resNames.RES_PSI, perSecRatio: 0.08}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_PSI, neededValue: 5}
        ]    
    }

]

export default activityList;