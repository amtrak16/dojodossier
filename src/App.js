import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { newDossier, addNewItem, clrActive, selDossier } from './state/actions';

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
      itemErr: false
    }
    this.onTitleIn = this.onTitleIn.bind(this)
    this.onAddTitle = this.onAddTitle.bind(this)
    this.onSelTitle = this.onSelTitle.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.onItemIn = this.onItemIn.bind(this)
  }

  onTitleIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ titleVal: target.value, titleErr: true, titleMsg: 'Please enter a title value to add.', titleSelect: false, titleRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ titleVal: target.value, titleErr: false, titleMsg: '', titleSelect: false, disableSbmBtn: false })
    }
  }

  onAddTitle(evt) {
    evt.preventDefault();
    this.props.clrActive()
    this.props.newDossier({ curId: true, title: this.state.titleVal, items: [] })
  }

  onSelTitle(evt) {
    evt.preventDefault();
    this.props.clrActive()
    console.log(evt.target.id)
    this.props.selDossier({ selId: evt.target.id })
  }

  onItemIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ itemVal: target.value, itemErr: true, itemMsg: 'Please enter an item value to add.', itemSelect: false, itemRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ itemVal: target.value, itemErr: false, itemMsg: '', itemSelect: false, disableSbmBtn: false })
    }
  }

  onAddItem(evt) {
    evt.preventDefault();
    this.props.dossier.forEach((dossier, idx) => {
      if (dossier.curId) {
        this.props.addNewItem({ selId: idx, item: this.state.itemVal })
      }
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <p className="App-intro"></p>
        <form onSubmit>
          <div className="card">
              <div className="row">
                <div className="small-3 columns md-text-field with-floating-label icon-left">
                  <input type="search" id="title_in" placeholder='Title' value={this.state.titleVal} onChange={this.onTitleIn} />
                  <label for="title_in"></label>
                  <span className="error">{this.state.titleMsg}</span>
                </div>
                <div className="small-9 columns"></div>
                <div className="row">
                  <div className="small-2 columns padding-small">
                    <button className="button btn-cta" disabled={this.state.disableSbmBtn} onClick={this.onAddTitle}>Add New Tab</button>
                  </div>
                  <div className="small-10 columns" ></div>
                </div>
              </div>
            </div>

          <div className="card">
            <ul className="filter-nav">
              {this.props.dossier.map((dossier, idx) => {
                if (dossier.curId) {
                  return (
                    <li className="filter-nav-entry active" key={idx} ><button id={idx} onClick={this.onSelTitle}>{dossier.title}</button></li>)
                }
                else {
                  return (
                    <li className="filter-nav-entry" key={idx} ><button id={idx} onClick={this.onSelTitle}>{dossier.title}</button></li>)
                }
              })}
            </ul>
          </div>

          <div className="card">
            <div className="row">
              <div className="small-2 columns">
                {this.props.dossier.forEach((dossier, idx) => {
                  if (dossier.curId) {
                    console.log(dossier.items)
                    dossier.items.map((item) => {
                      return(<div>{item}</div>)
                    })
                  }
                })}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="row">
              <div className="small-3 columns md-text-field with-floating-label icon-left">
                <input type="search" id="item_in" placeholder='New Item' value={this.state.itemVal} onChange={this.onItemIn} />
                <label for="item_in"></label>
                <span className="error">{this.state.itemMsg}</span>
              </div>
              <div className="small-9 columns"></div>
              <div className="row">
                <div className="small-2 columns padding-small">
                  <button className="button btn-cta" onClick={this.onAddItem}>Add New Item</button>
                </div>
                <div className="small-10 columns" ></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class RenderTabItems extends Component {
  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="small-2 columns">
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
    // items: state.dossier.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newDossier: function (payload) {
      dispatch(newDossier(payload))
    },
    addNewItem: function (payload) {
      dispatch(addNewItem(payload))
    },
    clrActive: function () {
      dispatch(clrActive())
    },
    selDossier: function (payload) {
      dispatch(selDossier(payload))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
