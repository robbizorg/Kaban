import React from 'react';

export default class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editing: false
		};
	}
	render() {
		if(this.state.editing) {
			return this.renderEdit();
		}

		return this.renderNote();
	}
	renderEdit = () => {
		// Look into Refs a bit more
		return <input type="text"
			ref={
				element => element ?
				element.selectionStart = this.props.task.length : null
			}
			autoFocus={true}
			defaultValue={this.props.task}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	};
	renderNote = () => {
		// If the user clicks a normal note, trigger edit
		return <div onClick={this.edit}>{this.props.task}</div>;
	};
	edit = () => {
		// enter edit mode
		this.setState({
			editing: true
		});
	};
	checkEnter = (e) => {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	};
	finishEdit = (e) => {
		// Note will trigger optional onEdit callback
		// to communicate change to app

		const value = e.target.value;

		if(this.props.onEdit) {
			this.props.onEdit(value);

			this.setState({
				editing: false
			});
		}
	};
}