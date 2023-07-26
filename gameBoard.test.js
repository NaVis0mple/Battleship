import { gameBoard } from './gameBoard'
import { createShip } from './ship'
test.todo('10*10grid')

test('placeship function', () => {
  const gb = gameBoard()
  gb.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  expect(gb.allShip.carrier.pos).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5]
  ])
})
test('if pos is taken by other ship', () => {
  const gb = gameBoard()
  const carrier = gb.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  const battleship = gb.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4]
    ],
    'battleship'
  )
  expect(battleship).toBe('duplicate place')
})
test('receiveAttack function', () => {
  const gb = gameBoard()
  gb.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  gb.receiveAttack([1, 1])
  expect(gb.allShip.carrier.pos).toEqual([
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5]
  ])
})

test('receiveAttack ,hit or miss', () => {
  const gb = gameBoard()
  gb.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  gb.receiveAttack([1, 1])
  gb.receiveAttack([2, 2])
  gb.receiveAttack([3, 3])

  expect(gb.hitPos).toEqual([[1, 1]])
  expect(gb.missPos).toEqual([
    [2, 2],
    [3, 3]
  ])
})
/////
test('isValidAttack function', () => {
  const gb = gameBoard()
  gb.placeShip(
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    'carrier'
  )
  expect(gb.isValidAttack([20, 10])).toBe(false)
  expect(gb.isValidAttack([3, 3])).toBe(true)

  gb.receiveAttack([3, 3])
  expect(gb.missPos).toEqual([[3, 3]])

  const t = gb.isValidAttack([3, 3])
  expect(t).toBe('same pos')
})

test('hit and issunk function in ship.js', () => {
  const gb = gameBoard()
  gb.placeShip(
    [
      [1, 1],
      [2, 1]
    ],
    'patrolBoat'
  )
  gb.receiveAttack([1, 1])
  gb.receiveAttack([2, 1])
  expect(gb.allShip.patrolBoat.isSunk()).toBe(true)
})
