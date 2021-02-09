import * as resNames from '../Utilities/StringsConst.js'

//RESOURCERS
//001 Athleticism
//002 Psiche
//003 Knowledge
//004 Free Time

//ACTIVITIES
//001 Save Energy
//002 Meditate
//003 Jogging
//004 Rest
//005 Reading Books
//006 Save Time
//007 Go to Job
//008 Cook Food


const activityList = [
    {   //SAVE ENERGY
        name: resNames.ACT_001.name, 
        description: resNames.ACT_001.description,
        stage: null,
        upgradeCost: null,
        effect: [
            { resource: resNames.RES_004.name, clickRatio: 1}
        ],
        unlocked: true,
        unlockedFrom: null
    },
    {   //JOGGING
        name: resNames.ACT_003.name,
        description: resNames.ACT_003.description,
        grade: 0,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 10, upgradeCostRatio: 0.02}
        ],
        effect: [
            { resource: resNames.RES_001.name, perSecRatio: 0.56},
            { resource: resNames.RES_000.name, perSecRatio: -0.16}
        ],
        modulable: true,
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_004.name, neededValue: 10}
        ]
    },
    {   //SAVE TIME
        name: resNames.ACT_006.name,
        description: resNames.ACT_006.description,
        stage: null,
        clickCost: [
            { resource: resNames.RES_001.name, cost: 100}
        ],
        effect: [
            { resource: resNames.RES_004.name, clickRatio: 37}
        ],
        unlocked: false,
        unlockedFrom: null
    },
    {   //GO TO JOB
        name: resNames.ACT_007.name,
        description: resNames.ACT_007.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 31, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: resNames.RES_005.name, perSecRatio: 0.1}
        ],
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_004.name, neededStage: 5}
        ]
    },
    {   //REST
        name: resNames.ACT_004.name,
        description: resNames.ACT_004.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_001.name, cost: 12, upgradeCostRatio: 0.06}
        ],
        effect: [
            { resource: resNames.RES_004.name, perSecRatio: 0.08}
        ],
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_003.name, neededStage: 5}
        ]
    },
    {   //MEDITATE
        name: resNames.ACT_002.name, 
        description: resNames.ACT_002.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 3, upgradeCostRatio: 0.02 }
        ],
        effect: [
            { resource: resNames.RES_002.name, perSecRatio: 0.36}
        ],
        unlocked: false,
        unlockedFrom: [
            { roomObject: resNames.OBJ_004.name}
        ]
    },
    {   //READING BOOK
        name: resNames.ACT_005.name,
        description: resNames.ACT_005.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_002.name, cost: 23, upgradeCostRatio: 0.03},
            { resource: resNames.RES_004.name, cost: 25, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: resNames.RES_003.name, perSecRatio: 0.27}
        ],
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            {roomObject: resNames.OBJ_002.name}
        ]
    },
    {   //MASSAGE
        name: resNames.ACT_008.name,
        description: resNames.ACT_008.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 25, upgradeCostRatio: 0.03}
        ],
        effect: [
            { resource: resNames.RES_001.name, maxValue: 800},
            { resource: resNames.RES_004.name, maxValue: 500}
            //{ resource: resNames.RES_003.name, maxValue: 100},
        ],
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_005.name, neededValue: 0.01}
        ]
    },
    {   //COOK FOOD
        name: resNames.ACT_009.name,
        description: resNames.ACT_009.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_003.name, cost: 10, upgradeCostRatio: 0.01},
            { resource: resNames.RES_004.name, cost: 25, upgradeCostRatio: 0.02}
        ],
        effect: [
            { resource: resNames.RES_000.name, perSecRatio: 0.62},
        ],
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_005.name, neededStage: 5}
        ]
    }

]

export default activityList;