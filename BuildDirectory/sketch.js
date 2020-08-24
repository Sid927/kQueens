function getNextPos(board, columnIndex, boardSize, boards) {
  let rBoards = [...boards]
  let rBoard = [...board]
  if (rBoard.length === 0) {
    rBoard.push([0, columnIndex]);
    rBoards.push(rBoard)
    return [rBoard, rBoards];
  } else {
    for (let i = columnIndex; i < boardSize; i++) {
      let conflict = false;
      for (let j in rBoard) {
        if (rBoard[j][1] === i) {
          conflict = true;
          break;
        } else if (Math.abs(i - rBoard[j][1]) === Math.abs(rBoard.length - rBoard[j][0])) {
          conflict = true;
          break;
        }
      }
      if (!conflict) {
        rBoard.push([rBoard.length, i])
        rBoards.push(rBoard)
        return [rBoard, rBoards]
      }
    }
    let nextColumnIndex = rBoard[rBoard.length - 1][1] + 1;
    rBoard.pop();
    return getNextPos(rBoard, nextColumnIndex, boardSize, rBoards);
  }
}

function nQueens(numQueens, boardSize) {
  let board = [];
  let boards = [];
  while (true) {
    if (board.length === boardSize) {
      return [board, boards];
    } else {
      [board, boards] = getNextPos(board, 0, boardSize, boards);
    }
  }
}

function drawBoard() {
  if (tickCount >= boards.length) {
    noLoop();
    return undefined;
  }
  let currentBoard = boards[tickCount];
  background(255);
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          fill(255);
        } else {
          fill(color(0, 55, 0));
        }
      } else {
        if (j % 2 === 0) {
          fill(color(0, 55, 0));
        } else {
          fill(255);
        }
      }
      rect((800 / boardSize * j), (800 / boardSize * i), (800 / boardSize), (800 / boardSize))
    }
  }
  let i = 0;
  while (i < currentBoard.length) {
    imgDict['img' + i].position((800 / boardSize * (currentBoard[i][0] + 0.125)), (800 / boardSize * (currentBoard[i][1] + 0.125)));
    i++
  }
  while (i < numQueens) {
    imgDict['img' + i].position(900, 900);
    i++
  }
  tickCount++
}

let numQueens = 8;
let boardSize = 8;
let frameRate = 20;
let boards = nQueens(numQueens, boardSize)[1];
let board = nQueens(numQueens, boardSize)[0];
let imgDict = {};
let tickCount = 0;

console.log(board)

function setup() {
  createCanvas(800, 800);
  for (let i in board) {
    imgDict['img' + i] = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1200px-Chess_qdt45.svg.png', 'Queen'); 
    imgDict['img' + i].size((75 * 8/numQueens), (75 * 8/numQueens));
  }
  setFrameRate(frameRate)
}

function draw() {
  drawBoard();
}