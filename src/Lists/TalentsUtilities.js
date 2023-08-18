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
    {   // Deep Sleep
        name: constants.TLN_001.name,
        description: constants.TLN_001.description,
        upgradeCost: [
            { resource: constants.RES_000.name, cost: 200, upgradeCostRatio: 0}
        ],
        effect: [
            { activity: constants.ACT_002.name, percRatio}
        ],
        effectActivity: null,
        isBought: false,
        unlocked: true,
        unlockedFrom: null
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