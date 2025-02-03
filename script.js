const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");
var replies = ["Alright", "Nice.", "Got it!", "Okay!", "Sure.", "Very nice."];
var replyidx = 0;
Notification.requestPermission();

// Sending message
sendButton.addEventListener("click", function () {
  const messageText = messageInput.value.trim();
  if (messageText !== "") {
    sendMessage(messageText, "sent");
    messageInput.value = ""; // Clear input after sending
  }
});

// Send message on Enter key press
messageInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      sendMessage(messageText, "sent");
      messageInput.value = ""; // Clear input after sending
    }
  }
});

// Display sent message
function sendMessage(message, type) {
  sendButton.style.scale = "1.4";
  setTimeout(() => {
    sendButton.style.scale = "1";
  }, 200);

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  const messageText = document.createElement("div");
  messageText.classList.add("text");
  messageText.textContent = message;

  messageDiv.appendChild(messageText);
  chatBox.appendChild(messageDiv);

  messageDiv.style.animation = "send .4s";

  messageInput.focus();

  // Simulate a reply
  if (type === "sent") {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      receiveMessage(replies[replyidx]);
      replyidx++;
    })();
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Display received message
function receiveMessage(message) {
  var notifi = new Notification("New message", {
    body: message,
  });

  notifi.onclick = function () {
    window.focus();
  };
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "received");

  const messageText = document.createElement("div");
  messageText.classList.add("text");
  messageText.textContent = message;

  messageDiv.appendChild(messageText);
  chatBox.appendChild(messageDiv);

  messageDiv.style.animation = "receive .4s";

  chatBox.scrollTop = chatBox.scrollHeight;
}
