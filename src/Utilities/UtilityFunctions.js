
export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
    localStorage.setItem("gameActivities", JSON.stringify(state.gameActivities));
}

export function loadState(state) {
    let updatedstate
    let gameTime
    let gameResources
    let gameActivities

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

    updatedstate = {
        gameTime,
        gameResources,
        gameActivities
    }

    return updatedstate
}


