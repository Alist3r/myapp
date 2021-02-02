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
//007 Go to Job

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
        description: resNames.ACT_004.description,
        stage: null,
        upgradeCost: null,
        clickCost: [
            { resource: resNames.RES_001.name, cost: 100}
        ],
        effect: [
            { resource: resNames.RES_002.name, clickRatio: 1}
        ],
        unlocked: true,
        unlockedFrom: null
    },
    {   //JOGGING
        name: resNames.ACT_003.name,
        description: resNames.ACT_003.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_001.name, cost: 10, upgradeCostRatio: 0.009}
        ],
        effect: [
            { resource: resNames.RES_001.name, perSecRatio: 0.56}
        ],
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_001.name, neededValue: 10}
        ]
    },
    {   //MEDITATE
        name: resNames.ACT_002.name, 
        description: resNames.ACT_002.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_002.name, cost: 3, upgradeCostRatio: 0.01 }
        ],
        effect: [
            { resource: resNames.RES_002.name, perSecRatio: 0.36}
        ],
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_002.name, neededValue: 1}
        ]    
    },
    {   //DO NOTHING
        name: resNames.ACT_006.name,
        description: resNames.ACT_006.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_001.name, cost: 40, upgradeCostRatio: 0.01},
            { resource: resNames.RES_002.name, cost: 25, upgradeCostRatio: 0.009}
        ],
        effect: [
            { resource: resNames.RES_001.name, perSecRatio: -0.03},
            { resource: resNames.RES_002.name, perSecRatio: -0.02},
            { resource: resNames.RES_004.name, perSecRatio: 0.27}
        ],
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_003.name, neededStage: 15},
            { activity: resNames.ACT_002.name, neededStage: 3}
        ]
    },
    {   //READING BOOK
        name: resNames.ACT_005.name,
        description: resNames.ACT_005.description,
        grade: 0,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 35, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: resNames.RES_003.name, perSecRatio: 0.27},
            { resource: resNames.RES_004.name, perSecRatio: -0.13}
        ],
        modulable: true,
        unlocked: false,
        unlockedFrom: [
            {resource: resNames.RES_004.name, neededValue: 1}
        ]
    },
    {   //GO TO JOB
        name: resNames.ACT_007.name,
        description: resNames.ACT_007.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 150, upgradeCostRatio: 0.03},
            { resource: resNames.RES_003.name, cost: 60, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: resNames.RES_005.name, perSecRatio: 0.09},
            { resource: resNames.RES_004.name, perSecRatio: -0.08}
        ],
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_003.name, neededValue: 70}
        ]
    },
    {   //MASSAGE
        name: resNames.ACT_008.name,
        description: resNames.ACT_008.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 80, upgradeCostRatio: 0.03},
            { resource: resNames.RES_005.name, cost: 25, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: resNames.RES_001.name, maxValue: 800},
            { resource: resNames.RES_002.name, maxValue: 300},
            { resource: resNames.RES_003.name, maxValue: 100},
        ],
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_005.name, neededValue: 0.01}
        ]
    }

]

export default activityList;