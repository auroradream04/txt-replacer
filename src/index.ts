import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';
import readline from 'readline';

const articlesDir = './articles';
const outDir = './out';
const files = fs.readdirSync(articlesDir);
const keys = JSON.parse(fs.readFileSync('./keywords/keys.json', 'utf8'));
const titleKeys = fs.readFileSync('./keywords/titleKeys.txt').toString().split("\r\n")


function ReplaceFiles(isPrefix?: boolean) {
    files.forEach((file) => {
        const articlePath = path.join(articlesDir, file);
        const rawArticle = fs.readFileSync(articlePath, 'binary');
        const article = iconv.decode(Buffer.from(rawArticle, 'binary'), 'GB18030');

        const modifiedArticle = replaceKeysWithValues(article, keys);

        if (isPrefix) {
            prefixKeyword(modifiedArticle, file)
        } else {
            const outputPath = path.join(outDir, file);
            fs.writeFileSync(outputPath, modifiedArticle);
            console.log("File replaced: " + file)
        }
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

async function prefixKeyword(modifiedArticle: string, file: string) {
    for (const key of titleKeys) {
        const outputPath = path.join(outDir, key + file);

        await new Promise((resolve, reject) => {
            fs.writeFile(outputPath, modifiedArticle, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`File replaced ${key + file}`);
                    resolve(null);
                }
            });
        });
    }
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
        console.log("2. Replace keys in the articles and prefix keywords to the title")
        console.log("3. Exit");

        const answer = await askQuestion('Command: ');

        if (answer === "1") {
            ReplaceFiles();
        } else if (answer === "2") {
            ReplaceFiles(true)
        } else if (answer === "3") {
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