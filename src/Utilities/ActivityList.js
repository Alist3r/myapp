const activityList = [
    {
        name: 'Punch the Wall', 
        description: 'Punches on a wall',
        effectDesc:  'Gain 1 Athleticism and 2 Psiche on every click',
        stage: 0,
        upgradeCost: null,
        effectPerClick: [
            { resource: 'Athleticism', clickValue: 1 },
            { resource: 'Psiche', clickValue: 2}
        ],
        effectPerTick: null,
        defaultUnlocked: true,
        unlockedFrom: null    
    }
]

export default activityList;