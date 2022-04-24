/* global chrome */
import React from "react";

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import Checkout from './component/Checkout/Checkout';
import Ledger_Setting from "./component/Ledger_Setting/Ledger_Setting";
import ExtNavbar from './component/ExtNavbar';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showLedSet: false
    };

    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handleLedSetClick = this.handleLedSetClick.bind(this);
  }
  componentDidMount() {
    chrome.runtime.sendMessage(
      {
        type:"header_info"
      },
      (response)=> {
        //alert(response.wallettype)
        this.setState(
          {
            wallettype: response.wallettype,
            send_amount: response.send_amount,
            send_token: response.send_token,
            send_address: response.send_address,
            receive_amount: response.receive_amount,
            receive_token: response.receive_token,
            crypto_network: response.crypto_network, 
            img_url:"icon/" + response.wallettype + ".png"
          },
        );
      }
    )
  }

  handleCheckoutClick() {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   var activeTab = tabs[0];
    //   chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
    // });
    // chrome.runtime.sendMessage(
    //   {
    //     type: "open_degenio",
    //     wallettype: this.state.wallettype,
    //     send_amount: this.state.send_amount,
    //     send_token: this.state.send_token,
    //     send_address: this.state.send_address,
    //     receive_amount: this.state.receive_amount,
    //     receive_token: this.state.receive_token,
    //     crypto_network: this.state.crypto_network, 
    //     img_url:"icon/" + this.state.wallettype + ".png"
    //   },
    //   (response)=> {
        
    //   }
    // )
  }
  handleLedSetClick() {
    this.setState({
      showLedSet: false
    })
  }
  render() {
    const showLedSet = this.state.showLedSet;
    let extensionBody;

    if (showLedSet) {
      extensionBody = <Ledger_Setting/>
    } else {
      extensionBody = <Checkout onClick={this.handleCheckoutClick} />
      
    }
    return (
      <div className="App">
        <header className="App-header">
          <ExtNavbar
            onClick={this.handleLedSetClick}
            showLedSet={this.state.showLedSet}
            img_url={this.state.img_url}
            wallettype={this.state.wallettype}
            send_address={this.state.send_address}
          />        
          <div id='extension-body'>
            {extensionBody}           
          </div>
        </header>
      </div>
    );
  }
}

export default App;