"use strict";

$(document).ready(function () {
  $("#swap-currency-input input").val("");
  var swappableInterval = null;
  var connected = true;
  var handle = setTimeout(function () {
    var valid_info = $("#connect-wallet .Web3Status__Text-sc-wwio5h-5").html(); //console.log(valid_info)

    if (valid_info == "Connect Wallet") {
      connected = true; //console.log("connected_true: "+connected)

      $(".Button__ButtonLight-sc-tdn257-2, #connect-wallet").on("click", function () {
        //clearInterval(handle)
        var crypto_network = $(".NetworkSelector__NetworkLabel-sc-1e6r0ji-9").html();
        var receive_amount = $("#swap-currency-output input").val();
        var receive_token = $("#swap-currency-output .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
        var send_amount = $("#swap-currency-input input").val();
        var send_token = $("#swap-currency-input .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
        var handle2 = setInterval(function () {
          $("#connect-METAMASK").on("click", function () {
            chrome.runtime.sendMessage('', {
              type: 'notification',
              connectWalletType: 'MetaMask',
              receive_amount: receive_amount,
              receive_token: receive_token,
              send_amount: send_amount,
              send_token: send_token,
              crypto_network: crypto_network
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
              crypto_network: crypto_network
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
              crypto_network: crypto_network
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
              crypto_network: crypto_network
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
              crypto_network: crypto_network
            });
          });
          clearInterval(handle2);
        }, 100);
      });
    } else {
      // function wait_dispatch() {
      //     console.log("ok")
      //   clearInterval(swappableInterval);
      // }
      // $(document).bind('DOMNodeInserted', function(event) {
      //       console.log('inserted ' + event.target.nodeName + // new node
      //             ' in ' + event.relatedNode.nodeName); // parent
      // });
      var wait_dispatch = function wait_dispatch() {
        //alert("connected!");
        var swappable = $(".css-1rk7hhk").html();

        if (swappable) {
          //alert("ok!")
          var crypto_network = $(".NetworkSelector__NetworkLabel-sc-1e6r0ji-9").html();
          var receive_amount = $("#swap-currency-output input").val();
          var receive_token = $("#swap-currency-output .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
          var send_amount = $("#swap-currency-input input").val();
          var send_token = $("#swap-currency-input .CurrencyInputPanel__StyledTokenName-sc-db1zdq-9").html();
          clearInterval(handle);
          send_to_background(crypto_network, send_amount, send_token, receive_amount, receive_token); // document.location.reload();
          // alert(send_amount)
          // setInterval(() => {
          //   $("#swap-currency-input input").val("ccc")
          // }, 100);

          clearInterval(swappableInterval);
        }
      };

      var send_to_background = function send_to_background(crypto_network, send_amount, send_token, receive_amount, receive_token) {
        var send_address = $(".Web3Status__Text-sc-wwio5h-5").html(); //window.clearInterval(swappableInterval);

        var sure = true;

        if (sure) {
          chrome.runtime.sendMessage('', {
            type: 'notification',
            connectWalletType: 'MetaMask',
            receive_amount: receive_amount,
            send_amount: send_amount,
            send_token: send_token,
            crypto_network: crypto_network,
            receive_token: receive_token,
            send_address: send_address
          });
        }

        clearInterval(swappableInterval);
      };

      connected = false; //clearInterval(swappableInterval)
      // const  wait_dispatch = () => {
      //   console.log("ok")
      //   clearInterval(swappableInterval);
      // }

      swappableInterval = setInterval(wait_dispatch, 500);
    }
  }, 30); // ended first timer(deciding connected)
  //
});