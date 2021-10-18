'use strict'
const GHOST = `<div></div>`;

var gGhosts = []
var gIntervalGhosts;
var gKilledGhosts = []

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function killGhost(nextLocation) {
    // for (var i = 0; i < gGhosts.length; i++) {
    //     if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
    var ghostToKillIdx = getGhostIdxByLoc(nextLocation)
    if (ghostToKillIdx === -1) return
    var ghostToKill = gGhosts[ghostToKillIdx]
    if (ghostToKill && ghostToKill.currCellContent === FOOD) {
        ghostToKill.currCellContent === EMPTY
        updateScore(1)
        gCountFood--
    }
    gGhosts.splice(ghostToKillIdx, 1)
    gKilledGhosts.push(ghostToKill);
    //     }
    // }
    console.log(gKilledGhosts);
}

function resetGhost() {
    for (var i = 0; i < gKilledGhosts.length; i++) {
        gGhosts.push(gKilledGhosts[i])
    }
    gKilledGhosts = []

}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        var str = `You Lose... 😢`
        updeteModal(str)
        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var color
    if (gPacman.isSuper) {
        color = 'blue'
    } else {
        color = ghost.color
    }
    return `<span class="ghost" style="background-color:${color}">${GHOST}</span>`
}

function getGhostIdxByLoc(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i &&
            gGhosts[i].location.j === nextLocation.j) return i
    }
    return -1
}