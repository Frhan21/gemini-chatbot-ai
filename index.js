// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const express = require("express");

require("dotenv").config();

const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
  },
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Route api/chat
app.post("/api/chat", async (req, res) => {
  const { userMessage } = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message required!" });
  }

  try {
    const result = await model.generateContent(userMessage);
    // console.log(result.response.text());
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini Chatbot running on http://localhost:${PORT}`);
});
