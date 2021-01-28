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
            {resource: resNames.RES_ATL, cost: 10, upgradeCostRatio: 0.008}
        ],
        effect: [
            {resource: resNames.RES_ATL, perSecRatio: 0.52}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_ATL, neededValue: 10}
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
            { resource: resNames.RES_PSI, cost: 7, upgradeCostRatio: 0.008 }
        ],
        effect: [
            { resource: resNames.RES_PSI, perSecRatio: 0.36}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_PSI, neededValue: 5}
        ]    
    },
    {   //DO NOTHING
        name: resNames.ACT_DONOTH,
        description: 'Sacrifice your physics and mental excercise but gain Free Time',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_ATL, cost: 40, upgradeCostRatio: 0.01},
            { resource: resNames.RES_PSI, cost: 25, upgradeCostRatio: 0.009}
        ],
        effect: [
            { resource: resNames.RES_ATL, perSecRatio: -0.03},
            { resource: resNames.RES_PSI, perSecRatio: -0.02},
            { resource: resNames.RES_FRT, perSecRatio: 0.10},
            { resource: resNames.RES_ATL, maxValue: 250},
            { resource: resNames.RES_PSI, maxValue: 125}
        ],
        unlocked: false,
        unlockedFrom: [
            {activity: resNames.ACT_JOGG, neededStage: 15},
            {activity: resNames.ACT_MEDIT, neededStage: 3}
        ]
    },
    {   //READING BOOK
        name: resNames.ACT_READB,
        description: 'Spends your Free Time to reading books',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_FRT, cost: 60, upgradeCostRatio: 0.009}
        ],
        effect: [
            { resource: resNames.RES_KNO, perSecRatio: 0.04},
            { resource: resNames.RES_FRT, perSecRatio: -0.007}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_FRT, neededValue: 1}
        ]
    }

]

export default activityList;