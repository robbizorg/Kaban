import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

// If working with Backend, must implement waitFor method
// in order to allow rendering after data has loaded
class LaneStore {
	constructor() {
		this.bindActions(LaneActions);

		this.lanes = [];
	}
	create(lane) {
		const lanes = this.lanes;

		lane.id = uuid.v4();

		// If notes aren't provided, 
		// default to empty array
		lane.notes = lane.notes || [];

		this.setState({
			lanes: lanes.concat(lane)
		});
	}
	update(updatedLane) {
		const lanes = this.lanes.map(lane => {
			if(lane.id === updatedLane.id) {
				return Object.assign({}, lane, updatedLane);
			}

			return lane;
		});

		this.setState({lanes});
	}
	delete(id) {
		this.setState({
			lanes: this.lanes.filter(lane => lane.id !== id)
		});
	}
	attachToLane({noteId, laneId}) {
		//console.log("Im Being Called");
		const lanes = this.lanes.map(lane => {
			//console.log("Iterating through lanes");
			if (lane.id === laneId) {
				//console.log("Its a match!");
				if(lane.notes.includes(noteId)) {
					console.warn('Already attached note to lane', lanes);
				} else {
					//console.log("Pushing Notes");
					lane.notes.push(noteId);
				}
			}
			return lane;
		});

		this.setState({lanes});
	}
	detachFromLane({laneId, noteId}) {
		const lanes = this.lanes.map(lane => {
			if (lane.id === laneId) {
				lane.notes = lane.notes.filter(note => note !== noteId);
			}

			return lane;
		});

		this.setState({lanes});
	}
}

export default alt.createStore(LaneStore, 'LaneStore');