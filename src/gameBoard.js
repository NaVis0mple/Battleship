import { createShip } from './ship'
import { domModule } from './DOM'
export const gameBoard = () => {
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

    if (name === 'carrier' && !allShip.carrier && array.length === 5) {
      let carrier = createShip(5)
      carrier.pos = array
      allShip.carrier = carrier
      return
    } else if (
      name === 'battleship' &&
      !allShip.battleship &&
      array.length === 4
    ) {
      let battleship = createShip(4)
      battleship.pos = array
      allShip.battleship = battleship
    } else if (
      name === 'destroyer' &&
      !allShip.destroyer &&
      array.length === 3
    ) {
      let destroyer = createShip(3)
      destroyer.pos = array
      allShip.destroyer = destroyer
    } else if (
      name === 'submarine' &&
      !allShip.submarine &&
      array.length === 3
    ) {
      let submarine = createShip(3)
      submarine.pos = array
      allShip.submarine = submarine
    } else if (
      name === 'patrolBoat' &&
      !allShip.patrolBoat &&
      array.length === 2
    ) {
      let patrolBoat = createShip(2)
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
      if (missPos && hitPos.length) {
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
            domModule().changeBoard_Hit(who, pos)
            return
          }
        }
      }
    }
    missPos.push(pos)
    domModule().changeBoard_Miss(who, pos)
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
    takenbyship
  }
}
