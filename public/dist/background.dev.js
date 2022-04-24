"use strict";

// const wallettype = data.connectWalletType;
//     //alert(walletType);
//     const receive_amount = data.receive_amount;
//     const receive_token = data.receive_token
//     const send_amount = data.send_amount;
//     const send_token = data.send_token;
//     const crypto_network = data.crypto_network;
//     const send_address = data.send_address;
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
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "want_msg") {
    console.log("received from popup");
    var tabURL = "Not set yet";
    chrome.tabs.getCurrent(function (tab) {
      tabURL = tab.url;
    });
    sendResponse({
      navURL: tabURL
    });
  }
});
chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  if (data.type === 'notification') {
    wallettype = data.connectWalletType; //alert(walletType);

    receive_amount = data.receive_amount;
    receive_token = data.receive_token;
    send_amount = data.send_amount;
    send_token = data.send_token;
    crypto_network = data.crypto_network;
    send_address = data.send_address;
    console.log("notification");
    console.log(data, sender, sendResponse);
    window.open("index.html", "extension_popup", "width=513, height= 680, top=10, right=5, left=1000, popup=yes, status=no,scrollbars=yes,resizing=false"); // window.open("index.html?wallettype="+ wallettype+"&receive_amount="+receive_amount+"&receive_token="+receive_token+"&send_amount="+send_amount+"&send_token="+send_token+"&crypto_network="+crypto_network+"&send_address="+send_address, "extension_popup", "width=513, height= 680, top=10, right=5, left=1000, popup=yes, status=no,scrollbars=yes,resizing=false");

    sendResponse({
      success: "popup"
    });
  }
});
chrome.runtime.onInstalled.addListener(console.log('installed!'));
chrome.contextMenus.onClicked.addListener(function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "getHeadlines"
    });
  });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {// chrome.tabs.executeScript({
  //     file: 'js/jquery.min.js'
  // });
});
chrome.tabs.onCreated.addListener(function (tab) {});