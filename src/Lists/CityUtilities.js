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
            { resource: constants.RES_005.name, cost: 30, upgradeCostRatio: 1.2}
        ],
        effect: [
            { resource: constants.RES_006.name, perSecRatio: 0.45}
        ],
        timeSlot: 0,
        isBought: false,
        isActive: false,
        isPassive: false,
        unlocked: false,
        unlockedFrom: null
    },
    {   //LIBRARY
        name: constants.OBJ_002.name,
        description: constants.OBJ_002.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 55, upgradeCostRatio: 1.2}
        ],
        effect: [
            { resource: constants.RES_003.name, perSecRatio: 0.45}
        ],
        timeSlot: 0,
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
        ],
        effect: [
            { resource: constants.RES_002.name, perSecRatio: 0.32}
        ],
        timeSlot: 0,
        effectActivity: null,
        isBought: false,
        isActive: false,
        isPassive: false,
        unlocked: false,
        unlockedFrom: null
    },
    {   //VAULT
        name: constants.OBJ_005.name,
        description: constants.OBJ_005.description,
        stage: 0,
        upgradeCost: [
            { resource: constants.RES_005.name, cost: 150, upgradeCostRatio: 1.3}
        ],
        effect: [
            { resource: constants.RES_005.name, maxValue: 500}
        ],
        timeSlot: 0,
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
        jobExp: {
            grade: 0,
            current: 0,
            toLvUp: 1000,
            modifier: 0.018,
        },
        effect: [
            { resource: constants.RES_005.name, perSecRatio: 0.12, flatValue: 0.12},
            { resource: constants.RES_000.name, perSecRatio: -2.24, flatValue: -2.24},
            { resource: constants.RES_004.name, perSecRatio: -0.004, flatValue: -0.004}
        ],
        unlocked: true,
        unlockedFrom: false
    }
]

export const jobGrades = [
    "Novice",
    "Proficient",
    "Master"
]