import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("ai-input");
const sendBtn = document.getElementById("send-btn");

let history = [];

function addMessage(message, sender) {

    const bubble = document.createElement("div");

    bubble.className = `message ${sender}-message`;

    bubble.textContent = message;

    chatBox.appendChild(bubble);

    chatBox.scrollTop = chatBox.scrollHeight;

}

async function sendMessage() {

    const prompt = input.value.trim();

    if (!prompt) return;

    addMessage(prompt, "user");

    input.value = "";

    try {

        const response = await ai.models.generateContent({

    model: "gemini-2.5-flash",

    contents: `
You are the AI assistant of Morse Studio.

Rules:
- Answer only questions related to Morse Code, telegraphy, communication history and learning Morse.
- Keep every answer under 3 short sentences.
- Be friendly and easy for beginners.
- Don't use markdown.
- Don't use bullet points unless specifically asked.
- If the question is unrelated to Morse Code, politely say that you specialize in Morse Studio topics.

User Question:
${prompt}
`

});

        addMessage(response.text, "bot");

    }

    catch (error) {

        console.error(error);

        addMessage("Something went wrong.", "bot");

    }

}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();

    }

});