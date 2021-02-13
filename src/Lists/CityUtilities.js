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
//001 Jump Rope
//002 Library
//003 Agenda
//004 Training Mat

export const homeObjectsList = [
    {   //JUMP ROPE
        name: resNames.OBJ_001.name,
        description: resNames.OBJ_001.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 30, upgradeCostRatio: 1.2},
        ],
        effect: [
            { resource: resNames.RES_006.name, perSecRatio: 0.45}
        ],
        isBought: false,
        isActive: false,
        isPassive: false,
        requiredSlot: 1,
        unlocked: true,
        unlockedFrom: null
    },
    {   //LIBRARY
        name: resNames.OBJ_002.name,
        description: resNames.OBJ_002.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 55, upgradeCostRatio: 1.2}
        ],
        effect: [
            { resource: resNames.RES_003.name, perSecRatio: 0.45}
        ],
        isBought: false,
        isActive: false,
        isPassive: false,
        requiredSlot: 1,
        unlocked: true,
        unlockedFrom: null
    },
    {   //TRAINING MAT
        name: resNames.OBJ_004.name,
        description: resNames.OBJ_004.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 20, upgradeCostRatio: 1.1}
        ],
        effect: [
            { resource: resNames.RES_002.name, perSecRatio: 0.32}
        ],
        effectActivity: null,
        isBought: false,
        isActive: false,
        isPassive: false,
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
        effect: null,
        effectActivity: [
            { activity: resNames.ACT_001.name, percRatio: 10},
            { activity: resNames.ACT_002.name, percRatio: 10},
            { activity: resNames.ACT_007.name, percRatio: 20}
        ],
        isBought: false,
        isActive: false,
        isPassive: false,
        requiredSlot: 2,
        unlocked: true,
        unlockedFrom: null
    },
    {   //VAULT
        name: resNames.OBJ_005.name,
        description: resNames.OBJ_005.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 150, upgradeCostRatio: 1.3}
        ],
        effect: [
            { resource: resNames.RES_005.name, maxValue: 500}
        ],
        effectActivity: null,
        isBought: false,
        isActive: false,
        isPassive: true,
        requiredSlot: 0,
        unlocked: true,
        unlockedFrom: null
    },
]