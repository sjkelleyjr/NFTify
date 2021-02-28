// inject script.js into the page.
var s = document.createElement('script');
s.src = chrome.runtime.getURL('js/script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);


// every message from the background script should be an image URL that we either NFTify or bid on.
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    //if the message is not from the background script, ignore it.
	if (sender.tab) {
		sendResponse({ })
		return
	}
    // send a message to the injected script to load web3 with the requested srcUrl.
    await document.dispatchEvent(new CustomEvent('loadWeb3', { srcUrl: request.srcUrl }));
    // NOTE: we have to send something back to the background.js script, likely this will be an Ethereum tx ID.
    sendResponse({ srcUrl: request.srcUrl })
  }
);