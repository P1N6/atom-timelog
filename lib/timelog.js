'use babel';

import TimelogView from './timelog-view';
import { CompositeDisposable } from 'atom';

export default {

  timelogView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.timelogView = new TimelogView(state.timelogViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.timelogView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'timelog:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.timelogView.destroy();
  },

  serialize() {
    return {
      timelogViewState: this.timelogView.serialize()
    };
  },

  toggle() {
    console.log('Timelog was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
