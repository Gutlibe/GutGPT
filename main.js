// Get the chat area, user input, send button, and description
const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const description = document.getElementById('description');

// Define the URL of the trained data JSON file
const trainedDataURL = 'trainedData.json';

// Define the URL of the error data JSON file
const errorDataURL = 'errorData.json';

// Load the trained data from the JSON file
async function loadTrainedData() {
  try {
    const response = await fetch(trainedDataURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading trained data:', error);
    return {};
  }
}

// Load the error data from the JSON file
async function loadErrorData() {
  try {
    const response = await fetch(errorDataURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading error data:', error);
    return [];
  }
}

// Add an event listener to the send button
sendButton.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  let botResponse = '';

  if (!userMessage) {
    return; // Exit the function if no text is typed
  }

  const lowerCaseMessage = userMessage.toLowerCase();

  const trainedData = await loadTrainedData();
  const errorData = await loadErrorData();

  if (trainedData[lowerCaseMessage]) {
    const responses = trainedData[lowerCaseMessage];
    const randomIndex = Math.floor(Math.random() * responses.length);
    botResponse = responses[randomIndex];
  } else {
    const operation = getOperationFromMessage(lowerCaseMessage);
    if (operation) {
      botResponse = performMathOperation(lowerCaseMessage, operation);
    } else {
      botResponse = errorData[Math.floor(Math.random() * errorData.length)];
    }
  }

  displayMessage(userMessage, 'user');
  await displayTypingAnimation('bot');
  displayBotMessage(botResponse);

  userInput.value = '';
  description.style.display = 'none';
});

// Define the function to display a user message
function displayMessage(message, sender) {
  const messageElement = createMessageElement(message, sender);
  chatArea.appendChild(messageElement);
  scrollToLatestMessage();
}

// Define the function to display a bot message with typewriter effect
async function displayBotMessage(message) {
  const messageElement = createMessageElement('', 'bot');
  chatArea.appendChild(messageElement);

  const typingDelay = 50; // Delay between each character being displayed

  for (let i = 0; i < message.length; i++) {
    await new Promise(resolve => setTimeout(resolve, typingDelay));
    messageElement.textContent += message[i];
    scrollToLatestMessage();
  }
}

// Create a message element with the specified content and sender
function createMessageElement(content, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);
  messageElement.textContent = content;
  return messageElement;
}

// Scroll the chat area to the latest message
function scrollToLatestMessage() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

const descriptionElement = document.getElementById('description');
const text =
  "Welcome to the GutGPT!\n\n" +
  "I am a friendly and intelligent AI-powered chatbot. I can assist you in various ways:\n\n" +
  "1. Answering Questions: Feel free to ask me anything, from general knowledge inquiries to specific topics.\n" +
  "2. Providing Information: I can provide details on a wide range of subjects, including news, weather, sports, and more.\n" +
  "3. Performing Calculations: Need help with math? I can assist you with basic and complex mathematical operations.\n" +
  "4. Engaging in Conversations: Let's have a chat! I can engage in conversations on various topics and keep you entertained.\n\n" +
  "Simply type your message below, and I'll do my best to assist you!";
const typingDelay = 50; // Delay between each character being displayed
const pauseDelay = 1000; // Pause after the complete message is displayed

function typeEffect() {
  let i = 0;
  const timer = setInterval(() => {
    descriptionElement.textContent = text.substring(0, i + 1);
    i++;
    if (i === text.length) {
      clearInterval(timer);
      setTimeout(() => {
        descriptionElement.textContent = '';
        typeEffect();
      }, pauseDelay);
    }
  }, typingDelay);
}

typeEffect();

// Define the function to display a typing animation
async function displayTypingAnimation(sender) {
  const typingElement = document.createElement('div');
  typingElement.classList.add('message', `${sender}-message`, 'typing-animation');
  typingElement.textContent = 'Typing...';

  chatArea.appendChild(typingElement);
  scrollToLatestMessage();

  // Wait for 1 second before removing the typing animation
  await new Promise(resolve => setTimeout(resolve, 1000));

  chatArea.removeChild(typingElement);
  scrollToLatestMessage();
}
