import React, { Component } from 'react'
import Ledger from './Ledger';
import Setting from './Setting';
export default class Ledger_Setting extends Component {
  constructor(props) {
    super(props);
    this.handleLedgerClick = this.handleLedgerClick.bind(this);
    this.handleSettingClick = this.handleSettingClick.bind(this);
    
    this.state = {ledger: true};
  }
  handleLedgerClick() {
    this.setState({
      ledger: true
    })
  }
  handleSettingClick() {
    this.setState({
      ledger: false
    })
  }
  render() {
    const ledger= this.state.ledger
    return (
      <div id='ledset'>
        <div className='row' id='ledset-title' style={{'marginBottom':'30px', 'padding':'10px 20px'}}>
          {
            ledger
            ?<div className='col card-option card-option-1 option-active' id='card-option-1' onClick={this.handleLedgerClick} ><h3>LEDGER</h3>
            </div>
            :<div className='col card-option card-option-1 ' id='card-option-1' onClick={this.handleLedgerClick} ><h3>LEDGER</h3>
           </div>
          }
          {
            ledger
            ?<div className='col card-option card-option-2' id='card-option-2' onClick={this.handleSettingClick}>
            <h3>SETTING</h3>
            </div>
            :<div className='col card-option card-option-2 option-active' id='card-option-2' onClick={this.handleSettingClick}>
            <h3>SETTING</h3>
            </div>
          }     
        </div>
        <div>
          {
            ledger
              ? <Ledger />
              : <Setting/>
          }
        </div>
      </div>
    )
  }
}

