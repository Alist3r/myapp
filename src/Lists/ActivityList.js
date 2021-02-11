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
            { resource: resNames.RES_004.name, clickRatio: 1, flatValue: 1}
        ],
        boost: 0,
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
            { resource: resNames.RES_001.name, perSecRatio: 0.56, flatValue: 0.56},
            { resource: resNames.RES_000.name, perSecRatio: -0.16, flatValue: -0.16}
        ],
        boost: 0,
        modulable: true,
        unlocked: false,
        unlockedFrom: [
            { resource: resNames.RES_004.name, neededValue: 10}
        ]
    },
    {   //REST
        name: resNames.ACT_004.name,
        description: resNames.ACT_004.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_001.name, cost: 15, upgradeCostRatio: 0.02}
        ],
        effect: [
            { resource: resNames.RES_004.name, perSecRatio: 0.27, flatValue: 0.27}
        ],
        boost: 0,
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_003.name, neededStage: 5}
        ]
    },
    {   //GO TO JOB
        name: resNames.ACT_007.name,
        description: resNames.ACT_007.description,
        grade: null,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 37, upgradeCostRatio: 0.05}
        ],
        effect: [
            { resource: resNames.RES_005.name, perSecRatio: 0.1, flatValue: 0.1}
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_004.name, neededStage: 5}
        ]
    },
    {   //MEDITATE
        name: resNames.ACT_002.name, 
        description: resNames.ACT_002.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_004.name, cost: 3, upgradeCostRatio: 0.03 }
        ],
        effect: [
            { resource: resNames.RES_002.name, percRatio: 7, flatValue: 7}
        ],
        boost: 0,
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
            { resource: resNames.RES_003.name, percRatio: 3, flatValue: 3}
        ],
        boost: 0,
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
            { resource: resNames.RES_004.name, maxValue: 800, flatValue: 800},
            { resource: resNames.RES_001.name, maxValue: 750, flatValue: 750},
            { resource: resNames.RES_002.name, maxValue: 500, flatValue: 500},
            { resource: resNames.RES_003.name, maxValue: 200, flatValue: 200}
        ],
        boost: 0,
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
            { resource: resNames.RES_000.name, perSecRatio: 0.62, flatValue: 0.62},
        ],
        boost: 0,
        modulable: false,
        unlocked: false,
        unlockedFrom: [
            { activity: resNames.ACT_005.name, neededStage: 5}
        ]
    },
    /*{   //SAVE TIME
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
    },*/
]

export default activityList;