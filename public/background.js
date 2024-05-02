chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request, sender);
      // Handle the message here
      sendResponse({response: "Message received"});
    }
  );
// This function is called when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item
  // See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#method-create
  chrome.contextMenus.create({
    id: 'captureSnippet', // Unique identifier for the context menu item
    title: 'AI Summary', // Text to be displayed in the context menu
    contexts: ['selection'], // Show the context menu item only when text is selected
  });
});

// This function is called when a context menu item is clicked
// See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#event-onClicked
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   // Check if the clicked menu item is 'captureSnippet'
//   console.log("clicked", info.menuItemId);
//   if (info.menuItemId === 'captureSnippet') {
//     const selectedText = info.selectionText; // Get the selected text

//   if (selectedText) {
//     // Send the selected text to the background or popup script
//     // chrome.runtime.sendMessage({action: "newTextSelected", text: selectionText});
//     chrome.storage.local.set({textSelected: selectedText}, function() {

//   });
//   chrome.runtime.sendMessage({
//     action: "newTextSelected",
//     text: info.selectionText
//   });
  
//   }

//   }
// });

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'captureSnippet') {
    const selectedText = info.selectionText;
    if (selectedText) {
      chrome.storage.local.set({textSelected: selectedText}, () => {
        chrome.runtime.sendMessage({
          action: "newTextSelected",
          text: selectedText
        });
      }); 
    }
  }
});
