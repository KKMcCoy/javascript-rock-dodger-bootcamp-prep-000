/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

//////////////////////////////////

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);
  
  if (top > 360){
   
  const dodgerLeftEdge = positionToInteger(DODGER.style.left);

                      // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
  const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

  const rockLeftEdge = positionToInteger(rock.style.left);

                      // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
  const rockRightEdge = positionToInteger(rock.style.left) + 20;

  
  if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge){
    return true;
  } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge){
    return true;
  } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){ 
    return true;
}
}return;
}


function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  
  var top = 0;

  rock.style.top = top;
  
  GAME.appendChild(rock);

    function moveRock() {
    
    rock.style.top = `${top +=2}px`;
    
    if (checkCollision(rock)) {
    return endGame();
    } 
  
    if ( top < 400) {
    window.requestAnimationFrame(moveRock);
    } else {
    rock.remove();
    }
    }
  
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  
  for (i=0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  
window.removeEventListener('keydown', moveDodger);
  
return alert('YOU LOSE!');
  
}

// implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */


function moveDodger(e) {
  
  function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);
    if (left > 0) {
    DODGER.style.left = `${left - 4}px`;
    } 
  });
  
  }
  
  function moveDodgerRight() {
    window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);
    if (left < 360) {
    DODGER.style.left = `${left + 4}px`; 
    }
  });
  
  }
  
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  } else {
    e.preventDefault();
    e.stopPropagation();
  }
}

// implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   
   // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() { 
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}