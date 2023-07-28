// // not hide value
// export const createShip = length => {
//   return {
//     length,
//     hitCount: 0,
//     sunk: false,
//     hit: function () {
//       if (this.hitCount === length) {
//         return
//       }
//       this.hitCount += 1
//       if (this.hitCount === length) {
//         this.sunk = true
//         return
//       }
//     }
//   }
// }

// hide value
export const createShip = length => {
  let hitCount = 0
  let sunk = false
  const hit = () => {
    if (hitCount === length) {
      return
    }
    hitCount += 1
    if (hitCount === length) {
      sunk = true
      return
    }
  }
  const isSunk = () => {
    return sunk
  }
  return {
    hit,
    isSunk
  }
}
