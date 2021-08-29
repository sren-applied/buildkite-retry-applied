chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
	  // allow on all websites
      //pageUrl: { hostEquals: 'www.buildkite.com', schemes: ['https', 'http'] },
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

chrome.contextMenus.create({
 id: 'copy_report',
 title: "Copy report with error",
 contexts:["selection"],  // ContextType
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
  chrome.tabs.executeScript(tab.id, {file: "js/copy_report.js"})
});
