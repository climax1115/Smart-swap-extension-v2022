import React from 'react';

function Setting(props) {
    return (
        <div>
          <div id='setting'>
            <div className="d-flex justify-content-between" style={{'marginBottom':'10px'}}>
              <div className=""><span>MAX PRIORITY FEE</span></div>
              <div className=""><span>Estimated high: 5 Gwei</span></div>
            </div>         
            <div className="container-fluid">
              <div className="row">
                <div className="col-8 bg-light text-black p-3">5.0.0</div>
                <div className="col-4 bg-secondary text-white p-3">Gwei</div>
              </div>  
            </div>
            <br/>
            <div className="d-flex justify-content-between"  style={{'marginBottom':'10px'}}>
              <div className=""><span>MAX FEE</span></div>
              <div className=""><span>Estimated high: 42 Gwei</span></div>
            </div>         
            <div className="container-fluid">
              <div className="row">
                <div className="col-8 bg-light text-black p-3">74.07</div>
                <div className="col-4 bg-secondary text-white p-3">Gwei</div>
              </div>  
            </div>
          <br/>
          <div className="d-flex justify-content-between">
              <div className=""><span>Wait time</span></div>
              <div className=""><span>12sec</span></div>
            </div> 
            
            <br/>
          <div className="d-flex justify-content-between" style={{'marginBottom':'30px'}}>
              <div className=""><span>Fee range</span></div>
              <div className=""><span>41.12-74.07 Gwei</span></div>
            </div>                     
          </div>            
        </div>
    );
}

export default Setting;