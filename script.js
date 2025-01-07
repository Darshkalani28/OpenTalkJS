const { default: ollama } = require("ollama"); // CJS

async function runChat() {
  try {
    const response = await ollama.chat({
      model: "llama3.2:3b ",
      messages: [{ role: "user", content: "Generate marketing email" }],
    });

    console.log("Chatbot Response:", response.message.content);
  } catch (error) {
    console.error("Error occurred:", error.message || error);
  }
}

runChat();