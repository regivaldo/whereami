chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
	if (!tab.url) return undefined;
	if (tab.url?.startsWith("chrome://")) return undefined;

	if (changeInfo.status == "complete" && tab.active) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			files: ["src/js/whereami.js"],
		});
	}
});
