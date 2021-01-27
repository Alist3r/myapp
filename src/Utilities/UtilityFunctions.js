
export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
    localStorage.setItem("gameActivities", JSON.stringify(state.gameActivities));
    localStorage.setItem("activeTab", JSON.stringify(state.activeTab));
}

export function loadState(state) {
    let updatedstate
    let gameTime
    let gameResources
    let gameActivities
    let activeTab

    if(parseInt(localStorage.getItem('gameTime'))) {
        gameTime = parseInt(localStorage.getItem('gameTime'))
    }
    else {
        gameTime = state.gameTime
    }
         
    if(JSON.parse(localStorage.getItem("gameResources"))) {
        gameResources = JSON.parse(localStorage.getItem("gameResources"))
    }
    else {
        gameResources = state.gameResources
    }

    if(JSON.parse(localStorage.getItem("gameActivities"))) {
        gameActivities = JSON.parse(localStorage.getItem("gameActivities"))
    }
    else {
        gameActivities = state.gameActivities
    }

    if(parseInt(localStorage.getItem('activeTab'))) {
        activeTab = parseInt(localStorage.getItem('activeTab'))
    }
    else {
        activeTab = state.activeTab
    }

    updatedstate = {
        gameTime,
        gameResources,
        gameActivities,
        activeTab
    }

    return updatedstate
}

export function roundNumber(number) {
    return (Math.round(number * 100) / 100).toFixed(2); 
}



