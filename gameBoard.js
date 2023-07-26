import { createShip } from './ship'
export const gameBoard = () => {
  // const createGameBoard10X10 = () => {
  //   let board = []
  //   for (let i = 1; i < 11; i++) {
  //     for (let j = 1; j < 11; j++) {
  //       board.push([i, j])
  //     }
  //   }
  //   return board
  // }
  // const gb = createGameBoard10X10()

  // No.	Class of ship	Size
  // 1	Carrier	5
  // 2	Battleship	4
  // 3	Destroyer	3
  // 4	Submarine	3
  // 5	Patrol Boat	2
  let takenbyship = []
  let allShip = {}
  const placeShip = (array, name) => {
    //check taken or not
    for (const cell of array) {
      const arrx = cell[0]
      const arry = cell[1]
      for (const cellt of takenbyship) {
        const tx = cellt[0]
        const ty = cellt[1]
        if (arrx === tx && arry === ty) {
          return 'duplicate place'
        }
      }
    }
    takenbyship.push(...array)

    if (name === 'carrier' && !allShip.carrier) {
      let carrier = createShip(5)
      carrier.pos = array
      allShip.carrier = carrier
      return
    } else if (name === 'battleship' && !allShip.battleship) {
      let battleship = createShip(4)
      battleship.pos = array
      allShip.battleship = battleship
    } else if (name === 'destoroyer' && !allShip.destoroyer) {
      let destoroyer = createShip(3)
      destoroyer.pos = array
      allShip.destoroyer = destoroyer
    } else if (name === 'submarine' && !allShip.submarine) {
      let submarine = createShip(3)
      submarine.pos = array
      allShip.submarine = submarine
    } else if (name === 'patrolBoat' && !allShip.patrolBoat) {
      let patrolBoat = createShip(2)
      patrolBoat.pos = array
      allShip.patrolBoat = patrolBoat
    }
  }

  let hitPos = []
  let missPos = []
  const isValidAttack = pos => {
    const posx = pos[0]
    const posy = pos[1]
    //in the borad
    if (posx >= 1 && posx <= 10 && posy >= 1 && posy <= 10) {
      //check if receive same pos attack
      if (hitPos) {
        for (const hit of hitPos) {
          const [hitx, hity] = hit
          if (hitx === posx && hity === posy) {
            return 'same pos'
          }
        }
      }
      if (missPos) {
        for (const miss of missPos) {
          const [missx, missy] = miss
          if (missx === posx && missy === posy) {
            return 'same pos'
          }
        }
      }
      return true
    } else {
      return false
    }
  }
  const receiveAttack = pos => {
    const posx = pos[0]
    const posy = pos[1]

    const carrier = allShip.carrier
    const battleship = allShip.battleship
    const destroyer = allShip.battleship
    const submarine = allShip.submarine
    const patrolBoat = allShip.patrolBoat
    const boatarray = [carrier, battleship, destroyer, submarine, patrolBoat]
    for (const boat of boatarray) {
      if (boat && boat.pos && Array.isArray(boat.pos)) {
        for (const cell of boat.pos) {
          const arrx = cell[0]
          const arry = cell[1]
          if (arrx === posx && arry === posy) {
            const index = boat.pos.indexOf(cell)
            boat.pos.splice(index, 1)
            boat.hit()
            hitPos.push(pos)
            return
          }
        }
      }
    }
    missPos.push(pos)
  }
  return { placeShip, allShip, isValidAttack, receiveAttack, hitPos, missPos }
}
