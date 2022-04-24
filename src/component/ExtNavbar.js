/* global chrome */
import React from 'react';

function ExtNavbar(props) {
  
  const showLedSet = props.showLedSet;
  
  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-dark"
        style={{
          'padding': '0px 10px',
            // 'position': 'absolute',
            // 'top': '0px',
            'height': '50px',
            'backgroundColor': 'rgb(53,56,63)',
            // 'verticalAlign': 'center'
        }}
      >
        <div className="container-fluid">
          
          <a className="navbar-brand" href="#">
            <img src="swap.png" alt="Avatar Logo" style={{'width':'30px'}} className="rounded-pill" /> 
          </a>
          
          <div className="" id="mynavbar">
            <ul className="navbar-nav me-auto">

            </ul>
            <form className="d-flex">
              
            {
              props.wallettype ?
                <img src={props.img_url} height="25" width="25" alt={props.wallettype + '.png'} />
              :<img src="icon/MetaMask.png" height="25" width="25" alt='MetaMask.png' /> 
                }
                &nbsp;
                <span>{props.send_address}</span>&nbsp;
                
                {
                  showLedSet
                  ? 
                  <span id='btn-close' onClick={props.onClick}><i style ={{"fontSize":'24px'}} className="fa">&#xf00d;</i></span>
                  :<span id='btn-option' ><i style={{"fontSize":'24px'}} className="fa">&#xf142;</i></span>
                }
            </form>
          </div>
        </div>
      </nav>            
    </div>  
  );
}

export default ExtNavbar;