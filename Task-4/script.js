const fs = require("fs");
const path = require("path");
const { default: ollama } = require("ollama");

// Function to read questions from a directory
function readQuestionsFromDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    const questions = [];

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        if (fs.lstatSync(filePath).isFile() && file.endsWith(".txt")) {
            const content = fs.readFileSync(filePath, "utf-8");
            questions.push({
                question: file.replace(".txt", ""), // Use file name as question
                task: content,
            });
        }
    });

    return questions;
}

// Function to get chatbot response for a task
async function getChatbotResponse(taskContent) {
    try {
        const response = await ollama.chat({
            model: "llama3.2:3b",
            messages: [{ role: "user", content: taskContent }],
        });
        return response.message?.content || "No response";
    } catch (error) {
        console.error("Error getting chatbot response:", error.message);
        return "Error getting response";
    }
}

// Function to create output folder if it doesn't exist
function createOutputFolder(categoryName, outputFolderPath) {
    const categoryFolderPath = path.join(outputFolderPath, categoryName);
    if (!fs.existsSync(categoryFolderPath)) {
        fs.mkdirSync(categoryFolderPath, { recursive: true });
        console.log(`Created folder for ${categoryName} at ${categoryFolderPath}`);
    }
    return categoryFolderPath;
}

// Function to save each task response as a.txt file
async function saveResponseToFile(
    categoryName,
    responseIndex,
    responseContent,
    outputFolderPath
) {
    const categoryFolderPath = createOutputFolder(categoryName, outputFolderPath);
    const outputFilePath = path.join(
        categoryFolderPath,
        `o${responseIndex + 1}.txt`
    );
    try {
        fs.writeFileSync(outputFilePath, responseContent, "utf-8");
        console.log(`Saved response to ${outputFilePath}`);
    } catch (error) {
        console.error("Error saving response to file:", error.message);
    }
}

// Main function to run the chat processing
async function runChat() {
    try {
        const inputDirPath = "questions"; // Root directory for the categories (que/)
        const outputFolderPath = "answers"; // Directory for output
        const categoryType = process.argv[2];

        if (!categoryType) {
            console.error(
                "Please provide a category type as a command-line argument."
            );
            return;
        }

        // Read all categories in the "que" directory
        const categoryDirs = fs.readdirSync(inputDirPath);

        const filteredCategories = categoryDirs.filter(
            (dir) =>
                fs.lstatSync(path.join(inputDirPath, dir)).isDirectory() &&
                dir.toLowerCase() === categoryType.toLowerCase()
        );

        if (filteredCategories.length === 0) {
            console.error(`No categories found with type: ${categoryType}`);
            return;
        }

        for (const categoryName of filteredCategories) {
            const categoryPath = path.join(inputDirPath, categoryName);
            const questions = readQuestionsFromDirectory(categoryPath);

            for (let i = 0; i < questions.length; i++) {
                const response = await getChatbotResponse(questions[i].task);
                await saveResponseToFile(categoryName, i, response, outputFolderPath);
            }
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}

runChat();



