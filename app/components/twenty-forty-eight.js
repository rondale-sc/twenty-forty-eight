import Component from '@ember/component';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';
import { computed } from '@ember/object';

import Board from 'twenty-forty-eight/utils/board';

export default Component.extend({
  serializedBoard: computed('board', function() {
    return this.board.serialized();
  }),

  init() {
    this._super(...arguments);

    this.internalScore = 0;

    this.board = new Board([
      [0, 0, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0]
    ]);

    this.keyboardShortcuts = {
      up: 'up',
      down: 'down',
      right: 'right',
      left: 'left'
    }
  },

  score: computed('board', function() {
    return this.board.score;
  }),

  didInsertElement() {
    this._super(...arguments);
    bindKeyboardShortcuts(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    unbindKeyboardShortcuts(this);
  },

  actions: {
    up() {
      this.set('board', this.board.move('up'));
    },
    down() {
      this.set('board', this.board.move('down'));
    },
    right() {
      this.set('board', this.board.move('right'));
    },
    left() {
      this.set('board', this.board.move('left'));
    }
  }
});
