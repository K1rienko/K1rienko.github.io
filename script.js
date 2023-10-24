// --------------------------- POPUP --------------------------------
function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function hidePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

// --------------------------- CHATBUTTON --------------------------------

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Send the message to the server
    sendMessageToServer(userMessage);
}

const sendMessageToServer = (message) => {
    // Using XMLHttpRequest to send a POST request to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "chat.php", true);

    // Set the Content-Type header for the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Define what happens on successful data submission
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            console.log(xhr.responseText);
        }
    };

    // Define what happens in case of an error
    xhr.onerror = function() {
        console.error("Error sending request.");
    };

    // Send the request
    xhr.send(`text=${encodeURIComponent(message)}`);
}

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey ) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// ------------------------------------------------------------------

// document.addEventListener("DOMContentLoaded", function() {
//     var form = document.getElementById("contactForm");
//     var textarea = document.getElementById("text");
  
//     form.addEventListener("submit", function(event) {
//       event.preventDefault();
  
//       var formData = new FormData(form);
//       var xhr = new XMLHttpRequest();
//       xhr.open("POST", form.action, true);
  
//       xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 400) {
//           console.log(xhr.responseText);
//           displayOutgoingMessage(formData.get('text')); // Display outgoing message
//           form.reset(); // Clear the form
//         }
//       };
  
//       xhr.onerror = function() {
//         console.error("Error sending request.");
//       };
  
//       xhr.send(formData);
//     });
  
//     textarea.addEventListener("keydown", function(event) {
//       if (event.key === "Enter" && !event.shiftKey) {
//         event.preventDefault();
//         form.dispatchEvent(new Event("submit"));
//       }
//     });

//     function displayOutgoingMessage(text) {
//       var chatbox = document.querySelector('.chatbox');
//       var outgoingMessage = `
//         <li class="chat outgoing">
//           <p>${text}</p>
//         </li>
//       `;
//       chatbox.insertAdjacentHTML('beforeend', outgoingMessage);
//     }
//   });