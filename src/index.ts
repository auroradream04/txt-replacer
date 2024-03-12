import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';
import readline from 'readline';

const articlesDir = './articles';
const outDir = './out';
const files = fs.readdirSync(articlesDir);
const keys = JSON.parse(fs.readFileSync('./keys/key.json', 'utf8'));

function ReplaceFiles() {
    files.forEach((file) => {
        const articlePath = path.join(articlesDir, file);
        const rawArticle = fs.readFileSync(articlePath, 'binary');
        const article = iconv.decode(Buffer.from(rawArticle, 'binary'), 'GB18030');

        const modifiedArticle = replaceKeysWithValues(article, keys);

        const outputPath = path.join(outDir, file);
        fs.writeFileSync(outputPath, modifiedArticle);
        console.log("File replaced: " + file)
    })
}

function replaceKeysWithValues(text: any, keys: any) {
    let result = text;
    for (const [key, value] of Object.entries(keys)) {
        const regex = new RegExp(key, 'gi');
        result = result.replace(regex, value);
    }
    return result;
}

// Keep the process alive by creating a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Ask for input from the user
let isDone: boolean = false;

console.log("Welcome to txt-replacer tool!");
console.log("This tool will replace all the keys in the articles with the values from the keys.json file.");

async function main() {
    while (!isDone) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("1. Replace keys in the articles");
        console.log("2. Exit");

        const answer = await askQuestion('Command: ');

        if (answer === "1") {
            ReplaceFiles();
        } else if (answer === "2") {
            isDone = true;
            rl.close();
        }
    }
}

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

main();