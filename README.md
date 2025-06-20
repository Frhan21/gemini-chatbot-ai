<p align="center">
  <img src="https://img.shields.io/badge/Express.js-Gemini_Chatbot-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Node.js-v18%2B-green?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
</p>

# 💬 Gemini Chatbot AI

A responsive and simple chatbot UI powered by Google Gemini, built using Node.js and Express. This project provides a minimal frontend served from Express and an API endpoint that interacts with Gemini for generating intelligent replies.

---

## 📚 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## ✨ Features

- 💡 AI-powered responses via Gemini API
- 🌐 Frontend UI with HTML, CSS, and JS
- ⚙️ Simple `/api/chat` route to handle messaging
- 🔒 API Key stored securely using `.env`

---

## 📁 Project Structure
```bash
gemini-chatbot-ai/
├── public/
│ ├── index.html
│ ├── script.js
│ └── css/
|     └── style.css
├── server.js
├── .env
└── package.json
```
---

## 🛠️ Installation

### Prerequisites

- Node.js v18+
- NPM or Yarn
- A valid [Gemini API key](https://aistudio.google.com/app/apikey)

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/Frhan21/gemini-chatbot-ai.git
cd gemini-chatbot-ai

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit `.env` and add your GEMINI_API_KEY

# 4. Start the server (development)
npx nodemon server.js
```
## 🚀 Usage
After starting the server, open your browser to: 
```bash
http://localhost:3000
```
You can interact with the chatbot using the web interface provided in `public/index.html`

## 📡 API Endpoint
| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| POST   | `/api/chat` | Sends a prompt to Gemini chatbot |


### Example Request 
```bash
POST /api/chat
Content-Type: application/json
{
  "message": {
    "userMessage": "TWhat's the weather like today?"
  }
}
```

### Example Response 
```json
{
  "reply" : "The weather today is sunny with a high of 27°C"
}
```

## 🔐 Environment Variables
Create a `.env` file with the following
```ini
GEMINI_API_KEY=your-gemini-api-key-here
```

## 📝 License
This project is open source and available under the [MIT License](https://chatgpt.com/g/g-DpRO2Y344-readme-builder/c/LICENSE).
Maintained with 💙 by Hacktiv.

## 🔖 Topics
chatbot, gemini-api, nodejs, expressjs, ai-chat, conversational-ai, javascript, web-app, hacktiv8, chatbot-ui, gemini-chatbot, google-gemini, node-api, express-backend, ai-response
