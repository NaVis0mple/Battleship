export const domModule = () => {
  function createGameBoardUI (who) {
    //10*10
    const Board = document.getElementById(who + 'Board')
    const tenbyten = (() => {
      for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 11; j++) {
          const div = document.createElement('div')
          div.textContent = 'O'
          div.id = `${who}${i},${j}`
          div.classList.add(who + 'cell')
          Board.appendChild(div)
        }
      }
    })()
  }
  function showPlayerBoardBoatGreen (playerboard) {
    const rowArray = playerboard.takenbyship
    for (const pos of rowArray) {
      const div = document.getElementById(`player${pos[0]},${pos[1]}`)
      div.classList.add('green')
    }
  }
  function changeBoard_Hit (who, pos) {
    //turn the cell background red
    const posx = pos[0]
    const posy = pos[1]
    const target = document.getElementById(`${who}${posx},${posy}`)
    target.classList.add('hit')
  }

  function changeBoard_Miss (who, pos) {
    //turn cell gray
    const posx = pos[0]
    const posy = pos[1]
    const target = document.getElementById(`${who}${posx},${posy}`)
    target.classList.add('miss')
  }

  function newGameButtonListener (game) {
    const button = document.getElementById('newGame')
    const playerboard = document.getElementById('playerBoard')
    const computerboard = document.getElementById('computerBoard')

    button.addEventListener('click', () => {
      playerboard.textContent = ''
      computerboard.textContent = ''
      game()
    })
  }
  function printResult (result) {
    alert(result)
  }
  function addEventListenOfCell (who) {
    return new Promise(resolve => {
      const cells = document.querySelectorAll(`.${who}cell`)
      cells.forEach(cell =>
        cell.addEventListener(
          'click',
          e => {
            const rowPos = e.target.id
            const pos = rowPos.replace(/[a-zA-Z]+/g, '')
            const split = pos.split(',')
            const target = [+split[0], +split[1]]
            resolve(target)
          },
          { once: true }
        )
      )
    })
  }
  return {
    createGameBoardUI,
    changeBoard_Hit,
    changeBoard_Miss,
    newGameButtonListener,
    addEventListenOfCell,
    showPlayerBoardBoatGreen,
    printResult
  }
}
