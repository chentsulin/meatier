import React, {Component, PropTypes} from 'react';
import EditableContainer from '../../containers/Editable/EditableContainer.js';
import Notes from './../Notes/Notes';
import styles from './Lane.css';

export default class Lane extends Component {
  static propTypes = {
    laneActions: PropTypes.object.isRequired,
    noteActions: PropTypes.object.isRequired,
    lane: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  //constructor(props) {
  //  super(props);
  //  this.noteHandler = this.noteHandler.bind(this);
  //}

  render() {
    const {laneActions:{updateLane, deleteLane}, noteActions: {addNote, ...modNoteActions},
      lane, notes, formKey, initialValues, dispatch} = this.props;
    const laneProps = {dispatch, formKey, initialValues};
    const noteProps = {notes, noteActions: modNoteActions, laneId: lane.id};
    return (
      <div className={styles.lane}>
        <div className={styles.header}>
          <div className={styles.delete} onClick={() => deleteLane(lane.id)}>x</div>
          <EditableContainer {...laneProps}
            item={lane}
            updateItem={updateLane}
            fields={["title"]}
            form="laneTitleForm"
          />
          <div className={styles.addNote}>
            <button onClick={() => addNote({laneId: lane.id, sort: notes.length})}>Add a note</button>
          </div>
        </div>
        <Notes {...noteProps} dispatch={dispatch}/>
      </div>
    )
  }
}