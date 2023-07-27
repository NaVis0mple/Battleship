import { gameBoard } from './gameBoard'
import { playerturn } from './player'
import { computerturn } from './player'
test('player turn ', () => {
  const computer = gameBoard()
  computer.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  playerturn([1, 1], computer)
  expect(computer.hitPos).toEqual([[1, 1]])
  playerturn([2, 2], computer)
  expect(computer.missPos).toEqual([[2, 2]])
  expect(playerturn([11, 2], computer)).toBe('novalid')
})

test('computerturn', () => {
  const player = gameBoard()
  const spy = jest.spyOn(player, 'isValidAttack')
  const spy2 = jest.spyOn(player, 'receiveAttack')
  computerturn(player)
  expect(spy).toHaveBeenCalled()
  expect(spy2).toHaveBeenCalled()
})
