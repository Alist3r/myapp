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

//ROOMOBJECTS
//001 Treadmill

const roomObjectsList = [
    {   //TREADMILL
        name: resNames.OBJ_001.name,
        description: resNames.OBJ_001.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 40, upgradeCostRatio: 1.5},
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
    {
        name: resNames.OBJ_002.name,
        description: resNames.OBJ_002.description,
        stage: 0,
        upgradeCost: [
            { resource: resNames.RES_005.name, cost: 55, upgradeCostRatio: 1.6},
            { resource: resNames.RES_003.name, cost: 200, upgradeCostRatio: 1.3}
        ],
        effect: [
            { resource: resNames.RES_003.name, percRatio: 10},
            { resource: resNames.RES_003.name, percMaxValue: 15}
        ],
        isBought: false,
        isActive: false,
        requiredSlot: 3,
        unlocked: true,
        unlockedFrom: null
    }
]

export default roomObjectsList;