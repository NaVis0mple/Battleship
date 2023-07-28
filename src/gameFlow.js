import { playerturn } from './player'
import { computerturn } from './player'
import { gameBoard } from './gameBoard'
import { createComputerBoat } from './player'
import { domMOdule } from './DOM'
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
const game = () => {
  //create board
  const playerboard = gameBoard()
  const computerboard = gameBoard()
  // check each player have five board
  //for now just preset the ship
  presetship(playerboard)
  createComputerBoat(computerboard)

  if (!playerboard.isFiveShip()) {
    return 'need 5 board'
  }
  //start

  playerturn()
}
console.log('jo')
