

function updateChatVisibility() {
    const chatBox = document.getElementById('chatroom-messages');
    if (chatBox.children.length === 0) {
        chatBox.classList.add('hidden');
    } else {
        chatBox.classList.remove('hidden');
    }
}
