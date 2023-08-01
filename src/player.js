import { gameBoard } from './gameBoard'
import { domModule } from './DOM'
export async function playerturn (computerboard) {
  //click playerboard and attack it but is computerboard receive attack
  while (true) {
    let n = await domModule().addEventListenOfCell('computer')
    if (computerboard.isValidAttack(n)) {
      computerboard.receiveAttack(n, 'computer')
      break
    } else {
      console.log('Invalid,try again')
    }
  }
}

export const computerturn = playerboard => {
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
export const createComputerBoat = (board, shipLength, name) => {
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

export const createComputerFiveShip = board => {
  createComputerBoat(board, 5, 'carrier')
  createComputerBoat(board, 4, 'battleship')
  createComputerBoat(board, 3, 'destroyer')
  createComputerBoat(board, 3, 'submarine')
  createComputerBoat(board, 2, 'patrolBoat')
}
