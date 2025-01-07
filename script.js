
const { default: ollama } = require("ollama");
const fs = require("fs");

async function runChat() {
  try {
    const inputFilePath = "q.txt"
    const inputContent = fs.readFileSync(inputFilePath, "utf-8")

    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: inputContent }]
    })

    const chatbotResponse = response.message.content

    const outputFilePath = "a.txt"
    fs.writeFileSync(outputFilePath, chatbotResponse, "utf-8")

    console.log("Chatbot response has been saved to a.txt.")
  } catch (error) {
    console.error("Error occurred:", error.message)
  }
}

runChat()