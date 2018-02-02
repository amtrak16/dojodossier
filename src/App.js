import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { newDossier, addNewItem } from './state/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleVal: '',
      titleMsg: '',
      titleErr: false,
      disableSbmBtn: true,
      itemVal: '',
      itemMsg: '',
      itemErr: false,
      curId: 0
    }
    this.onTitleIn = this.onTitleIn.bind(this)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onItemIn = this.onItemIn.bind(this)
  }

  onTitleIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ titleVal: target.value, titleErr: true, titleMsg: 'Please enter a title value to add.', titleSelect: false, titleRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ titleVal: target.value, titleErr: false, titleMsg: '', titleSelect: false, disableSbmBtn: false })
    }
  }

  onTitleClick(evt) {
    evt.preventDefault();
    this.props.newDossier({ id: 1, title: this.state.titleVal, items: [{item:'First item'}]})
  }

  onItemIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ itemVal: target.value, itemErr: true, itemMsg: 'Please enter an item value to add.', itemSelect: false, itemRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ itemVal: target.value, itemErr: false, itemMsg: '', itemSelect: false, disableSbmBtn: false })
    }
  }

  onItemClick({ evt }) {
    evt.preventDefault();
    this.props.addNewItem({ id: this.state.curId, items: [{ item: evt.target.value }] })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <p className="App-intro"></p>
          <form>
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
          <RenderTabs dossier={this.props.dossier} />
          <div class="card">
            <div class="row">
              <div class="small-3 columns md-text-field with-floating-label icon-left">
                <input type="search" id="people_in" placeholder='New Item' value={this.state.itemVal} onChange={this.onItemIn} />
                <label for="title_in"></label>
                <span class="error">{this.state.itemMsg}</span>
              </div>
              <div class="small-9 columns"></div>
              <div class="row">
                <div class="small-2 columns padding-small">
                  <button class="button btn-cta" onClick={this.onItemClick}>Add New Item</button>
                </div>
                <div class="small-10 columns" ></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class RenderTabs extends Component {
  render() {
    return (
      <div class="card">
        <ul class="filter-nav">
          {this.props.dossier.map(({ title }, idx) =>
            <li class="filter-nav-entry active" id={idx}><button>{title}</button></li>
          )}
          {/* {this.props.dossier.map(({ items }) =>
            <RenderTabItems items={items}/>
          )} */}
        </ul>
      </div>
    )
  }
}

class RenderTabItems extends Component {
  render() {
    return (
      <div class="card">
        <div class="row">
          <div class="small-2 columns">
            {this.props.items.map(({item}) =>
            <li>{item}</li>)}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    dossier: state.dossier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newDossier: function (payload) {
      dispatch(newDossier(payload))
    },
    addNewItem: function (payload) {
      dispatch(addNewItem(payload))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
