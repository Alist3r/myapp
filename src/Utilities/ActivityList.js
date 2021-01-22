const activityList = [
    {
        name: 'Punch the Wall', 
        description: 'Punches on a wall',
        effectDesc:  'Gain 1 Athleticism and 2 Psiche on every click',
        stage: null,
        upgradeCost: null,
        effectPerClick: [
            { resource: 'Athleticism', clickValue: 1 },
            { resource: 'Psiche', clickValue: 2}
        ],
        effectPerTick: null,
        defaultUnlocked: true,
        unlockedFrom: null    
    },
    {
        name: 'Meditate', 
        description: 'Enter a meditate state',
        effectDesc:  'Every level of meditate grants Psiche points',
        stage: 0,
        upgradeCost: [
            { resource: 'Psiche', cost: 50, upgradeCostRatio: 0.8 }
        ],
        effectPerClick: null,
        effectPerTick: [
            { resource: 'Psiche', perSecRatio: 0.2, percRatio: null, flatRatio: null },
            { resource: 'Psiche', perSecRatio: null, percRatio: 3, flatRatio: null },
            { resource: 'Psiche', perSecRatio: null, percRatio: null, flatRatio: 2 }
        ],
        defaultUnlocked: true,
        unlockedFrom: null    
    }

]

export default activityList;