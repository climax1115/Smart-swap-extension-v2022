
let wallettype;
let send_amount;
let send_token;
let send_address;
let receive_amount;
let receive_token;
let crypto_network;

function onCreated() {
  if (chrome.runtime.lastError) {
    console.log("error creating item:" + chrome.runtime.lastError);
  } else {
    console.log("item created successfully");
  }
}
chrome.contextMenus.create({
  id: "popup-1",
  type: "radio",
  title: "Popup 1",
  contexts: ["all"],
  checked: true
}, onCreated);
chrome.contextMenus.create({
  id: "popup-2",
  type: "radio",
  title: "Popup 2",
  contexts: ["all"],
  checked: false
}, onCreated);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "header_info":
      sendResponse({
        wallettype: wallettype,
        crypto_network: crypto_network,
        send_address: send_address,
        send_token: send_token,
        send_amount: send_amount,
        receive_amount: receive_amount,
        receive_token: receive_token,
      });
      break;
    case "content_info":
      sendResponse({
        wallettype: wallettype,
        crypto_network: crypto_network,
        send_address: send_address,
        send_token: send_token,
        send_amount: send_amount,
        receive_amount: receive_amount,
        receive_token: receive_token,
      });
      break;
    case "open_degenio":
      console.log("send_amount"+request.send_amount)


      
      
// chrome.tabs.getSelected({active:true}, function(tab) {
//   chrome.tabs.sendMessage(tab.id, { message: "TEST" });
// });
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, {action: "hello"}, function(response) {
    //      if (!chrome.runtime.lastError) {
    //         // if you have any response
    //         console.log(response);
    //     } else {
    //         console.log("Error");
    //     }
    //   });
    // });
      
      break;
  }
})

// chrome.storage.local.set({username: "username"}, function() { 
//       console.log("User is set to " + username);
//       chrome.runtime.sendMessage({type: "USER_STORED", username:"username" });
//       console.log("message sent"); 
//     }); 


    // // Open extension window
    // console.log("WINDOW_OPENED"); 
    // var win = window.open("index.html", "extension_popup"); 


chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.type === 'notification') {
    wallettype = data.connectWalletType;
    receive_amount = data.receive_amount;
    receive_token = data.receive_token
    send_amount = data.send_amount;
    send_token = data.send_token;
    crypto_network = data.crypto_network;
    send_address = data.send_address;
   
    var win = window.open("index.html", "extension_popup", "width=513, height= 680, top=10, right=5, left=1000, popup=yes, status=no,scrollbars=yes,resizing=false");

    // var timer = setInterval(function() { 
    //   if(win.closed) {
    //       clearInterval(timer);
    //       alert('closed');
    //   }
    // }, 1000);
  }
});


chrome.runtime.onInstalled.addListener(
    console.log('installed!')
);
chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {type: "getHeadlines"});
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
});
chrome.tabs.onCreated.addListener(tab => {
});
