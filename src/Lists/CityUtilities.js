import * as constants from '../Utilities/StringsConst.js';

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
//001 Jump Rope
//002 Library
//003 Agenda
//004 Training Mat

export const homeObjectsList = [
    {   //JUMP ROPE
        name: constants.OBJ_001.name,
        description: constants.OBJ_001.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 30, upgradeCostRatio: 1.2},
            { resource: constants.RES_007.name, cost: 1, upgradeCostRatio: 0}
        ],
        effect: [
            { resource: constants.RES_006.name, perSecRatio: 0.45}
        ],
        isBought: false,
        isActive: false,
        isPassive: false,
        unlocked: true,
        unlockedFrom: null
    },
    {   //LIBRARY
        name: constants.OBJ_002.name,
        description: constants.OBJ_002.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 55, upgradeCostRatio: 1.2},
            { resource: constants.RES_007.name, cost: 1, upgradeCostRatio: 0}
        ],
        effect: [
            { resource: constants.RES_003.name, perSecRatio: 0.45}
        ],
        isBought: false,
        isActive: false,
        isPassive: false,
        unlocked: true,
        unlockedFrom: null
    },
    {   //TRAINING MAT
        name: constants.OBJ_004.name,
        description: constants.OBJ_004.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 20, upgradeCostRatio: 1.1},
            { resource: constants.RES_007.name, cost: 1, upgradeCostRatio: 0}
        ],
        effect: [
            { resource: constants.RES_002.name, perSecRatio: 0.32}
        ],
        effectActivity: null,
        isBought: false,
        isActive: false,
        isPassive: false,
        unlocked: true,
        unlockedFrom: null
    },
    /*{   //AGENDA
        name: constants.OBJ_003.name,
        description: constants.OBJ_003.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 66, upgradeCostRatio: 1.3},
            { resource: constants.RES_007.name, cost: 1, upgradeCostRatio: 0}
        ],
        effect: null,
        effectActivity: [
            { activity: constants.ACT_001.name, percRatio: 10},
            { activity: constants.ACT_002.name, percRatio: 10},
            { activity: constants.ACT_007.name, percRatio: 20}
        ],
        isBought: false,
        isActive: false,
        isPassive: false,
        unlocked: true,
        unlockedFrom: null
    },*/
    {   //VAULT
        name: constants.OBJ_005.name,
        description: constants.OBJ_005.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 150, upgradeCostRatio: 1.3},
            { resource: constants.RES_007.name, cost: 0, upgradeCostRatio: 0}
        ],
        effect: [
            { resource: constants.RES_005.name, maxValue: 500}
        ],
        effectActivity: null,
        isBought: false,
        isActive: false,
        isPassive: true,
        unlocked: true,
        unlockedFrom: null
    },
]

export const jobMansionsList = [
    {
        name: "Deliverfood Courier",
        description: "You start a job for a famous delivery food multinational",
        timeSlot: 0,
        effect: [
            { resource: constants.RES_005.name, perSecRatio: 0.10, flatValue: 0.10}
        ],
        unlocked: true,
        unlockedFrom: false
    }
]