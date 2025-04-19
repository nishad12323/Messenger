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
  if (event.key === "Enter" && event.shiftKey) {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      sendMessage(messageText, "sent");
      messageInput.value = ""; // Clear input after sending
    }
  }
});

// Show Emoji Picker

document.getElementById("emojiButton").addEventListener("click", function () {
  document.getElementsByTagName("emoji-picker")[0].classList.toggle("hidden");
});

document
  .querySelector("emoji-picker")
  .addEventListener("emoji-click", (event) => {
    messageInput.value += event.detail.unicode;
    messageInput.focus();
  });

// Make Emoji Picker draggable

const emojiPicker = document.querySelector("emoji-picker");

let isDragging = false;
let offsetX, offsetY;

emojiPicker.addEventListener("mousedown", (event) => {
  isDragging = true;
  offsetX = emojiPicker.getBoundingClientRect().right - event.clientX;
  offsetY = emojiPicker.getBoundingClientRect().bottom - event.clientY;
  emojiPicker.style.position = "fixed"; // Ensure it's positioned relative to the viewport
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const right = window.innerWidth - event.clientX - offsetX;
    const bottom = window.innerHeight - event.clientY - offsetY;

    emojiPicker.style.right = `${right}px`;
    emojiPicker.style.bottom = `${bottom}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Set position on double-click
emojiPicker.addEventListener("dblclick", () => {
  emojiPicker.style.right = "25px";
  emojiPicker.style.bottom = "120.375px";
});

// Close Emoji Picker on outside click
document.addEventListener("mousedown", (event) => {
  setTimeout(() => {
    if (
      !emojiPicker.contains(event.target) &&
      event.target.id !== "emojiButton"
    ) {
      emojiPicker.classList.add("hidden");
    }
  }, 50);
});

// Close Emoji Picker on Escape key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    emojiPicker.classList.add("hidden");
  }
});

// Close Emoji Picker on Enter key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    emojiPicker.classList.add("hidden");
  }
});

// Add close button to Emoji Picker::after
const emojiPickerHeader = document.querySelector(".emojiPickerHeader");
const emojiPickerCloseButton = document.createElement("button");
emojiPickerCloseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
emojiPickerCloseButton.classList.add("close-button");
emojiPickerHeader.appendChild(emojiPickerCloseButton);
emojiPickerCloseButton.addEventListener("click", () => {
  emojiPicker.classList.add("hidden");
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
