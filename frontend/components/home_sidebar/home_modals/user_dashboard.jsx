import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth_actions';
import { resetCurrentNote } from '../../../actions/notes_actions';
import { resetCurrentNotebook } from '../../../actions/notebooks_actions';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  // failed attempt to add transition to userDashboardModal
  // componentWillUnmount() {
  //   document.getElementsByClassName('userDashboardModal')[0].setAttribute('id', 'modaltofade');
  //   debugger
  // }

  clickHandler() {
    this.props.resetCurrentNote();
    this.props.resetCurrentNotebook();
    this.props.logout();
  }

  render() {

    return (
      <div>
        <img src='/images/earth.jpg'></img>
        <h1>{this.props.currentUser.email}</h1>
        <button onClick={this.clickHandler}>Sign Out</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    resetCurrentNote: () => dispatch(resetCurrentNote()),
    resetCurrentNotebook: () => dispatch(resetCurrentNotebook())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
