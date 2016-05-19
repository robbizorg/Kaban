import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);

		this.notes = [];
	}
	create(note) {
		const notes = this.notes;

		note.id = uuid.v4();

		this.setState({
			notes: notes.concat(note)
		});
	}
	update(updatedNote) {
		const notes = this.notes.map(note => {
			if(node.id === updatedNote.id) {
				// Object.assign Used, look it up
				return Object.assign({}, note, updatedNote);
			}

			return note;
		});

		// Same as setState({notes: notes})
		// It's an ES6 feature known as property shorthand
		this.setState({notes})
	}
	delete(id) {
		this.setState({
			notes: this.notes.filter(note => note.id !== id)
		});
	}
}

// Bottom Assigns a Label to the store:
export default alt.createStore(NoteStore, 'NoteStore');