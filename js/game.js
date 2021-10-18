'use strict'
const WALL = ` <div class="border">
<div class="in-border"></div>
</div>
`
const FOOD = `<span class="food"></span>`
const EMPTY = ' ';
const SUPER_FOOD = `<span class="super-food"></span>`
const CHERRY = '🍒'



var gBoard;
var gCountFood = 0;
var gIntervalCherry;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(renderCerry,15000)
    

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2) || 
                (i === 2 && j > 4 && j < SIZE - 2) ||
                (i === 4 && j === 6))  {
                board[i][j] = WALL;
            }
            if (board[i][j] === FOOD){
                gCountFood++
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    gCountFood--
    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function checkVictory(){

    if (gCountFood === 0) {
        var str = `🎉You Win! 🎉`
        updeteModal(str)
        gameOver();
        return;
    }

}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    openModal()
}

function restartGame() {
    closeModal()
    gGame.score = 0
    init()
    document.querySelector('h2 span').innerText = gGame.score
}

function renderCerry() {

	var emptysCells = getEmptyCells()
    if (!emptysCells.length) return
	var currCell = drawNum(emptysCells)

	gBoard[currCell.i][currCell.j] = CHERRY;
	renderCell(currCell, CHERRY);
}

function updeteModal(str) {
    var elH2 = document.querySelector('.modal h2 span')
    elH2.innerText = str
}

function openModal() {

    var elDiv = document.querySelector('.modal');
    elDiv.style.display = 'inline-block';
}

function closeModal() {

    var elDiv = document.querySelector('.modal');
    elDiv.style.display = 'none';
    // Todo: hide the modal
}

function countFoodOnBoard() {
    var foodCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (cell === FOOD) {
                foodCells.push(cell)
            }
        }
    }
    return foodCells
}

function getEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (cell === EMPTY) {
                var cellCoord = {i,j}
                emptyCells.push(cellCoord)
            }
        }
    }
    return emptyCells
}



