import rotate from 'twenty-forty-eight/utils/rotate';
export default class Board {
  constructor(state) {
    this.state = state;
  }

  generateRandomTile(board) {
    let arr = [2,4]
    let randomTwoOrFour = arr[Math.floor(Math.random()*arr.length)];
    let isSet = true;

    while(isSet) {
      let randomX = Math.floor(Math.random() * 4);
      let randomY = Math.floor(Math.random() * 4);

      /*
      * TODO: Or GameOver! Will need to add later This will currently break
      *   when there are no more moves to make
      */
      if(board.state[randomX][randomY] === 0) {
        board.state[randomX][randomY] = randomTwoOrFour;
        isSet = false;
      }
    }
  }

  move(direction) {
    let board = this[direction]();

    this.generateRandomTile(board);

    return board;
  }

  left() {
    return new Board(this.state.map(Board.lfold));
  }

  down() {
    let columns = rotate(this.state);
    columns = columns.map(Board.lfold);
    columns = rotate(columns,3);

    return new Board(columns);
  }

  up() {
    let columns = rotate(this.state, 3);
    columns = columns.map(Board.lfold);
    columns = rotate(columns);

    return new Board(columns);
  }

  right() {
    let columns = rotate(this.state, 2);
    columns = columns.map(Board.lfold);
    columns = rotate(columns, 2);

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
