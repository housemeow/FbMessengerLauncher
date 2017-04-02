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

chrome.commands.getAll(function(commands) {
    console.log('commands', commands);
});

chrome.commands.onCommand.addListener(function(command) {
    console.log('backgrond sending event', command)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,
            { command: command }, function(response) {
            });  
    });
});

startExtension();
