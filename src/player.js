import { gameBoard } from './gameBoard'
import { domModule } from './DOM'
export async function playerturn (computerboard) {
  //click playerboard and attack it but is computerboard receiveattack
  while (true) {
    const n = await domModule().addEventListenOfCell('player')
    if (computerboard.isValidAttack(n)) {
      computerboard.receiveAttack(n)
      console.log(computerboard.hitPos)
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

  const pos = [getRandom(), getRandom()]
  if (playerboard.isValidAttack(pos)) {
    playerboard.receiveAttack(pos)
  }
}

//computer need five random board
export const createComputerBoat = board => {
  //attempt to create random boat
  //   function getRandom () {
  //     return Math.floor(Math.random() * 10) + 1
  //   }
  //   function createArray (arrayLength) {
  //     const direction = Math.random() < 0.5
  //     if(direction){

  //     }
  //   }

  board.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  board.placeShip(
    [
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4]
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
      [7, 5],
      [7, 6],
      [7, 7]
    ],
    'submarine'
  )
  board.placeShip(
    [
      [9, 8],
      [9, 7]
    ],
    'patrolBoat'
  )
}
