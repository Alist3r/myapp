import * as resNames from '../Utilities/StringsConst.js';

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
//008 Massage

//ROOMOBJECTS
//001 Treadmill
//002 Library
//003 Agenda
//004 Training Mat

const roomObjectsList = [
    {   //TREADMILL
        name: resNames.OBJ_001.name,
        description: resNames.OBJ_001.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 40, upgradeCostRatio: 1.3},
        ],
        effect: [
            { resource: resNames.RES_001.name, percRatio: 10},
            { resource: resNames.RES_001.name, percMaxValue: 20}
        ],
        isBought: false,
        isActive: false,
        requiredSlot: 1,
        unlocked: true,
        unlockedFrom: null
    },
    {   //LIBRARY
        name: resNames.OBJ_002.name,
        description: resNames.OBJ_002.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 55, upgradeCostRatio: 1.3}
        ],
        effect: [
            { resource: resNames.RES_003.name, perSecRatio: 0.02},
            { resource: resNames.RES_003.name, percMaxValue: 15}
        ],
        isBought: false,
        isActive: false,
        requiredSlot: 1,
        unlocked: true,
        unlockedFrom: null
    },
    {   //AGENDA
        name: resNames.OBJ_003.name,
        description: resNames.OBJ_003.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 66, upgradeCostRatio: 1.3}
        ],
        effect: [
            //{ resource: resNames.RES_004.name, perSecRatio: 0.01},
            { resource: resNames.RES_004.name, percMaxValue: 10}
        ],
        effectActivity: [
            { activity: resNames.ACT_002.name, percRatio: 10},
            { activity: resNames.ACT_003.name, percRatio: 10},
            { activity: resNames.ACT_007.name, percRatio: 20}
        ],
        isBought: false,
        isActive: false,
        requiredSlot: 2,
        unlocked: false,
        unlockedFrom: null
    },
    {   //TRAINING MAT
        name: resNames.OBJ_004.name,
        description: resNames.OBJ_004.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 20, upgradeCostRatio: 0.8}
        ],
        effect: [
            { resource: resNames.RES_002.name, perSecRatio: 0.12},
            { resource: resNames.RES_002.name, percMaxValue: 10}
        ],
        effectActivity: null,
        isBought: false,
        isActive: false,
        requiredSlot: 1,
        unlocked: true,
        unlockedFrom: null
    }
]

export default roomObjectsList;