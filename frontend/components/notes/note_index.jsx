import React from 'react';
import NoteItem from './note_item'

class NoteIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    let notesList = this.props.notes.map( noteItem => {
      return (<NoteItem noteItem={noteItem} key={noteItem.id}/>);
    });

    if (this.props.loading === true) {
      return (
        <div className="loadingContainer">
          <img className="loading" src="/images/loading.gif"/>
        </div>
      );
    }

    return (
      <div className="entireNotesIndexCol">
        <div className="notesColTop">
          <h1>Notes</h1>
          <text>{notesList.length} notes</text>
          <button>Options:</button>
        </div>

        <ul>List is here:
          {notesList}
        </ul>
      </div>
    )
  }
}

export default NoteIndex;

// <div id="loading-notes-container">
//   <div id="loading-notes"></div>
// </div>
