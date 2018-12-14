import Board from 'twenty-forty-eight/utils/board';
import {
  module,
  module as describe,
  test
} from 'qunit';

module('Unit | Utility | board', function (hooks) {
  hooks.beforeEach(()=> {
    /*
    * Isolate random tile generation:
    *   Doing so explicitly here, but could instead opt to add a guard around
    *   test environments. Still on the fence about the whole thing
    */
    Board.prototype.generateRandomTile = function() {};
  });

  test('serialized', function (assert) {
    let initialBoardState = [
      [0, 0, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    let board = new Board(initialBoardState)

    assert.equal(board.serialized(), initialBoardState)
  });

  describe('move left', function () {
    test('', function (assert) {
      let initial = [
        [0, 0, 0, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      let expected = [
        [0, 0, 0, 0],
        [4, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      let board = new Board(initial);

      board = board.move('left');

      assert.deepEqual(board.serialized(), expected)
    });
  });

  describe('move down', function () {
    test('', function (assert) {
      let initial = [
        [0, 0, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0]
      ];

      let expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 4, 0]
      ];

      let board = new Board(initial);

      board = board.move('down');

      assert.deepEqual(board.serialized(), expected)
    });

    test('double merge', function(assert) {
      let initial = [
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 4, 0],
        [0, 0, 4, 0]
      ];

      let expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 4, 0],
        [0, 0, 8, 0]
      ];

      let board = new Board(initial);

      board = board.move('down');

      assert.deepEqual(board.serialized(), expected)

    })
  });

  test('lfold', function(assert) {
    let initial = [0, 2, 2, 0];
    let expected = [4, 0, 0, 0];

    assert.deepEqual(Board.lfold(initial), expected);
  });

});
