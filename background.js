chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        code: `
            document.documentElement.contentEditable = 'true';
            tinymce.init({
                elements: "editableontent",
            });
        `
    });
});
