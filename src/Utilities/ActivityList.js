import * as resNames from './StringsConst.js';

//RESOURCERS
//001 Athleticism
//002 Psiche
//003 Knowledge
//004 Free Time

//ACTIVITIES
//001 Walking
//002 Meditate
//003 Jogging
//004 Rest
//005 Reading Books
//006 Do nothing

const activityList = [
    {   //WALKING
        name: resNames.ACT_001.name, 
        description: resNames.ACT_001.description,
        stage: null,
        upgradeCost: null,
        effect: [
            { resource: resNames.RES_001.name, clickRatio: 1}
        ],
        unlocked: true,
        unlockedFrom: null    
    },
    {   //REST
        name: resNames.ACT_004.name,
        description: 'Rest and consume some of your Athleticism',
        stage: null,
        upgradeCost: null,
        clickCost: [
            {resource: resNames.RES_001.name, cost: 100}
        ],
        effect: [
            {resource: resNames.RES_002.name, clickRatio: 1}
        ],
        unlocked: true,
        unlockedFrom: null
    },
    {   //JOGGING
        name: resNames.ACT_003.name,
        description: 'Just doing some Jogging around, helping you to produce Athleticism',
        stage: 0,
        upgradeCost: [
            {resource: resNames.RES_001.name, cost: 10, upgradeCostRatio: 0.009}
        ],
        effect: [
            {resource: resNames.RES_001.name, perSecRatio: 0.52}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_001.name, neededValue: 10}
        ]
    },
    {   //MEDITATE
        name: resNames.ACT_002.name, 
        description: 'Enter a meditate state, improves your mental state. Produces Psiche.',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_002.name, cost: 5, upgradeCostRatio: 0.01 }
        ],
        effect: [
            { resource: resNames.RES_002.name, perSecRatio: 0.36}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_002.name, neededValue: 1}
        ]    
    },
    {   //DO NOTHING
        name: resNames.ACT_006.name,
        description: 'Sacrifice your physics and mental excercise but gain Free Time',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_001.name, cost: 40, upgradeCostRatio: 0.01},
            { resource: resNames.RES_002.name, cost: 25, upgradeCostRatio: 0.009}
        ],
        effect: [
            { resource: resNames.RES_001.name, perSecRatio: -0.03},
            { resource: resNames.RES_002.name, perSecRatio: -0.02},
            { resource: resNames.RES_004.name, perSecRatio: 0.10},
            { resource: resNames.RES_001.name, maxValue: 250},
            { resource: resNames.RES_002.name, maxValue: 125}
        ],
        unlocked: false,
        unlockedFrom: [
            {activity: resNames.ACT_003.name, neededStage: 15},
            {activity: resNames.ACT_002.name, neededStage: 3}
        ]
    },
    {   //READING BOOK
        name: resNames.ACT_005.name,
        description: 'Spends your Free Time to reading books',
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 60, upgradeCostRatio: 0.009}
        ],
        effect: [
            { resource: resNames.RES_003.name, perSecRatio: 0.04},
            { resource: resNames.RES_004.name, perSecRatio: -0.007}
        ],
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_004.name, neededValue: 1}
        ]
    }

]

export default activityList;