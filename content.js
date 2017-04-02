function getChats() {
    var parent = document.querySelector('ul[aria-label="Conversation List"]');
    return [].slice.call(parent.children);
}

function getCurrentIndex() {
    selected = document.querySelector('ul[aria-label="Conversation List"] > li[aria-relevant="additions text"]._1ht2')
    return getChats().indexOf(selected)
}

function clickChat(index) {
	var selector = 'ul[aria-label="Conversation List"] > li:nth-child(' + (index + 1) + ') a';
    var next = document.querySelector(selector)
    next.click();
}

function nextChat() {
    var index = getCurrentIndex();
    if (index != 0) {
    	clickChat(index - 1);
    }
}

function previousChat() {
	var items = getChats();
    var index = getCurrentIndex();
	if (index != items.length - 1 ) {
		clickChat(index + 1);
	}
}

function toggleFriendList() {
	document.querySelector('._1enh').classList.toggle('hide-friend-list');
}

var commands = {
    "next-chat": nextChat,
    "previous-chat": previousChat,
    "toggle-friend-list": toggleFriendList
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    commands[message.command]();
});
