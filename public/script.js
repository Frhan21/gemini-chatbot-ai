const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Append user message to chat box
  appendMessage('user', userMessage);
  input.value = ''; // Clear input field

  // Add "thinking" message placeholder
  const thinkingMessageElement = document.createElement('div');
  thinkingMessageElement.classList.add('message', 'bot', 'thinking'); // Add 'thinking' class
  thinkingMessageElement.innerHTML = `
    <span class="thinking-text">Gemini is thinking</span>
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  chatBox.appendChild(thinkingMessageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to show the thinking message

  // Send message to backend
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Ensure the body structure matches the backend expectation:
    // server.js expects req.body.message.userMessage
    body: JSON.stringify({ message: { userMessage: userMessage } }),
  })
  .then(response => {
    if (!response.ok) {
      // If HTTP status is not 2xx, try to parse error from server response
      return response.json()
        .then(errData => {
          // Use the error message from server if available, otherwise a generic one
          throw new Error(errData.error || `Server error: ${response.status} ${response.statusText}`);
        })
        .catch(() => {
          // Fallback if error response is not JSON or parsing fails
          throw new Error(`Server error: ${response.status} ${response.statusText}. Could not parse error response.`);
        });
    }
    return response.json(); // Parse successful JSON response
  })
  .then(data => {
    // Update the thinking message element with the bot's reply
    thinkingMessageElement.classList.remove('thinking'); // Remove 'thinking' class
    // Use marked.parse for the actual bot response (assuming AI sends Markdown)
    thinkingMessageElement.innerHTML = marked.parse(data.reply);
    // Scroll again in case the rendered content is much taller
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(error => {
    thinkingMessageElement.classList.remove('thinking'); // Remove 'thinking' class
    thinkingMessageElement.classList.add('error'); // Optional: for styling error messages
    console.error('Error:', error);
    // Update the thinking message element with the error message
    // Use textContent for error messages to avoid rendering potential error strings as HTML
    thinkingMessageElement.textContent = error.message || 'Error: Could not get a response.';
    // Scroll to show the error message
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});

// Simplified appendMessage - primarily for user messages or simple text bot messages
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  // Use textContent for safety and simplicity
  msg.textContent = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
