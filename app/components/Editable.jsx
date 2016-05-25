import React from 'react';

export default class Editable extends React.Component {
	render() {
		const {value, onEdit, onValueClick, editing, ...props} = this.props;
		
		console.log("Rendering Editable");
		console.log(editing);
		console.log(value);
		return (
			<div {...props}> 
				{editing ? this.renderEdit() : this.renderValue()}
			</div>
		);
	}
	renderEdit = () => {
		// Look into Refs a bit more
		return <input type="text"
			ref={
				element => element ?
				element.selectionStart = this.props.value.length : null
			}
			autoFocus={true}
			defaultValue={this.props.value}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	};
	renderValue = () => {
		const onDelete = this.props.onValueClick;
		// If the user clicks a normal note, trigger edit
		return (<div onClick={this.props.onValueClick}><span className="value">{this.props.value}</span>{onDelete ? this.renderDelete() : null}</div>);
	};
	renderDelete = () => {
		return <button className="delete" onClick={this.props.onDelete}>x</button>;
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

		}
	};
}