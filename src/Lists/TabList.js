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

const tabList = [
    {   //ACTIVITIES
        name: constants.TAB_001, 
        unlocked: true,
        unlockedFrom: null    
    },
    {   //ROOM
        name: constants.TAB_002,
        unlocked: false,
        unlockedFrom: [
            { resource: constants.RES_007.name, neededValue: 1}
        ]
    }
]

export default tabList;