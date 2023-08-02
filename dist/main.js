/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domModule: () => (/* binding */ domModule)
/* harmony export */ });
const domModule = () => {
  function createGameBoardUI (who) {
    //10*10
    const Board = document.getElementById(who + 'Board')
    const tenbyten = (() => {
      for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 11; j++) {
          const div = document.createElement('div')
          div.textContent = 'O'
          div.id = `${who}${i},${j}`
          div.classList.add(who + 'cell')
          Board.appendChild(div)
        }
      }
    })()
  }
  function showPlayerBoardBoatGreen (playerboard) {
    const rowArray = playerboard.takenbyship
    for (const pos of rowArray) {
      const div = document.getElementById(`player${pos[0]},${pos[1]}`)
      div.classList.add('green')
    }
  }
  function changeBoard_Hit (who, pos) {
    //turn the cell background red
    const posx = pos[0]
    const posy = pos[1]
    const target = document.getElementById(`${who}${posx},${posy}`)
    target.classList.add('hit')
  }

  function changeBoard_Miss (who, pos) {
    //turn cell gray
    const posx = pos[0]
    const posy = pos[1]
    const target = document.getElementById(`${who}${posx},${posy}`)
    target.classList.add('miss')
  }

  function newGameButtonListener (game) {
    const button = document.getElementById('newGame')
    const playerboard = document.getElementById('playerBoard')
    const computerboard = document.getElementById('computerBoard')

    button.addEventListener('click', () => {
      playerboard.textContent = ''
      computerboard.textContent = ''
      game()
    })
  }
  function printResult (result) {
    alert(result)
  }
  function addEventListenOfCell (who) {
    return new Promise(resolve => {
      const cells = document.querySelectorAll(`.${who}cell`)
      cells.forEach(cell =>
        cell.addEventListener(
          'click',
          e => {
            const rowPos = e.target.id
            const pos = rowPos.replace(/[a-zA-Z]+/g, '')
            const split = pos.split(',')
            const target = [+split[0], +split[1]]
            resolve(target)
          },
          { once: true }
        )
      )
    })
  }
  return {
    createGameBoardUI,
    changeBoard_Hit,
    changeBoard_Miss,
    newGameButtonListener,
    addEventListenOfCell,
    showPlayerBoardBoatGreen,
    printResult
  }
}


