import Component from '@ember/component';
import { inject as service } from '@ember/service'
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default Component.extend({
  eventManager: service('event-manager'),

  init() {
    this._super(...arguments);

    this.keyboardShortcuts = {
      up: 'up',
      down: 'down',
      right: 'right',
      left: 'left'
    }
  },

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
      console.log('up');
    },
    down() {
      console.log('down');
    },
    right() {
      console.log('right');
    },
    left() {
      console.log('left');
    }
  }
});
