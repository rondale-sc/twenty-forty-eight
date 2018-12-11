import rotate from 'twenty-forty-eight/utils/rotate';
export default class Board {
  constructor(state) {
    this.state = state;
  }

  move(direction) {
    let board = this[direction]();

    let randomX = Math.floor(Math.random() * 4);
    let randomY = Math.floor(Math.random() * 4);

    if(board.state[randomX][randomY] === 0) {
      board.state[randomX][randomY] = 2;
     }

    return board;
  }

  left() {
    return new Board(this.state.map(Board.lfold));
  }

  down() {
    let columns = rotate(this.state);

    columns = columns.map(Board.lfold);

    columns = rotate(columns);
    columns = rotate(columns);
    columns = rotate(columns);

    return new Board(columns);
  }

  up() {
    let columns = rotate(this.state);
    columns = rotate(columns);
    columns = rotate(columns);

    columns = columns.map(Board.lfold);

    columns = rotate(columns);

    return new Board(columns);
  }

  right() {
    let columns = rotate(this.state);
    columns = rotate(columns);

    columns = columns.map(Board.lfold);

    columns = rotate(columns);
    columns = rotate(columns);

    return new Board(columns);
  }

  static lfold(column) {
    let newColumn = column.reduce((accumulator, currentValue) => {

      let lastAccumValue = accumulator[accumulator.length - 1];

      if (currentValue === 0) {
        return accumulator;
      } else {
        if (lastAccumValue === currentValue) {
          accumulator[accumulator.length - 1] = lastAccumValue + currentValue; // merge
        } else {
          accumulator.push(currentValue);
        }
      }
      return accumulator;
    }, []);

    // pad with zeros :(
    for(let i = newColumn.length; i<column.length; i++) {
      newColumn.push(0);
    }

    return newColumn;
  }

  serialized() {
    return this.state;
  }
}
