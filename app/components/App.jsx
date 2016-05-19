import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		// Flux is pretty Cool:
		this.state = NoteStore.getState();
	}
	componentDidMount() {
		NoteStore.listen(this.storeChanged);
	}
	componentWillUnmount() {
		NoteStore.unlisten(this.storeChanged);
	}
	storeChanged = (state) => {
		// Needs property initializer, otherwise
		// strict mode defaults to 'undefined'
		this.setState(state);
	}
	render() {
		const notes = this.state.notes;

		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes notes={notes} 
				onEdit={this.editNote}
				onDelete={this.deleteNote}/>
			</div>
		)
		
	}

	deleteNote = (id, e) => {
		// Avoid bubbling to edit
		e.stopPropagation();

		NoteActions.delete(id);
	};

	addNote = () => {
		NoteActions.create({task: 'New Task'});
	};
	editNote = (id, task) => {
		// Don't modify if empty value
		if(!task.trim()) {
			return;
		}

		NoteActions.update({id, task});
	}
}
