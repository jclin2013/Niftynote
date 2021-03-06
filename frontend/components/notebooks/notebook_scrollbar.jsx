import React from 'react';
import { connect } from 'react-redux';
import { fetchNotebooks, fetchNotebook } from '../../actions/notebooks_actions';
import { updateNote } from '../../actions/notes_actions';
import { Link, withRouter } from 'react-router';
import NotebookItem from './notebook_item';
import NewNotebook from './new_notebook';
import Modal from 'react-modal';

class NotebookScrollbar extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
                    value: this.props.selectedNotebook.id,
                    newNotebookModalIsOpen: false
                  };
     this.handleChange = this.handleChange.bind(this);
     this.openNewNotebookModal = this.openNewNotebookModal.bind(this);
     this.closeNewNotebookModal = this.closeNewNotebookModal.bind(this);
   }

   componentWillMount() {
     Modal.setAppElement('body');
   }

   componentDidMount() {
     this.props.fetchNotebooks();
   }

    componentWillReceiveProps(newProps) {
        this.setState({
          value: newProps.selectedNotebook.id
        });
    }

   handleChange(e) {
       if (e.target.value === "Create new notebook") {
         this.openNewNotebookModal();
       }
       else {
         this.setState({value: e.target.value});
         this.props.updateNote({id: this.props.currentNote.id, notebook_id: e.target.value});
       }
     }

   openNewNotebookModal() {
     this.setState({newNotebookModalIsOpen: true});
   }

   closeNewNotebookModal() {
     this.setState({newNotebookModalIsOpen: false});
   }

    render() {
      let notebooksList = this.props.sortedNotebooks.map( notebook => {
        return (<NotebookItem formType="dropdown"
                          title={notebook.title}
                          key={notebook.id}
                          notebookId={notebook.id}/>)
                });

      return (
        <div className="entireNotebookScrollMenu">
          <i className="fa fa-book" aria-hidden="true"></i>

          <div className="searchField">
            <input type="search" placeholder="Find a notebook" results="0"></input>
          </div>

          <form className="homePageScrollbarMoveNote">
             <label>
               <select id="homePageNotebookScrollbar" value={this.state.value} onChange={this.handleChange}>
                 <option value="Create new notebook">
                   CREATE NEW NOTEBOOK
                 </option>
                   {notebooksList}
               </select>
             </label>
           </form>

           <Modal
                   isOpen={this.state.newNotebookModalIsOpen}
                   onRequestClose={this.closeNewNotebookModal}
                   contentLabel="newNotebook"
                   className="newNotebookModal"
                   style={{overlay: {backgroundColor: 'white'}}}
                   shouldCloseOnOverlayClick={false}
                 >
                   <NewNotebook creationRequestOrigin="homePage" closeNewNotebookModal={this.closeNewNotebookModal} />
             </Modal>
        </div>
      );
    }
}


const dateComparator = (objX, objY) => (
  new Date(objY.updated_at) - new Date(objX.updated_at)
);

const mapStateToProps = (state) => {

  let sorted_notebooks_arr = Object.values(state.notebooks).sort(dateComparator);
  let currentNotebook = state.notebooks[state.currentNote.notebook_id]
  let selectedNotebook;

  if (currentNotebook) {
      selectedNotebook = currentNotebook
  } else {
      selectedNotebook = {title: ""}
  }

  return {
    sortedNotebooks: sorted_notebooks_arr,
    selectedNotebook: selectedNotebook,
    currentNote: state.currentNote
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNotebook: (id) => dispatch(fetchNotebook(id)),
    updateNote: (note) => dispatch(updateNote(note))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookScrollbar));
