
export function saveState(state) {
    localStorage.setItem('gameTime', state.gameTime);
    localStorage.setItem("gameResources", JSON.stringify(state.gameResources));
}

export function loadState() {
    let state
    let gameTime = parseInt(localStorage.getItem('gameTime'));
    let gameResources = JSON.parse(localStorage.getItem("gameResources") || "[]");

    state = {
        gameTime,
        gameResources
    }

    return state
}


