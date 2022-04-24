import React from 'react';

function Ledger(props) {
    return (
        <div>
          <table id='ledger' className='table' height="100px" style={{ 'overflow':'scroll'}}>
            <tbody>
              <tr>
                <td className='first'>
                  <h4 className='send'>Send</h4>
                  <h6 className='send-info'>Aug 18 0x66...</h6>
                </td>
                <td className='second'>
                  <h5 className='amount'>1000 SMART</h5>
                  <h6 className='view-trans'><a>View transaction</a></h6>
                </td>
              </tr>
              <tr>
                <td className='first'>
                  <h4 className='send'>Send</h4>
                  <h6 className='send-info'>Aug 18 0x66...</h6>
                </td>
                <td className='second'>
                  <h5 className='amount'>1000 SMART</h5>
                  <h6 className='view-trans'><a>View transaction</a></h6>
                </td>
              </tr>
              <tr>
                <td className='first'>
                  <h4 className='send'>Send</h4>
                  <h6 className='send-info'>Aug 18 0x66...</h6>
                </td>
                <td className='second'>
                  <h5 className='amount'>1000 SMART</h5>
                  <h6 className='view-trans'><a>View transaction</a></h6>
                </td>
              </tr>
              <tr>
                <td className='first'>
                  <h4 className='send'>Send</h4>
                  <h6 className='send-info'>Aug 18 0x66...</h6>
                </td>
                <td className='second'>
                  <h5 className='amount'>1000 SMART</h5>
                  <h6 className='view-trans'><a>View transaction</a></h6>
                </td>
              </tr>
              
            </tbody>

          </table>            
        </div>
    );
}

export default Ledger;