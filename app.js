const { default: ollama } = require("ollama"); 
const fs = require("fs");
const path = require("path");


function askOllama(question) {
    return ollama.chat({
        model: 'llama3.2:3b',
        messages: [{ role: 'user', content: question }],
    })
    .then(response => response.message.content)
    .catch(error => {
        console.error('Error:', error)
        return null
    })
}

async function processBatchQuestions() {
    const questionsDir = './questions'
    const answersDir = './answers'

    if(!fs.existsSync(answersDir)){
        fs.mkdirSync(answersDir)
    }

    const files = fs.readdirSync(questionsDir).filter(file => file.startsWith('q') && file.endsWith('.txt')).sort()

    for ( const file of files){
        const number = file.match(/q(\d+)\.txt/)[1]

        const question = fs.readFileSync(path.join(questionsDir, file), 'utf-8')
        console.log(`Processing question ${number}...`)
        const answer = await askOllama(question)
        if (answer) {
            const answerFile = `a${number}.txt`
            fs.writeFileSync(path.join(answersDir, answerFile), answer)
            console.log(`Answer ${number} has been written to ${answerFile}`)
        }else{
            console.log(`Failed to get answer for question ${number}`)
        }
    }
}

processBatchQuestions().then(() => {
    console.log('Batch processing completed')
}).catch(error => {
    console.log('Batch processing failed:', error);
})