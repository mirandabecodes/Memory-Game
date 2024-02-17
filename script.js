const squaresContainer = document.querySelector('#squares');
const numberOfSquares = 16;
let i = 0;
let square1, square2;
let clickCount = 0;
let score = 0;

document.querySelector('#score').style.visibilty = 'hidden';
const playAgainBtn = document.querySelector('button');
playAgainBtn.style.visibility = 'hidden';
playAgainBtn.addEventListener('click', playAgain);

let colors = [
    "#4287f5", 
    "#4287f5",
    "#2d60b3",
    "#2d60b3",
    "#042b69",
    "#042b69",
    "#8cb1ed",
    "#8cb1ed",
    "#8ce8ed",
    "#8ce8ed",
    "#05eefa",
    "#05eefa",
    "#059ba3",
    "#059ba3",
    "#45a8ad",
    "#45a8ad"
];

function selectColor() {
    //0-15
   const random = Math.floor(Math.random() * colors.length);
   const selected = colors[random];
   colors.splice(random, 1);
   return selected;
}

while (i < numberOfSquares) {
    const square = document.createElement('li');
    const color = selectColor();
    // square.style.background = color;
    square.setAttribute("data-color", color);
    squaresContainer.appendChild(square);
    i++;
}

const squares = document.querySelectorAll('li');
for (const square of squares) {
    square.addEventListener('click', squareClicked);
}

function squareClicked() {
    if(square1 === this) return;
    clickCount++;
    if(clickCount > 2) return;
    clickCount === 1 ? (square1 = this) : (square2 = this);
    if(clickCount === 1) {
        square1.style.background = square1.getAttribute('data-color')
    } else {
        square2.style.background = square2.getAttribute('data-color')
        checkMatch();
    }
}

function checkMatch() {
    let match = 
        square1.getAttribute('data-color') === square2.getAttribute('data-color');
        if(!match) {
            square1.classList.add('shake');
            square2.classList.add('shake');
            setTimeout (function () {
                noMatch();
            }, 500);
                
        } else {
            isMatch();
            checkGameEnded();
        }
}

function noMatch() {
    square1.style.background = '';
    square2.style.background = '';
    square1.classList.remove('shake');
    square2.classList.remove('shake');
    square1 = '';
    square2 = '';
    clickCount = 0;
}

function isMatch()  {
    score++;
    document.querySelector('#score').innerText = score;
    document.querySelector('#score').style.visibilty = 'visible';
    square1.classList.add('pop');
    square2.classList.add('pop');
    square1.style.border = 'none';
    square2.style.border = 'none';
    square1.removeEventListener('click', squareClicked);
    square2.removeEventListener('click', squareClicked);
    clickCount = 0;

}

function checkGameEnded() {
    const target = numberOfSquares / 2;
    const gameOver = score === target ? true : false;
    if(gameOver) {
        playAgainBtn.style.visibility = 'visible';
    }
}

function playAgain() {
    window.location.reload();
}
