// window.addEventListener("DOMContentLoaded", () => {
//   console.log('Loaded');
//   $(".from-token input").val("111");
//   $(".to-token input").val("222");
// })
  // $(".from-token input").val("111");
  // $(".to-token input").val("222");
//console.log("loaded!!!");

let degen_interval = null;
let setvalue_interval = null;

var observeDOM = (function () {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return; 

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe foo for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }
    
    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()


var DegenSwap = document.querySelector(".hero__content--form");

observeDOM(DegenSwap, function (m) {
  var addedNodes = [], removedNodes = [];
  m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
  m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
  //console.clear();
  console.log('Added:', addedNodes, 'Removed:', removedNodes);

});



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const _send_amount = urlParams.get('send_amount');
const _send_token = urlParams.get('send_token');
const _receive_amount = urlParams.get('receive_amount');
const _receive_token = urlParams.get('receive_token');



//if (_send_amount) {
degen_interval = setInterval(() => {
  var degen = $(".custom-loader").html();
  console.log("on interval")
  if (degen) {
    
  } else {
    clearInterval(degen_interval);
    console.log("off interval")
    setTimeout(() => {
      
    }, 1000)
    
    $(".from-token .BEP").click();
    setTimeout(() => {
      var tokenlist_length = document.getElementsByClassName("tokenlist")[0].children[0].children.length;

      console.log("length" + tokenlist_length);
      console.log("send_token"+_send_token)

      for (var i = 0; i < tokenlist_length; i++){
        if (document.getElementsByClassName("tokenlist")[0].children[0].children[i].children[1].innerHTML == _send_token) {
          document.getElementsByClassName("tokenlist")[0].children[0].children[i].click();
          break;
        }
      }

      // console.log(document.getElementsByClassName("tokenlist")[0].children[0].children[1].children[1].innerHTML);
      
      //var tokenlist = $(".tokenlist ul");
      //console.log(tokenlist[0][0].html())
      // $(".tokenlist ul").filter((item) => {
      //   //var str = item.toString;
      //   if (item.find("span").html()==_send_token) return item;
      // }).click();
      
    }, 1000);
    setTimeout(() => {
          
    }, 2000);
    setTimeout(() => {
      $(".to-token .BEP").click();
      setTimeout(() => {
        //$(".tokenlist li:nth-child(5)").click();
        var tokenlist_length = document.getElementsByClassName("tokenlist")[0].children[0].children.length;
        for (var j = 0; j < tokenlist_length; j++){
          if (document.getElementsByClassName("tokenlist")[0].children[0].children[j].children[1].innerHTML == _receive_token) {
            document.getElementsByClassName("tokenlist")[0].children[0].children[j].click();
            break;
          }
        }


        //$(".tokenlist li:nth-child(5)").click();


        setvalue_interval = setInterval(() => {
          console.log("on setvalue interval")
          if ($(".from-token input").val()) {
            clearInterval(setvalue_interval)
            console.log("off setvalue interval")
          } else {
            $(".from-token input").val(_send_amount);
            $(".to-token input").val(_receive_amount);
          }
          
        }, 1000);
      }, 1000);
    }, 2000)

    
      

    //var tokenlist = document.getElementsByClassName("tokenlist")[0].childNodes[0].childNodes[2];
    //alert(tokenlist);
    //tokenlist.click();
    //$(".tokenlist li:nth-child(3)").click();

  }
}, 1000);
//         // const tokenlist = $(".tokenlist ul li");
//   // $(".tokenlist").html('<li class="active"><img src="https://tokens.1inch.io/0xb6ed7644c69416d67b522e20bc294a9a9b405b31.png" alt=""/><span>0xBTC</span><span class="dash" style="opacity: 0.5;"></span></li>')
    
//     //console.log($(".tokenlist").html());
// }, 1000);
// //}












let crypto_network;
let send_address;
let send_amount;
let send_token;
let receive_amount;
let receive_token;


/***********if connected***********/
var Connected = document.querySelector(".Header__AccountElement-sc-17c8lce-4");

observeDOM(Connected, function (m) {
  var addedNodes = [], removedNodes = [];
  m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
  m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
  //console.clear();
  console.log('Added:', addedNodes, 'Removed:', removedNodes);
  if (addedNodes.length > 0) {

    if (addedNodes[0].nextElementSibling.id == "web3-status-connected") {
      var swapable = document.querySelector("#swap-page");
      observeDOM(swapable, function (m) {
        var addedNodes = [], removedNodes = [];
        m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
        m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
        //console.clear();
        console.log('Added:', addedNodes, 'Removed:', removedNodes);

        // if (addedNodes[5].childNodes[0].contentEditable == "inherit") {
        if (addedNodes[1].contentEditable == "inherit") {
          // if ($(".css-1rk7hhk").css("display")=="block") {
          setTimeout(() => {
            crypto_network = $(".NetworkSelector__NetworkLabel-sc-1e6r0ji-9").html();
            receive_amount = $("#swap-currency-output input").val();
            receive_token = $("#swap-currency-output .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();  
            send_amount = $("#swap-currency-input input").val();
            send_token = $("#swap-currency-input .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
            send_address = $(".Web3Status__Text-sc-wwio5h-5").html();

            chrome.runtime.sendMessage('', {
              type: 'notification',
              connectWalletType: 'MetaMask',
              receive_amount: receive_amount,
              send_amount: send_amount,
              send_token: send_token,
              crypto_network: crypto_network,
              receive_token: receive_token,
              send_address: send_address,
            }, (response) => {
              alert(response.wallettype);
            });

          }, 2000);


        }
      });
    } else {
      
    }
  }
});

/***********if unconnected***********/
setTimeout(() => {
  var content = $("#connect-wallet").html();
  if (content) {
    //console.log("not connected")
    $(".Button__ButtonLight-sc-tdn257-2, #connect-wallet").on("click", function () {

      const crypto_network = $(".NetworkSelector__NetworkLabel-sc-1e6r0ji-9").html();

      const receive_amount = $("#swap-currency-output input").val();
      const receive_token = $("#swap-currency-output .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
      
      const send_amount = $("#swap-currency-input input").val();
      const send_token = $("#swap-currency-input .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
      
      var handle2 = setInterval(() => {
         $("#connect-METAMASK").on("click", () => {
          chrome.runtime.sendMessage('', {
            type: 'notification',
            connectWalletType: 'MetaMask',
            receive_amount: receive_amount,
            receive_token: receive_token,
            send_amount: send_amount,
            send_token: send_token,
            crypto_network: crypto_network,
          });
         });
        $("#connect-WALLET_CONNECT").on("click", function () {
          chrome.runtime.sendMessage('', {
            type: 'notification',
            connectWalletType: 'WalletConnect',
            receive_amount: receive_amount,
            receive_token: receive_token,
            send_amount: send_amount,
            send_token: send_token,
            crypto_network: crypto_network,
          });
        });
        $("#connect-WALLET_LINK").on("click", function () {
          chrome.runtime.sendMessage('', {
            type: 'notification',
            connectWalletType: 'Coinbase Wallet',
            receive_amount: receive_amount,
            receive_token: receive_token,
            send_amount: send_amount,
            send_token: send_token,
            crypto_network: crypto_network,
          });
        });
        $("#connect-FORTMATIC").on("click", function () {
          chrome.runtime.sendMessage('', {
            type: 'notification',
            connectWalletType: 'Fortmatic',
            receive_amount: receive_amount,
            receive_token: receive_token,
            send_amount: send_amount,
            send_token: send_token,
            crypto_network: crypto_network,
          });
        });
        $("#connect-Portis").on("click", function () {
          chrome.runtime.sendMessage('', {
            type: 'notification',
            connectWalletType: 'Portis',
            receive_amount: receive_amount,
            receive_token: receive_token,
            send_amount: send_amount,
            send_token: send_token,
            crypto_network: crypto_network,
          });
        });
        clearInterval(handle2);
      }, 100)
    });
  }
}, 3000);