/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameBoard: () => (/* binding */ gameBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");


const gameBoard = () => {
  // No.	Class of ship	Size
  // 1	Carrier	5
  // 2	Battleship	4
  // 3	Destroyer	3
  // 4	Submarine	3
  // 5	Patrol Boat	2
  let takenbyship = []
  let allShip = {
    carrier: null,
    battleship: null,
    destroyer: null,
    submarine: null,
    patrolBoat: null
  }
  const checkValidPlace = array => {
    for (const cell of array) {
      const arrx = cell[0]
      const arry = cell[1]
      if (arrx < 1 || arrx > 10 || arry < 1 || arry > 10) {
        return false
      }
      for (const cellt of takenbyship) {
        const tx = cellt[0]
        const ty = cellt[1]
        if (arrx === tx && arry === ty) {
          return false
        }
      }
    }
    return true
  }

  const placeShip = (array, name) => {
    //check taken or not
    if (!checkValidPlace(array)) {
      return false
    }
    takenbyship.push(...array)

    if (name === 'carrier' && !allShip.carrier && array.length === 5) {
      let carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(5)
      carrier.pos = array
      allShip.carrier = carrier
      return
    } else if (
      name === 'battleship' &&
      !allShip.battleship &&
      array.length === 4
    ) {
      let battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(4)
      battleship.pos = array
      allShip.battleship = battleship
    } else if (
      name === 'destroyer' &&
      !allShip.destroyer &&
      array.length === 3
    ) {
      let destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(3)
      destroyer.pos = array
      allShip.destroyer = destroyer
    } else if (
      name === 'submarine' &&
      !allShip.submarine &&
      array.length === 3
    ) {
      let submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(3)
      submarine.pos = array
      allShip.submarine = submarine
    } else if (
      name === 'patrolBoat' &&
      !allShip.patrolBoat &&
      array.length === 2
    ) {
      let patrolBoat = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(2)
      patrolBoat.pos = array
      allShip.patrolBoat = patrolBoat
    }
  }

  const isFiveShip = () => {
    return (
      allShip.carrier !== null &&
      allShip.battleship !== null &&
      allShip.destroyer !== null &&
      allShip.submarine !== null &&
      allShip.patrolBoat !== null
    )
  }

  let hitPos = []
  let missPos = []
  const isValidAttack = pos => {
    const posx = pos[0]
    const posy = pos[1]
    //in the borad
    if (posx >= 1 && posx <= 10 && posy >= 1 && posy <= 10) {
      //check if receive same pos attack
      if (hitPos && hitPos.length) {
        for (const hit of hitPos) {
          const [hitx, hity] = hit
          if (hitx === posx && hity === posy) {
            return false
          }
        }
      }
      if (missPos && missPos.length) {
        for (const miss of missPos) {
          const [missx, missy] = miss
          if (missx === posx && missy === posy) {
            return false
          }
        }
      }
      return true
    }
    return false
  }
  const receiveAttack = (pos, who) => {
    const posx = pos[0]
    const posy = pos[1]

    const carrier = allShip.carrier
    const battleship = allShip.battleship
    const destroyer = allShip.destroyer
    const submarine = allShip.submarine
    const patrolBoat = allShip.patrolBoat
    const boatarray = [carrier, battleship, destroyer, submarine, patrolBoat]
    for (const boat of boatarray) {
      if (boat && boat.pos && Array.isArray(boat.pos)) {
        for (const cell of boat.pos) {
          const arrx = cell[0]
          const arry = cell[1]
          if (arrx === posx && arry === posy) {
            // const inde x = boat.pos.indexOf(cell)
            // boat.pos.splice(index, 1)
            boat.hit()
            hitPos.push(pos)
            ;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.domModule)().changeBoard_Hit(who, pos)
            return
          }
        }
      }
    }
    missPos.push(pos)
    ;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.domModule)().changeBoard_Miss(who, pos)
  }
  const isAllShipSunk = () => {
    return (
      allShip.carrier.isSunk() &&
      allShip.battleship.isSunk() &&
      allShip.destroyer.isSunk() &&
      allShip.patrolBoat.isSunk() &&
      allShip.submarine.isSunk()
    )
  }
  return {
    placeShip,
    allShip,
    isFiveShip,
    isValidAttack,
    receiveAttack,
    hitPos,
    missPos,
    isAllShipSunk,
    takenbyship,
    checkValidPlace
  }
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computerturn: () => (/* binding */ computerturn),
/* harmony export */   createComputerBoat: () => (/* binding */ createComputerBoat),
/* harmony export */   createComputerFiveShip: () => (/* binding */ createComputerFiveShip),
/* harmony export */   playerturn: () => (/* binding */ playerturn)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");


async function playerturn (computerboard) {
  //click playerboard and attack it but is computerboard receive attack
  while (true) {
    let n = await (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.domModule)().addEventListenOfCell('computer')
    if (computerboard.isValidAttack(n)) {
      computerboard.receiveAttack(n, 'computer')
      break
    } else {
      console.log('Invalid,try again')
    }
  }
}

const computerturn = playerboard => {
  function getRandom () {
    return Math.floor(Math.random() * 10) + 1
  }
  let pos = [getRandom(), getRandom()]

  while (true) {
    if (playerboard.isValidAttack(pos)) {
      playerboard.receiveAttack(pos, 'player')
      break
    }
    pos = [getRandom(), getRandom()]
  }
}

//computer need five random board
const createComputerBoat = (board, shipLength, name) => {
  function getRandom () {
    return Math.floor(Math.random() * 10) + 1
  }
  function createArray (shipLength) {
    const isHorizon = Math.random() < 0.5
    const pos = []
    const startX = getRandom()
    const startY = getRandom()
    for (let i = 0; i < shipLength; i++) {
      const x = isHorizon ? startX + i : startX
      const y = isHorizon ? startY : startY + i
      pos.push([x, y])
    }
    return pos
  }
  let array = createArray(shipLength)
  while (true) {
    array = createArray(shipLength)
    if (board.checkValidPlace(array)) {
      break
    }
  }
  board.placeShip(array, name)
}

const createComputerFiveShip = board => {
  createComputerBoat(board, 5, 'carrier')
  createComputerBoat(board, 4, 'battleship')
  createComputerBoat(board, 3, 'destroyer')
  createComputerBoat(board, 3, 'submarine')
  createComputerBoat(board, 2, 'patrolBoat')
}


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createShip: () => (/* binding */ createShip)
/* harmony export */ });
// // not hide value
// export const createShip = length => {
//   return {
//     length,
//     hitCount: 0,
//     sunk: false,
//     hit: function () {
//       if (this.hitCount === length) {
//         return
//       }
//       this.hitCount += 1
//       if (this.hitCount === length) {
//         this.sunk = true
//         return
//       }
//     }
//   }
// }

