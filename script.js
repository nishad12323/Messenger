const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");
var replies = ["Alright", "Nice.", "Got it!", "Okay!", "Sure.", "Very nice."];
var replyidx = 0;
Notification.requestPermission();

document.querySelectorAll(".contact").forEach((contact) => {
  contact.addEventListener("click", function () {
    //   document.querySelector(".active").classList.remove("active");
    //   contact.classList.add("active");
    //   document.getElementById("contactName").textContent =
    //     contact.querySelector(".name").textContent;
    //   document.getElementById("contactStatus").textContent =
    //     contact.querySelector(".status").textContent;
    //   document.getElementById("contactImage").src =
    //     contact.querySelector(".image").src;
    //   document.getElementById("contactImage").alt =
    //     contact.querySelector(".name").textContent;
    //   document.getElementById("messageInput").focus();
    document.getElementsByClassName("chat-area")[0].style.display = "flex";
    if (window.innerWidth < 768) {
      document.getElementsByClassName("sidebar")[0].style.display = "none";
    }
  });
});

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
  console.log(chatBox.scrollTop + chatBox.clientHeight, chatBox.scrollHeight);

  sendButton.style.scale = "1.4";
  setTimeout(() => {
    sendButton.style.scale = "1";
  }, 200);

  var atBottom =
    chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight ||
    chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 3;

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  const messageText = document.createElement("div");
  messageText.classList.add("text");
  messageText.textContent = message;

  messageDiv.appendChild(messageText);
  chatBox.appendChild(messageDiv);

  messageText.style.animation = "send .4s";

  messageInput.focus();

  // Simulate a reply
  if (type === "sent") {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      receiveMessage(replies[replyidx]);
      replyidx++;
    })();
  }

  if (atBottom) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Display received message
function receiveMessage(message) {
  var notifi = new Notification("New message", {
    body: message,
  });

  var atBottom =
    chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight ||
    chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 3;

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

  messageText.style.animation = "receive .4s";

  if (atBottom) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
