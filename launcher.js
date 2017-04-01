function registerBrowserAction(width, height) {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.windows.create({
            url: 'https://www.messenger.com/',
            type: 'popup',
            left: 0,
            top: 0,
            width: Math.floor(width / 3),
            height: height
        });
    });
}

function startExtension() {
    chrome.system.display.getInfo(function(displayInfo) {
        var screenWidth = displayInfo[0].workArea.width;
        var screenHeight = displayInfo[0].workArea.height;
        registerBrowserAction(screenWidth, screenHeight);
    })
}

startExtension();
