import * as resNames from './StringsConst.js';

const talentsList = [
    {   // GOALS FOCUS
        name: resNames.TAL_GOALF, 
        description: 'Focus on your future life goals. Grants access to upgrades about yourselves',
        buyCost: [
            { resource: resNames.RES_KNO, cost: 150}
        ],
        effect: null,
        unlocked: true,
        unlockedFrom: null    
    }
]

export default talentsList;