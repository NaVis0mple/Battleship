import { createShip } from './ship'
//  if not hide , need test all
// test('first create ship', () => {
//   const firstShip = createShip(5)

//   expect(firstShip).toEqual({
//     length: 5,
//     hitCount: 0,
//     sunk: false,
//     hit: expect.any(Function)
//   })
// })

// test('hit function', () => {
//   const ship5 = createShip(5)
//   ship5.hit()
//   expect(ship5.hitCount).toBe(1)
// })

// test('hitCount cant over length', () => {
//   const ship5 = createShip(5)
//   ship5.hit()
//   ship5.hit()
//   ship5.hit()
//   ship5.hit()
//   ship5.hit()
//   expect(ship5.hitCount).toBe(5)
//   ship5.hit()
//   expect(ship5.hitCount).not.toBe(6)
//   expect(ship5.sunk).toBe(true)
// })

// test('sunk true false', () => {
//   const ship3 = createShip(3)
//   ship3.hit()
//   expect(ship3.sunk).toBeFalsy()
//   ship3.hit()
//   expect(ship3.sunk).toBeFalsy()
//   ship3.hit()
//   expect(ship3.sunk).toBeTruthy()
// })

//REMEMBER you only have to test your object’s public interface. Only methods or properties
//that are used outside of your ‘ship’ object need unit tests.
test('ship hit and isSunk methods', () => {
  const ship3 = createShip(3)

  expect(ship3.isSunk()).toBeFalsy()

  ship3.hit()
  expect(ship3.isSunk()).toBeFalsy()

  ship3.hit()
  expect(ship3.isSunk()).toBeFalsy()

  ship3.hit()
  expect(ship3.isSunk()).toBeTruthy()
})

test.todo('54332')
