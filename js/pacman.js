'use strict'
const PACMAN = `<div class="pacman">
<div class="pacman__eye"></div>
<div class="pacman__mouth"></div>
</div>`

var gPacmanDeg = 0
var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        } else {
            killGhost(nextLocation)
        }
    }
    else if (nextCell === FOOD) {
        updateScore(1)
        gCountFood--
        checkVictory()
    }

    else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        eatSuperFood()
    }
    else if (nextCell === CHERRY) {
        updateScore(10)

    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);

}
function eatSuperFood() {
    gPacman.isSuper = true
    setTimeout(function () {
        gPacman.isSuper = false
        resetGhost()
    }, 5000)

}

function getNextLocation(eventKeyboard) {

  

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}