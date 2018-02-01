import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { selectPerson, returnToSearch } from './state/actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

// normally named mapStateToProps
const mapStateToProps = (state) => {
  return {
    peopleSelect: state.peopleSelect,
    peopleSelected: state.peopleSelected,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectPerson: function (payload) {
      dispatch(selectPerson(payload))
    },
    backBtn(payload) {
      dispatch(returnToSearch(payload))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
