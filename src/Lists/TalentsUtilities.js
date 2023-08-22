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

export const talentsList = [
    {   // Light Sleep
        name: constants.TLN_001.name,
        description: constants.TLN_001.description,
        group: constants.TGR_001,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 20, upgradeCostRatio: 0}
        ],
        effect: null, //[
            //{ resource: constants.RES_000.name, multiRatio: 2, flatRatio: 2}
        //],
        effectActivity: [
            { activity: constants.ACT_002.name, multiRatio: 1.5, flatRatio: 2},
            { activity: constants.ACT_003.name, multiRatio: 2, flatRatio: 2}
        ],
        isBought: false,
        unlocked: true,
        unlockedFrom: null
    },
    {   // Deep Sleep 
        name: constants.TLN_002.name,
        description: constants.TLN_002.description,
        group: constants.TGR_001,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 200, upgradeCostRatio: 0}
        ],
        effect: null,
        effectActivity: [
            { activity: constants.ACT_003.name, multiRatio: 2, flatRatio: 2}
        ],
        isBought: false,
        unlocked: false,
        unlockedFrom: [{ talent: constants.TLN_001.name}]
    },
    {   // REM Phase 
        name: constants.TLN_003.name,
        description: constants.TLN_003.description,
        group: constants.TGR_001,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 1500, upgradeCostRatio: 0}
        ],
        effect: null,
        effectActivity: [
            { activity: constants.ACT_003.name, multiRatio: 3, flatRatio: 3}
        ],
        isBought: false,
        unlocked: false,
        unlockedFrom: [{ talent: constants.TLN_002.name}]
    }
]



/*export const jobMansionsList = [
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
]*/