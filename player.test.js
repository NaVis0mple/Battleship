import { domModule } from './src/DOM'
import { gameBoard } from './src/gameBoard'
import { game } from './src/gameFlow'
import { playerturn } from './src/player'
import { computerturn } from './src/player'
import { createComputerFiveShip } from './src/player'
jest.mock('./src/DOM', () => {
  return {
    domModule: () => {
      return {
        addEventListenOfCell: jest.fn()
      }
    }
  }
})

test('player turn ', async () => {
  const mockComputerboard = {
    isValidAttack: jest.fn().mockReturnValue(true),
    receiveAttack: jest.fn()
  }
  await playerturn(mockComputerboard)
  expect(mockComputerboard.isValidAttack).toHaveBeenCalled()
  expect(mockComputerboard.receiveAttack).toHaveBeenCalled()
})

test('computer turn', () => {
  const player = {
    isValidAttack: jest.fn().mockReturnValue(true),
    receiveAttack: jest.fn()
  }
  const spy = jest.spyOn(player, 'isValidAttack')
  const spy2 = jest.spyOn(player, 'receiveAttack')
  computerturn(player)
  expect(spy).toHaveBeenCalled()
  expect(spy2).toHaveBeenCalled()
})

// test('computer create 5 boat function ', () => {
//   const computerboard = {
//     isValidAttack: jest.fn().mockReturnValue(true),
//     receiveAttack: jest.fn(),
//     checkValidPlace: jest.fn().mockReturnValue(true),
//     placeShip: jest.fn(),
//     isFiveShip: jest.fn()
//   }

//   createComputerFiveShip(computerboard)
//   expect(computerboard.isFiveShip()).toBe(true)
// })
