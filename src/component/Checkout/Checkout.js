/* global chrome */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select, { components } from "react-select";
// import { Link } from 'react-router-dom';
import $ from 'jquery';
import './data';
import { network_arr, token_arr, options1, options2 } from './data';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    //console.log("this.props", props);
    this.state = {
      recvAddress: false,
      saved_money: 12.56,
    }
    this.showRecvInput = this.showRecvInput.bind(this);
  }
  componentDidMount() {
    let data;
    chrome.runtime.sendMessage(
      {
        type:"content_info"
      },
      (response) => {
        var choose_network= network_arr.map((item) => {
          //alert(crypto_network);
          if (item.type == response.crypto_network) {
            return <option value={item.value} selected>{item.type}</option>;
          } else {
            return <option value={item.value}>{item.type}</option>
          }
        })        

        var choose_token = token_arr.map((item) => {
          //alert(crypto_network);
          if (item.type == response.receive_token) {
            return <option value={item.value} selected>{item.type}</option>;
          } else {
            return <option value={item.value} style={{ 'backgroundImage': 'url(icon.png) ' }}>{item.type}</option>
          }
        });

        // /alert(response.wallettype)
        this.setState(
          {
            wallettype: response.wallettype,
            send_amount: response.send_amount,
            send_token: response.send_token,
            send_address: response.send_address,
            receive_amount: response.receive_amount,
            receive_token: response.receive_token,
            crypto_network: response.crypto_network, 
            img_url: "icon/" + response.wallettype + ".png",
            selectedNetwork:options1.filter(item => item.value == response.crypto_network),
            selectedToken: options2.filter(item => item.value == response.send_token),
            choose_network: choose_network,
            choose_token:choose_token,
          },
        );
      }
    )
  }

  handleSelectNetworkChange = selectedNetwork => {
    this.setState({ selectedNetwork });
    console.log(`Option selected:`, selectedNetwork);
  };

  handleSelectTokenChange = selectedToken => {
    this.setState({ selectedToken });
    console.log(`Option selected:`, selectedToken);
  };

  showRecvInput() {
    this.setState((prevState) => ({ 
      recvAddress: !prevState.recvAddress 
    }))
  }

  render() { 
    return (
      <div id='checkout'>
                     
        <p>PAYMENT METHOD</p>
        
        <div className='row'  style={{'marginBottom':'10px'}}>
          <div className='col'>
            <p>NETWORK</p>
            
              
            <Select className='custom-select' id='send-network'
              options={options1}
              
              value={this.state.selectedNetwork}
              onChange={this.handleSelectNetworkChange}
            />
          </div>
          <div className='col'>
            <p>TOKEN</p>
            <Select className='custom-select' id='send-token'
              options={options2}
              value={this.state.selectedToken}
              onChange={this.handleSelectTokenChange}
            />
          </div>
        </div>
        <p>{this.state.send_amount?this.state.send_amount:0} {this.state.send_token?this.state.send_token:'Eth'} | {this.state.crypto_network?this.state.crypto_network:'Ethereum'}</p>
        <hr/>
        <p>RECEIVE</p>
        <div className='row mb-3' id='#receive' style={{'backgroundColor': 'white', 'padding':'10px', 'margin':'0px'}}>
          <div className='col'>
            <span className='text-bold form-control' style={{'color':'black', 'verticalAlign': 'middle', 'borderStyle':'none'}} placeholder="0">{this.state.receive_amount} </span>
            {/* <input type="text" className="form-control text-bold" placeholder="100,000" value={this.state.receive_amount} style={{'borderStyle':'none'}} /> */}
          </div>
          
          <div className='col'>
            <select className='form-control form-select text-bold' style={{ 'borderStyle': 'none' }}>
              {
                this.state.choose_network
              }
            </select>
          </div>
          <div className='col'>
            <select className='form-control form-select text-bold' style={{ 'borderStyle': 'none' }}>
              
              {
                this.state.choose_token
              }
              
            </select>
          </div>
        </div>
        
        
        <div>
          <div className="d-flex justify-content-between mb-3" id='btn-recv'  onClick={this.showRecvInput} >
            <span className="p-2">RECEIVING ADDRESS</span>
            <span className="p-2">
              <span id='angle-down'><i className='fas fa-angle-down'></i></span>
              <span id='angle-up' style={{'display':'none'}}><i className='fas fa-angle-up'></i></span>
            </span>
            
          </div>
          {
            this.state.recvAddress &&
            <div className='mb-3'>
                <input id='recv-address' type="text" className="form-control form-control-lg" placeholder="" value="" />
              </div> 
          }
        </div> 
        
        {/* <button id="btn-check" className='form-control' onClick={this.props.onClick}  style={{'marginBottom':'10px'}}>PAY</button> */}
        <a href={'https://degenswap.io?send_amount='+this.state.send_amount+'&send_token='+this.state.send_token+'&receive_amount='+this.state.receive_amount+'&receive_token='+this.state.receive_token} target="_blank"><button id="btn-check" className='form-control' onClick={this.props.onClick} style={{ 'marginBottom': '10px' }}>PAY</button></a>
        <p id='feeInfo'>
          0.3% service fee | 100% gas and fee reimbursement
        </p>
        <p id="saved-dollar">
          SAVE ${this.state.saved_money}
        </p>
      </div>
    )
  }
}