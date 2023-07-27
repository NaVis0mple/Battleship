import { gameBoard } from './gameBoard'

export const playerturn = (pos, computerboard) => {
  //attack pos
  if (computerboard.isValidAttack(pos)) {
    computerboard.receiveAttack(pos)
  } else {
    return 'novalid'
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
