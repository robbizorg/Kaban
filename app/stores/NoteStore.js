import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);

		this.notes = [];

		this.exportPublicMethods({
			getNotesByIds: this.getNotesByIds.bind(this)
		});
	}
	create(note) {
		const notes = this.notes;

		note.id = uuid.v4();

		this.setState({
			notes: notes.concat(note)
		});

		return note;
	}
	update(updatedNote) {
		console.log("Updated Note From Store called");
		const notes = this.notes.map(note => {
			if(note.id === updatedNote.id) {
				// Object.assign Used, look it up
				return Object.assign({}, note, updatedNote);
			}

			return note;
		});

		// Same as setState({notes: notes})
		// It's an ES6 feature known as property shorthand
		this.setState({notes});
	}
	delete(id) {
		this.setState({
			notes: this.notes.filter(note => note.id !== id)
		});
	}
	getNotesByIds(ids) {
		// Make sure that we're operating on an array and map over the ids
		return (ids || []).map(
			// Extract matching notes
			id => this.notes.filter(note => note.id === id)
			// Filter out empty arrays and get notes
		).filter(a => a.length).map(a => a[0]);
	}
}

// Bottom Assigns a Label to the store:
export default alt.createStore(NoteStore, 'NoteStore');