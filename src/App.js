import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { newDossier, selectPerson } from './state/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleVal: '',
      titleMsg: '',
      titleErr: false,
      disableSbmBtn: true
    }
    this.onTitleIn = this.onTitleIn.bind(this)
    this.onTitleClick = this.onTitleClick.bind(this)

  }

  onTitleIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ titleVal: target.value, titleErr: true, titleMsg: 'Please enter a title value to add.', titleSelect: false, titleRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ titleVal: target.value, titleErr: false, titleMsg: '', titleSelect: false, disableSbmBtn: false })
    }
  }

  onTitleClick({ target }) {
      this.props.newDossier({ id: 1, title: this.state.titleVal, items: ['First item']})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <p className="App-intro"></p>
          <form onSubmit={this.onSbmClick}>
          <div class="card">
              <div class="row">
                <div class="small-3 columns md-text-field with-floating-label icon-left">
                  <input type="search" id="people_in" placeholder='Title' value={this.state.titleVal} onChange={this.onTitleIn} />
                  <label for="title_in"></label>
                  <span class="error">{this.state.titleMsg}</span>
                </div>
                <div class="small-9 columns"></div>
                <div class="row">
                  <div class="small-2 columns padding-small">
                    <button class="button btn-cta" disabled={this.state.disableSbmBtn} onClick={this.onTitleClick}>Add New Tab</button>
                  </div>
                  <div class="small-10 columns" ></div>
                </div>
              </div>
            </div>
            {/* <div>
              <div class="row">
                <div class="small-2 columns"></div>
                <div class="small-2 columns">
                  <RenderPeople users={this.props.users} search={this.state.peopleVal} onClick={this.onPeopleClick} />
                </div>
                <div class="small-8 columns"></div>
              </div>
            </div> */}
            <div class="card">
              <ul class="filter-nav">
                <li class="filter-nav-entry active"><button>First</button></li>
              </ul>
            </div>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    title: state.title,
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newDossier: function (payload) {
      dispatch(newDossier(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
