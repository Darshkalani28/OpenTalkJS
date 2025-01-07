# JavaScript-Based Personal LLM: Setup Guide

## Overview
This guide provides step-by-step instructions for setting up and running a JavaScript-based personal LLM (Large Language Model). Follow the steps below to ensure a smooth installation and execution process.

---

## Prerequisites
Before proceeding, ensure you have the following installed on your system:
- **Node.js** and **npm** (Node Package Manager)  
  Verify their presence using:
  ```bash
  node -v   # Displays Node.js version
  npm -v    # Displays npm version
  ```
  If not installed, download them from the [Node.js official website](https://nodejs.org).

---

## 1. Clone the Repository
1. Open your terminal.
2. Navigate to the directory where you want to clone the repository:
   ```bash
   cd C:/WDF/Full_Stack_Bootcamp/
   ```
3. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/HardeepIjardar/GenAI.git
   ```
4. Navigate into the project directory:
   ```bash
   cd OpenTalkJS
   ```

---

## 2. Install Dependencies
To prepare the project for execution, install the required dependencies:

1. Ensure you are in the project directory. Run:
   ```bash
   npm install
   ```
   This installs all dependencies listed in the `package.json` file.

2. Install the `ollama` package specifically:
   ```bash
   npm install ollama
   ```

3. Verify the `ollama` installation:
   ```bash
   ollama --version
   ```

---

## 3. Run the Application
To execute the application:

### 3.1 Create a Script File
1. Create a new JavaScript file named `script.js` in the project directory.

---

### 3.2 Execute the Script
1. Run the script using Node.js:
   ```bash
   node script.js
   ```

2. Monitor the terminal for output. If the setup is correct, you will see the chatbot's response or any relevant error messages.

---

## Troubleshooting
- Ensure Node.js and npm versions are compatible with the project requirements.
- Verify that all dependencies, including `ollama`, are correctly installed.
- Double-check the script file for syntax errors or typos.

---

By following these steps, you should successfully set up and run the JavaScript-based personal LLM. For further assistance, consult the project's [GitHub repository](https://github.com/HardeepIjardar/GenAI).