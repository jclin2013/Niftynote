import React from 'react';
import { Link } from 'react-router';
import NoteIndexContainer from '../notes/note_index_container';
import NotebookIndexContainer from '../notebooks/notebook_index_container';
import ShowNote from '../notes/note_show';
import HomeSidebar from '../home_sidebar/home_sidebar';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.currentUser) { this.props.router.push('/') }
  }

  clickHandler() {
    this.props.logout();
  }

  render() {
    if (!this.props.currentUser) { return null };
    // <h2>Welcome {this.props.currentUser.email}!</h2>
    // <button onClick={this.clickHandler}>Sign Out</button>
    return (
      <div className="homeTotalLayout">
        <HomeSidebar />
        <NoteIndexContainer />
        <NotebookIndexContainer />
        <ShowNote />
      </div>
    );
  }

}

export default Home;

//this is basically what you're looking to render
// <Sidebar />
// <Notebooks />
// <Tags />
// <Notes />
// <Note />
