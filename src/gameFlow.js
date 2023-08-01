import { createComputerFiveShip, playerturn } from './player'
import { computerturn } from './player'
import { gameBoard } from './gameBoard'
import { createComputerBoat } from './player'
import { domModule } from './DOM'
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
  const playerboard = gameBoard()
  const computerboard = gameBoard()
  domModule().createGameBoardUI('player')
  domModule().createGameBoardUI('computer')

  // check each player have five board
  //for now just preset the ship
  presetship(playerboard)
  domModule().showPlayerBoardBoatGreen(playerboard)
  createComputerFiveShip(computerboard)

  if (!playerboard.isFiveShip()) {
    return 'need 5 board'
  }
  //start
  while (!playerboard.isAllShipSunk() && !computerboard.isAllShipSunk()) {
    await playerturn(computerboard)
    computerturn(playerboard)
  }
  //print who win
}
game()
