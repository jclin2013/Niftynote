import ReactQuill from 'react-quill';
import React from 'react';
import { createNote, updateNote } from '../../actions/notes_actions';
import { connect } from 'react-redux';
import NotebookScrollbar from '../notebooks/notebook_scrollbar';
import { withRouter } from 'react-router';

class NewNote extends React.Component {
  constructor(props) {

    super(props)

    let delayTimerCreate = () => setTimeout(() => {
      return this.props.createNote(
            {
              body: this.state.body,
              title: this.state.title,
              notebookId: this.state.notebookId
            }
          )
    }, 1000)

    let delayTimerUpdate = () => setTimeout(() => {
      return this.props.updateNote(
            {
              body: this.state.body,
              title: this.state.title,
            }
          )
    }, 1000)

    this.state = { body: '',
                  title: '',
                  delayTimer: delayTimer,
                  timerId: delayTimer(),
                  notebookId: 0
                 }
    // this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.leaveNewNotePage = this.leaveNewNotePage.bind(this);
  }

  // componentDidMount() {
  //
  //   debugger
  //   let defaultNotebookId = this.props.notebooks.filter( (notebookObj) => {
  //     return notebookObj.defaultNotebook === true;
  //   })[0].id;
  //
  //   debugger
  //
  //   this.setState({notebookId: defaultNotebookId});
  // }

  // componentWillReceiveProps(newProps) {
  //   debugger
  //   this.setState({body: this.state.body, title: this.state.title})
  // }

  handleInputChange(event) {
    let param;
    if (typeof event.target === 'undefined') {
      param = {body: event};
    } else {
      param = {title: event.target.value};
    }

    console.log(this.state)

    this.setState(param, clearTimeout(this.state.timerId));
    this.setState({timerId: this.state.delayTimer()});
  }

  leaveNewNotePage() {
    this.props.router.push('/home');
  }

  render() {
      let toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean']                                         // remove formatting button
        ];

    let formType = (this.props.location.pathname === '/home') ? 'homeDropDown' : 'newNotebookDropDown';

    return (
      <div className="quillContainer">

        <NotebookScrollbar formType={formType}/>
        <input type="text" value={this.state.title} onChange={this.handleInputChange}></input>
        <ReactQuill value={this.state.body}
                    onChange={this.handleInputChange}
                    modules={ {toolbar: toolbarOptions} }/>

                  <button onClick={this.leaveNewNotePage}>Done</button>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { notebooks: Object.values(state.notebooks) };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (note) => dispatch(createNote(note)),
    updateNote: (note) => dispatch(updateNote(note))
    // fetchNotebooks: (notebooks) => dispatch(fetchNotebooks(notebooks))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNote));
