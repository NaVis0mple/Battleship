export const domMOdule = () => {
  function createGameBoardUI () {
    //10*10
    const playerBoard = document.getElementById('playerBoard')
    const tenbyten = (() => {
      for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 11; j++) {
          const div = document.createElement('div')
          div.textContent = 'O'
          div.id = `${i},${j}`
          div.classList.add('cell')
          playerBoard.appendChild(div)
        }
      }
    })()
  }
  function changeBoard_Hit (pos) {
    //turn the cell background red
    const posx = pos[0]
    const posy = pos[1]
    const target = document.getElementById(`${posx},${posy}`)
    target.classList.add('hit')
  }

  function changeBoard_Miss (pos) {
    //turn cell gray
    const posx = pos[0]
    const posy = pos[1]
    const target = document.getElementById(`${posx},${posy}`)
    target.classList.add('miss')
  }

  function inputAttackPos () {}
  function eventListenOfCell () {
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell =>
      cell.addEventListener('click', e => {
        return [e.target.id]
      })
    )
  }
  return {
    createGameBoardUI,
    changeBoard_Hit,
    changeBoard_Miss,
    inputAttackPos,
    eventListenOfCell
  }
}
