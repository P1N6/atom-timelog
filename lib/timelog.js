'use babel';

import TimelogView from './timelog-view';
import { CompositeDisposable } from 'atom';

timeFormat = "%H:%M"

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
            'timelog:addLine': () => this.addLine()
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

    addLine() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            time = new Date();
            hour = time.getHours();
            min = time.getMinutes();
            editor.insertText(`\n${hour}:${min} $`);
        }
    }
};
