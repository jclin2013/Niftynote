import { connect } from 'react-redux';
import { updateNote } from '../../actions/notes_actions';
import React from 'react';
import { notesSelector } from './notes_to_array';
import ReactQuill from 'react-quill';

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.receiveField = this.receiveField.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.currentNote)
  }

  handleChange(text, delta, source, editor) {
    () => this.setState({body: editor.getText().trim()})
  }

  receiveField(title) {
    e => this.setState({title: e.currentTarget.value});
  }

  render() {
      let setValue = (typeof this.props.currentNote === 'undefined') ? "" : this.state.body

      console.log(this.state)

      return (
          <ReactQuill
            theme="snow"
            value={setValue}
            onChange={this.handleChange}

            />
        );
    }
}

// this.props.updateNote(
//     {
//       body: editor.getText().trim(),
//       title: this.props.currentNote.title,
//       id: this.props.currentNote.id
//     }
//   );

// onKeyPress={
//   function() {
//     this.delaySave(
//       function() {this.props.updateNote(this.state)}, 5000
//     );}
//   }


const mapStateToProps = (state) => {
  let mostRecentNote, mostRecentNotes;

  if (jQuery.isEmptyObject(state.currentNote)) {
    mostRecentNotes = notesSelector(state.notes);
    mostRecentNote = mostRecentNotes[0];
    return { currentNote: mostRecentNote };
  }

  return { currentNote: state.currentNote };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNote: (id) => dispatch(fetchNote(id)),
    updateNote: (note) => dispatch(updateNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