// hide value
const createShip = length => {
  let hitCount = 0
  let sunk = false
  const hit = () => {
    if (hitCount === length) {
      return
    }
    hitCount += 1
    if (hitCount === length) {
      sunk = true
      return
    }
  }
  const isSunk = () => {
    return sunk
  }
  return {
    hit,
    isSunk
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/gameFlow.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");





const presetship = board => {
  board.placeShip(
    [
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5]
    ],
    'carrier'
  )
  board.placeShip(
    [
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4]
    ],
    'battleship'
  )
  board.placeShip(
    [
      [3, 8],
      [3, 7],
      [3, 6]
    ],
    'destroyer'
  )
  board.placeShip(
    [
      [2, 5],
      [2, 6],
      [2, 7]
    ],
    'submarine'
  )
  board.placeShip(
    [
      [1, 8],
      [1, 7]
    ],
    'patrolBoat'
  )
}
async function game () {
  //create board
  const playerboard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.gameBoard)()
  const computerboard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.gameBoard)()
  ;(0,_DOM__WEBPACK_IMPORTED_MODULE_2__.domModule)().createGameBoardUI('player')
  ;(0,_DOM__WEBPACK_IMPORTED_MODULE_2__.domModule)().createGameBoardUI('computer')

  // check each player have five board
  //for now just preset the ship
  presetship(playerboard)
  ;(0,_DOM__WEBPACK_IMPORTED_MODULE_2__.domModule)().showPlayerBoardBoatGreen(playerboard)
  ;(0,_player__WEBPACK_IMPORTED_MODULE_0__.createComputerFiveShip)(computerboard)

  if (!playerboard.isFiveShip()) {
    return 'need 5 board'
  }
  //start
  while (!playerboard.isAllShipSunk() && !computerboard.isAllShipSunk()) {
    await (0,_player__WEBPACK_IMPORTED_MODULE_0__.playerturn)(computerboard)
    ;(0,_player__WEBPACK_IMPORTED_MODULE_0__.computerturn)(playerboard)
  }
  //print who win
  if (playerboard.isAllShipSunk()) {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.domModule)().printResult('you lose')
  } else {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.domModule)().printResult('you win')
  }
}
//when use test cant run game() at same time
(0,_DOM__WEBPACK_IMPORTED_MODULE_2__.domModule)().newGameButtonListener(game)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0JBQXNCLHFEQUFTO0FBQy9CLHdCQUF3QixxREFBUztBQUNqQyxFQUFFLGdEQUFTO0FBQ1gsRUFBRSxnREFBUzs7QUFFWDtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdEQUFTO0FBQ1gsRUFBRSxnRUFBc0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1EQUFVO0FBQ3BCLElBQUksc0RBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBUztBQUNiLElBQUk7QUFDSixJQUFJLCtDQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsK0NBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUZsb3cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRvbU1vZHVsZSA9ICgpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkVUkgKHdobykge1xuICAgIC8vMTAqMTBcbiAgICBjb25zdCBCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHdobyArICdCb2FyZCcpXG4gICAgY29uc3QgdGVuYnl0ZW4gPSAoKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gJ08nXG4gICAgICAgICAgZGl2LmlkID0gYCR7d2hvfSR7aX0sJHtqfWBcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCh3aG8gKyAnY2VsbCcpXG4gICAgICAgICAgQm9hcmQuYXBwZW5kQ2hpbGQoZGl2KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKVxuICB9XG4gIGZ1bmN0aW9uIHNob3dQbGF5ZXJCb2FyZEJvYXRHcmVlbiAocGxheWVyYm9hcmQpIHtcbiAgICBjb25zdCByb3dBcnJheSA9IHBsYXllcmJvYXJkLnRha2VuYnlzaGlwXG4gICAgZm9yIChjb25zdCBwb3Mgb2Ygcm93QXJyYXkpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwbGF5ZXIke3Bvc1swXX0sJHtwb3NbMV19YClcbiAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdncmVlbicpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNoYW5nZUJvYXJkX0hpdCAod2hvLCBwb3MpIHtcbiAgICAvL3R1cm4gdGhlIGNlbGwgYmFja2dyb3VuZCByZWRcbiAgICBjb25zdCBwb3N4ID0gcG9zWzBdXG4gICAgY29uc3QgcG9zeSA9IHBvc1sxXVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3dob30ke3Bvc3h9LCR7cG9zeX1gKVxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlQm9hcmRfTWlzcyAod2hvLCBwb3MpIHtcbiAgICAvL3R1cm4gY2VsbCBncmF5XG4gICAgY29uc3QgcG9zeCA9IHBvc1swXVxuICAgIGNvbnN0IHBvc3kgPSBwb3NbMV1cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt3aG99JHtwb3N4fSwke3Bvc3l9YClcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gIH1cblxuICBmdW5jdGlvbiBuZXdHYW1lQnV0dG9uTGlzdGVuZXIgKGdhbWUpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3R2FtZScpXG4gICAgY29uc3QgcGxheWVyYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyQm9hcmQnKVxuICAgIGNvbnN0IGNvbXB1dGVyYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXJCb2FyZCcpXG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBwbGF5ZXJib2FyZC50ZXh0Q29udGVudCA9ICcnXG4gICAgICBjb21wdXRlcmJvYXJkLnRleHRDb250ZW50ID0gJydcbiAgICAgIGdhbWUoKVxuICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gcHJpbnRSZXN1bHQgKHJlc3VsdCkge1xuICAgIGFsZXJ0KHJlc3VsdClcbiAgfVxuICBmdW5jdGlvbiBhZGRFdmVudExpc3Rlbk9mQ2VsbCAod2hvKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt3aG99Y2VsbGApXG4gICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3dQb3MgPSBlLnRhcmdldC5pZFxuICAgICAgICAgICAgY29uc3QgcG9zID0gcm93UG9zLnJlcGxhY2UoL1thLXpBLVpdKy9nLCAnJylcbiAgICAgICAgICAgIGNvbnN0IHNwbGl0ID0gcG9zLnNwbGl0KCcsJylcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IFsrc3BsaXRbMF0sICtzcGxpdFsxXV1cbiAgICAgICAgICAgIHJlc29sdmUodGFyZ2V0KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVHYW1lQm9hcmRVSSxcbiAgICBjaGFuZ2VCb2FyZF9IaXQsXG4gICAgY2hhbmdlQm9hcmRfTWlzcyxcbiAgICBuZXdHYW1lQnV0dG9uTGlzdGVuZXIsXG4gICAgYWRkRXZlbnRMaXN0ZW5PZkNlbGwsXG4gICAgc2hvd1BsYXllckJvYXJkQm9hdEdyZWVuLFxuICAgIHByaW50UmVzdWx0XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tICcuL3NoaXAnXG5pbXBvcnQgeyBkb21Nb2R1bGUgfSBmcm9tICcuL0RPTSdcbmV4cG9ydCBjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4gIC8vIE5vLlx0Q2xhc3Mgb2Ygc2hpcFx0U2l6ZVxuICAvLyAxXHRDYXJyaWVyXHQ1XG4gIC8vIDJcdEJhdHRsZXNoaXBcdDRcbiAgLy8gM1x0RGVzdHJveWVyXHQzXG4gIC8vIDRcdFN1Ym1hcmluZVx0M1xuICAvLyA1XHRQYXRyb2wgQm9hdFx0MlxuICBsZXQgdGFrZW5ieXNoaXAgPSBbXVxuICBsZXQgYWxsU2hpcCA9IHtcbiAgICBjYXJyaWVyOiBudWxsLFxuICAgIGJhdHRsZXNoaXA6IG51bGwsXG4gICAgZGVzdHJveWVyOiBudWxsLFxuICAgIHN1Ym1hcmluZTogbnVsbCxcbiAgICBwYXRyb2xCb2F0OiBudWxsXG4gIH1cbiAgY29uc3QgY2hlY2tWYWxpZFBsYWNlID0gYXJyYXkgPT4ge1xuICAgIGZvciAoY29uc3QgY2VsbCBvZiBhcnJheSkge1xuICAgICAgY29uc3QgYXJyeCA9IGNlbGxbMF1cbiAgICAgIGNvbnN0IGFycnkgPSBjZWxsWzFdXG4gICAgICBpZiAoYXJyeCA8IDEgfHwgYXJyeCA+IDEwIHx8IGFycnkgPCAxIHx8IGFycnkgPiAxMCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgY2VsbHQgb2YgdGFrZW5ieXNoaXApIHtcbiAgICAgICAgY29uc3QgdHggPSBjZWxsdFswXVxuICAgICAgICBjb25zdCB0eSA9IGNlbGx0WzFdXG4gICAgICAgIGlmIChhcnJ4ID09PSB0eCAmJiBhcnJ5ID09PSB0eSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoYXJyYXksIG5hbWUpID0+IHtcbiAgICAvL2NoZWNrIHRha2VuIG9yIG5vdFxuICAgIGlmICghY2hlY2tWYWxpZFBsYWNlKGFycmF5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHRha2VuYnlzaGlwLnB1c2goLi4uYXJyYXkpXG5cbiAgICBpZiAobmFtZSA9PT0gJ2NhcnJpZXInICYmICFhbGxTaGlwLmNhcnJpZXIgJiYgYXJyYXkubGVuZ3RoID09PSA1KSB7XG4gICAgICBsZXQgY2FycmllciA9IGNyZWF0ZVNoaXAoNSlcbiAgICAgIGNhcnJpZXIucG9zID0gYXJyYXlcbiAgICAgIGFsbFNoaXAuY2FycmllciA9IGNhcnJpZXJcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBuYW1lID09PSAnYmF0dGxlc2hpcCcgJiZcbiAgICAgICFhbGxTaGlwLmJhdHRsZXNoaXAgJiZcbiAgICAgIGFycmF5Lmxlbmd0aCA9PT0gNFxuICAgICkge1xuICAgICAgbGV0IGJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQpXG4gICAgICBiYXR0bGVzaGlwLnBvcyA9IGFycmF5XG4gICAgICBhbGxTaGlwLmJhdHRsZXNoaXAgPSBiYXR0bGVzaGlwXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG5hbWUgPT09ICdkZXN0cm95ZXInICYmXG4gICAgICAhYWxsU2hpcC5kZXN0cm95ZXIgJiZcbiAgICAgIGFycmF5Lmxlbmd0aCA9PT0gM1xuICAgICkge1xuICAgICAgbGV0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMylcbiAgICAgIGRlc3Ryb3llci5wb3MgPSBhcnJheVxuICAgICAgYWxsU2hpcC5kZXN0cm95ZXIgPSBkZXN0cm95ZXJcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbmFtZSA9PT0gJ3N1Ym1hcmluZScgJiZcbiAgICAgICFhbGxTaGlwLnN1Ym1hcmluZSAmJlxuICAgICAgYXJyYXkubGVuZ3RoID09PSAzXG4gICAgKSB7XG4gICAgICBsZXQgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgzKVxuICAgICAgc3VibWFyaW5lLnBvcyA9IGFycmF5XG4gICAgICBhbGxTaGlwLnN1Ym1hcmluZSA9IHN1Ym1hcmluZVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBuYW1lID09PSAncGF0cm9sQm9hdCcgJiZcbiAgICAgICFhbGxTaGlwLnBhdHJvbEJvYXQgJiZcbiAgICAgIGFycmF5Lmxlbmd0aCA9PT0gMlxuICAgICkge1xuICAgICAgbGV0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKDIpXG4gICAgICBwYXRyb2xCb2F0LnBvcyA9IGFycmF5XG4gICAgICBhbGxTaGlwLnBhdHJvbEJvYXQgPSBwYXRyb2xCb2F0XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNGaXZlU2hpcCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgYWxsU2hpcC5jYXJyaWVyICE9PSBudWxsICYmXG4gICAgICBhbGxTaGlwLmJhdHRsZXNoaXAgIT09IG51bGwgJiZcbiAgICAgIGFsbFNoaXAuZGVzdHJveWVyICE9PSBudWxsICYmXG4gICAgICBhbGxTaGlwLnN1Ym1hcmluZSAhPT0gbnVsbCAmJlxuICAgICAgYWxsU2hpcC5wYXRyb2xCb2F0ICE9PSBudWxsXG4gICAgKVxuICB9XG5cbiAgbGV0IGhpdFBvcyA9IFtdXG4gIGxldCBtaXNzUG9zID0gW11cbiAgY29uc3QgaXNWYWxpZEF0dGFjayA9IHBvcyA9PiB7XG4gICAgY29uc3QgcG9zeCA9IHBvc1swXVxuICAgIGNvbnN0IHBvc3kgPSBwb3NbMV1cbiAgICAvL2luIHRoZSBib3JhZFxuICAgIGlmIChwb3N4ID49IDEgJiYgcG9zeCA8PSAxMCAmJiBwb3N5ID49IDEgJiYgcG9zeSA8PSAxMCkge1xuICAgICAgLy9jaGVjayBpZiByZWNlaXZlIHNhbWUgcG9zIGF0dGFja1xuICAgICAgaWYgKGhpdFBvcyAmJiBoaXRQb3MubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoY29uc3QgaGl0IG9mIGhpdFBvcykge1xuICAgICAgICAgIGNvbnN0IFtoaXR4LCBoaXR5XSA9IGhpdFxuICAgICAgICAgIGlmIChoaXR4ID09PSBwb3N4ICYmIGhpdHkgPT09IHBvc3kpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1pc3NQb3MgJiYgbWlzc1Bvcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBtaXNzIG9mIG1pc3NQb3MpIHtcbiAgICAgICAgICBjb25zdCBbbWlzc3gsIG1pc3N5XSA9IG1pc3NcbiAgICAgICAgICBpZiAobWlzc3ggPT09IHBvc3ggJiYgbWlzc3kgPT09IHBvc3kpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChwb3MsIHdobykgPT4ge1xuICAgIGNvbnN0IHBvc3ggPSBwb3NbMF1cbiAgICBjb25zdCBwb3N5ID0gcG9zWzFdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gYWxsU2hpcC5jYXJyaWVyXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IGFsbFNoaXAuYmF0dGxlc2hpcFxuICAgIGNvbnN0IGRlc3Ryb3llciA9IGFsbFNoaXAuZGVzdHJveWVyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gYWxsU2hpcC5zdWJtYXJpbmVcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gYWxsU2hpcC5wYXRyb2xCb2F0XG4gICAgY29uc3QgYm9hdGFycmF5ID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0XVxuICAgIGZvciAoY29uc3QgYm9hdCBvZiBib2F0YXJyYXkpIHtcbiAgICAgIGlmIChib2F0ICYmIGJvYXQucG9zICYmIEFycmF5LmlzQXJyYXkoYm9hdC5wb3MpKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2VsbCBvZiBib2F0LnBvcykge1xuICAgICAgICAgIGNvbnN0IGFycnggPSBjZWxsWzBdXG4gICAgICAgICAgY29uc3QgYXJyeSA9IGNlbGxbMV1cbiAgICAgICAgICBpZiAoYXJyeCA9PT0gcG9zeCAmJiBhcnJ5ID09PSBwb3N5KSB7XG4gICAgICAgICAgICAvLyBjb25zdCBpbmRlIHggPSBib2F0LnBvcy5pbmRleE9mKGNlbGwpXG4gICAgICAgICAgICAvLyBib2F0LnBvcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICBib2F0LmhpdCgpXG4gICAgICAgICAgICBoaXRQb3MucHVzaChwb3MpXG4gICAgICAgICAgICBkb21Nb2R1bGUoKS5jaGFuZ2VCb2FyZF9IaXQod2hvLCBwb3MpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWlzc1Bvcy5wdXNoKHBvcylcbiAgICBkb21Nb2R1bGUoKS5jaGFuZ2VCb2FyZF9NaXNzKHdobywgcG9zKVxuICB9XG4gIGNvbnN0IGlzQWxsU2hpcFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGFsbFNoaXAuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgYWxsU2hpcC5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICBhbGxTaGlwLmRlc3Ryb3llci5pc1N1bmsoKSAmJlxuICAgICAgYWxsU2hpcC5wYXRyb2xCb2F0LmlzU3VuaygpICYmXG4gICAgICBhbGxTaGlwLnN1Ym1hcmluZS5pc1N1bmsoKVxuICAgIClcbiAgfVxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBhbGxTaGlwLFxuICAgIGlzRml2ZVNoaXAsXG4gICAgaXNWYWxpZEF0dGFjayxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGhpdFBvcyxcbiAgICBtaXNzUG9zLFxuICAgIGlzQWxsU2hpcFN1bmssXG4gICAgdGFrZW5ieXNoaXAsXG4gICAgY2hlY2tWYWxpZFBsYWNlXG4gIH1cbn1cbiIsImltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gJy4vZ2FtZUJvYXJkJ1xuaW1wb3J0IHsgZG9tTW9kdWxlIH0gZnJvbSAnLi9ET00nXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGxheWVydHVybiAoY29tcHV0ZXJib2FyZCkge1xuICAvL2NsaWNrIHBsYXllcmJvYXJkIGFuZCBhdHRhY2sgaXQgYnV0IGlzIGNvbXB1dGVyYm9hcmQgcmVjZWl2ZSBhdHRhY2tcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBsZXQgbiA9IGF3YWl0IGRvbU1vZHVsZSgpLmFkZEV2ZW50TGlzdGVuT2ZDZWxsKCdjb21wdXRlcicpXG4gICAgaWYgKGNvbXB1dGVyYm9hcmQuaXNWYWxpZEF0dGFjayhuKSkge1xuICAgICAgY29tcHV0ZXJib2FyZC5yZWNlaXZlQXR0YWNrKG4sICdjb21wdXRlcicpXG4gICAgICBicmVha1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCx0cnkgYWdhaW4nKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJ0dXJuID0gcGxheWVyYm9hcmQgPT4ge1xuICBmdW5jdGlvbiBnZXRSYW5kb20gKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gIH1cbiAgbGV0IHBvcyA9IFtnZXRSYW5kb20oKSwgZ2V0UmFuZG9tKCldXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAocGxheWVyYm9hcmQuaXNWYWxpZEF0dGFjayhwb3MpKSB7XG4gICAgICBwbGF5ZXJib2FyZC5yZWNlaXZlQXR0YWNrKHBvcywgJ3BsYXllcicpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBwb3MgPSBbZ2V0UmFuZG9tKCksIGdldFJhbmRvbSgpXVxuICB9XG59XG5cbi8vY29tcHV0ZXIgbmVlZCBmaXZlIHJhbmRvbSBib2FyZFxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXB1dGVyQm9hdCA9IChib2FyZCwgc2hpcExlbmd0aCwgbmFtZSkgPT4ge1xuICBmdW5jdGlvbiBnZXRSYW5kb20gKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXkgKHNoaXBMZW5ndGgpIHtcbiAgICBjb25zdCBpc0hvcml6b24gPSBNYXRoLnJhbmRvbSgpIDwgMC41XG4gICAgY29uc3QgcG9zID0gW11cbiAgICBjb25zdCBzdGFydFggPSBnZXRSYW5kb20oKVxuICAgIGNvbnN0IHN0YXJ0WSA9IGdldFJhbmRvbSgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBpc0hvcml6b24gPyBzdGFydFggKyBpIDogc3RhcnRYXG4gICAgICBjb25zdCB5ID0gaXNIb3Jpem9uID8gc3RhcnRZIDogc3RhcnRZICsgaVxuICAgICAgcG9zLnB1c2goW3gsIHldKVxuICAgIH1cbiAgICByZXR1cm4gcG9zXG4gIH1cbiAgbGV0IGFycmF5ID0gY3JlYXRlQXJyYXkoc2hpcExlbmd0aClcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBhcnJheSA9IGNyZWF0ZUFycmF5KHNoaXBMZW5ndGgpXG4gICAgaWYgKGJvYXJkLmNoZWNrVmFsaWRQbGFjZShhcnJheSkpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGJvYXJkLnBsYWNlU2hpcChhcnJheSwgbmFtZSlcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXB1dGVyRml2ZVNoaXAgPSBib2FyZCA9PiB7XG4gIGNyZWF0ZUNvbXB1dGVyQm9hdChib2FyZCwgNSwgJ2NhcnJpZXInKVxuICBjcmVhdGVDb21wdXRlckJvYXQoYm9hcmQsIDQsICdiYXR0bGVzaGlwJylcbiAgY3JlYXRlQ29tcHV0ZXJCb2F0KGJvYXJkLCAzLCAnZGVzdHJveWVyJylcbiAgY3JlYXRlQ29tcHV0ZXJCb2F0KGJvYXJkLCAzLCAnc3VibWFyaW5lJylcbiAgY3JlYXRlQ29tcHV0ZXJCb2F0KGJvYXJkLCAyLCAncGF0cm9sQm9hdCcpXG59XG4iLCIvLyAvLyBub3QgaGlkZSB2YWx1ZVxuLy8gZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSBsZW5ndGggPT4ge1xuLy8gICByZXR1cm4ge1xuLy8gICAgIGxlbmd0aCxcbi8vICAgICBoaXRDb3VudDogMCxcbi8vICAgICBzdW5rOiBmYWxzZSxcbi8vICAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICh0aGlzLmhpdENvdW50ID09PSBsZW5ndGgpIHtcbi8vICAgICAgICAgcmV0dXJuXG4vLyAgICAgICB9XG4vLyAgICAgICB0aGlzLmhpdENvdW50ICs9IDFcbi8vICAgICAgIGlmICh0aGlzLmhpdENvdW50ID09PSBsZW5ndGgpIHtcbi8vICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZVxuLy8gICAgICAgICByZXR1cm5cbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gaGlkZSB2YWx1ZVxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSBsZW5ndGggPT4ge1xuICBsZXQgaGl0Q291bnQgPSAwXG4gIGxldCBzdW5rID0gZmFsc2VcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaGl0Q291bnQgKz0gMVxuICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICBzdW5rID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gc3Vua1xuICB9XG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3Vua1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUNvbXB1dGVyRml2ZVNoaXAsIHBsYXllcnR1cm4gfSBmcm9tICcuL3BsYXllcidcbmltcG9ydCB7IGNvbXB1dGVydHVybiB9IGZyb20gJy4vcGxheWVyJ1xuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSAnLi9nYW1lQm9hcmQnXG5pbXBvcnQgeyBjcmVhdGVDb21wdXRlckJvYXQgfSBmcm9tICcuL3BsYXllcidcbmltcG9ydCB7IGRvbU1vZHVsZSB9IGZyb20gJy4vRE9NJ1xuY29uc3QgcHJlc2V0c2hpcCA9IGJvYXJkID0+IHtcbiAgYm9hcmQucGxhY2VTaGlwKFxuICAgIFtcbiAgICAgIFs5LCAxXSxcbiAgICAgIFs5LCAyXSxcbiAgICAgIFs5LCAzXSxcbiAgICAgIFs5LCA0XSxcbiAgICAgIFs5LCA1XVxuICAgIF0sXG4gICAgJ2NhcnJpZXInXG4gIClcbiAgYm9hcmQucGxhY2VTaGlwKFxuICAgIFtcbiAgICAgIFs2LCAxXSxcbiAgICAgIFs2LCAyXSxcbiAgICAgIFs2LCAzXSxcbiAgICAgIFs2LCA0XVxuICAgIF0sXG4gICAgJ2JhdHRsZXNoaXAnXG4gIClcbiAgYm9hcmQucGxhY2VTaGlwKFxuICAgIFtcbiAgICAgIFszLCA4XSxcbiAgICAgIFszLCA3XSxcbiAgICAgIFszLCA2XVxuICAgIF0sXG4gICAgJ2Rlc3Ryb3llcidcbiAgKVxuICBib2FyZC5wbGFjZVNoaXAoXG4gICAgW1xuICAgICAgWzIsIDVdLFxuICAgICAgWzIsIDZdLFxuICAgICAgWzIsIDddXG4gICAgXSxcbiAgICAnc3VibWFyaW5lJ1xuICApXG4gIGJvYXJkLnBsYWNlU2hpcChcbiAgICBbXG4gICAgICBbMSwgOF0sXG4gICAgICBbMSwgN11cbiAgICBdLFxuICAgICdwYXRyb2xCb2F0J1xuICApXG59XG5hc3luYyBmdW5jdGlvbiBnYW1lICgpIHtcbiAgLy9jcmVhdGUgYm9hcmRcbiAgY29uc3QgcGxheWVyYm9hcmQgPSBnYW1lQm9hcmQoKVxuICBjb25zdCBjb21wdXRlcmJvYXJkID0gZ2FtZUJvYXJkKClcbiAgZG9tTW9kdWxlKCkuY3JlYXRlR2FtZUJvYXJkVUkoJ3BsYXllcicpXG4gIGRvbU1vZHVsZSgpLmNyZWF0ZUdhbWVCb2FyZFVJKCdjb21wdXRlcicpXG5cbiAgLy8gY2hlY2sgZWFjaCBwbGF5ZXIgaGF2ZSBmaXZlIGJvYXJkXG4gIC8vZm9yIG5vdyBqdXN0IHByZXNldCB0aGUgc2hpcFxuICBwcmVzZXRzaGlwKHBsYXllcmJvYXJkKVxuICBkb21Nb2R1bGUoKS5zaG93UGxheWVyQm9hcmRCb2F0R3JlZW4ocGxheWVyYm9hcmQpXG4gIGNyZWF0ZUNvbXB1dGVyRml2ZVNoaXAoY29tcHV0ZXJib2FyZClcblxuICBpZiAoIXBsYXllcmJvYXJkLmlzRml2ZVNoaXAoKSkge1xuICAgIHJldHVybiAnbmVlZCA1IGJvYXJkJ1xuICB9XG4gIC8vc3RhcnRcbiAgd2hpbGUgKCFwbGF5ZXJib2FyZC5pc0FsbFNoaXBTdW5rKCkgJiYgIWNvbXB1dGVyYm9hcmQuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgYXdhaXQgcGxheWVydHVybihjb21wdXRlcmJvYXJkKVxuICAgIGNvbXB1dGVydHVybihwbGF5ZXJib2FyZClcbiAgfVxuICAvL3ByaW50IHdobyB3aW5cbiAgaWYgKHBsYXllcmJvYXJkLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgIGRvbU1vZHVsZSgpLnByaW50UmVzdWx0KCd5b3UgbG9zZScpXG4gIH0gZWxzZSB7XG4gICAgZG9tTW9kdWxlKCkucHJpbnRSZXN1bHQoJ3lvdSB3aW4nKVxuICB9XG59XG4vL3doZW4gdXNlIHRlc3QgY2FudCBydW4gZ2FtZSgpIGF0IHNhbWUgdGltZVxuZG9tTW9kdWxlKCkubmV3R2FtZUJ1dHRvbkxpc3RlbmVyKGdhbWUpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=