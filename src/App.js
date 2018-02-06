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
    this.props.newDossier({ curId: true, title: this.state.titleVal, items: [{item: ''}] })
    this.setState({ titleVal: '' })

  }

  onSelTitle(evt) {
    evt.preventDefault();
    this.props.clrActive()
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
        this.setState({itemVal: ''})
      }
    })
  }
  
  render() {
    let curDoss = undefined
    this.props.dossier.forEach((dossier, idx) => {
      if (dossier.curId) {
        curDoss = dossier
      }
    })

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <p className="App-intro"></p>
        <form onSubmit>

          <div className="row">
            <div className="small-1 columns">&nbsp;</div>
            <div className="small-4 columns md-text-field with-floating-label icon-left">
              <div className="card">
                <input type="search" id="title_in" placeholder='Title' value={this.state.titleVal} onChange={this.onTitleIn} />
                <label for="title_in"></label>
                <span className="error">{this.state.titleMsg}</span>
                <div className="small-2 columns">&nbsp;</div>
              </div>
              <div className="row">
                <div className="small-12 columns">&nbsp;</div>
                <div className="row">
                  <div className="small-2 columns" >&nbsp;</div>
                  <button className="button btn-cta small-4 columns" disabled={this.state.disableSbmBtn} onClick={this.onAddTitle}>Add New Tab</button>
                  <div className="small-2 columns" >&nbsp;</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <ul className="tabs small-8 columns">
              {this.props.dossier.map((dossier, idx) => {
                if (dossier.curId) {
                  return (
                    <li className="tab-title active" key={idx} ><button id={idx} onClick={this.onSelTitle}>{dossier.title}</button></li>)
                }
                else {
                  return (
                    <li className="tab-title" key={idx} ><button id={idx} onClick={this.onSelTitle}>{dossier.title}</button></li>)
                }
              })}
            </ul>
            <div className="small-4 columns" >&nbsp;</div>
          </div>

          <div className="row">
            <div className="small-4 columns" >&nbsp;
              <div className="card">
                {curDoss ?
                  curDoss.items.map((item, idx) => {
                    return (
                      <div className="row">
                        {/* <div className="small-2 columns"> */}
                          <p className="small-4 columns" key={idx}>{item.item}</p>
                        {/* </div> */}
                      </div>
                    )
                  })
                  : <p>&nbsp;</p>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="small-12 columns" >&nbsp;</div>
          </div>

          <div className="row">
            <div className="small-4 columns md-text-field with-floating-label icon-left">
              <div className="card">
                <input type="search" id="item_in" placeholder='New Item' value={this.state.itemVal} onChange={this.onItemIn} />
                <label for="item_in"></label>
                <span className="error">{this.state.itemMsg}</span>
              </div>
            </div>
            <button className="button btn-cta small-2 columns" onClick={this.onAddItem}>Add New Item</button>
            <div className="small-6 columns" >&nbsp;</div>
          </div>
        </form>
      </div>
    );
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
