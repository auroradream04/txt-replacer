import fs, { readFileSync } from 'fs';
import path from 'path';
import iconv from 'iconv-lite';
import readline from 'readline';
import { theme1 } from './themes';

let contentGenerated = 10;
let contentSectionLimit = 5;
const articlesDir = './articles';
const outDir = './out';
const htmlOutDir = './htmlOut';
const configDir = './config';
const files = fs.readdirSync(articlesDir);
const keys = JSON.parse(fs.readFileSync('./config/keys.json', 'utf8'));
const titleKeys = fs.readFileSync('./config/titleKeys.txt').toString().split("\r\n")
const header = fs.readFileSync('./config/headers.txt').toString().split("\r\n")
const footer = fs.readFileSync('./config/footers.txt').toString().split("\r\n")
const themes = ["1. Theme 1 (Paripesax)"]


console.log(titleKeys)


function ReplaceFiles(isPrefix?: boolean, isModifyContent?: boolean, isSaveHTML?: boolean) {
    let htmlContent = "";
    files.forEach(async (file) => {
        const articlePath = path.join(articlesDir, file);
        const rawArticle = fs.readFileSync(articlePath, 'binary');
        const article = iconv.decode(Buffer.from(rawArticle, 'binary'), 'GB18030');
        let modifiedArticle;

        modifiedArticle = replaceKeysWithValues(article, keys);

        if (isSaveHTML) {
            htmlContent += modifiedArticle;
        }

        if (isModifyContent) {
            modifiedArticle = await modifyContent(modifiedArticle, isPrefix);
        } else {
            modifiedArticle = [modifiedArticle];
        }

        if (isPrefix) {
            prefixKeyword(modifiedArticle, file, isModifyContent)
        } else {
            const outputPath = path.join(outDir, file);
            fs.writeFileSync(outputPath, modifiedArticle[0]);
            console.log("File replaced: " + file)
        }
    })

    if (isSaveHTML) {
        fs.writeFileSync(path.join(configDir, "htmlContent.txt"), htmlContent);
    }
}

async function modifyContent(article: string, isPrefix?: boolean): Promise<string[]> {
    let modifiedArticle = [];
    let titleCount = isPrefix ? titleKeys.length : 1;

    for (let i = 0; i < titleCount; i++) {
        let headerDice = Math.floor(Math.random() * header.length);
        let footerDice = Math.floor(Math.random() * footer.length);
        modifiedArticle.push(header[headerDice] + "\n" + article + "\n" + footer[footerDice])
    }

    return modifiedArticle
}

function replaceKeysWithValues(text: any, keys: any) {
    let result = text;
    for (const [key, value] of Object.entries(keys)) {
        const regex = new RegExp(key, 'gi');
        result = result.replace(regex, value);
    }
    return result;
}

async function prefixKeyword(modifiedArticle: string[], file: string, isModifyContent?: boolean) {
    if (isModifyContent) {
        let len = modifiedArticle.length;
        for (let i = 0; i < len; i++) {
            const outputPath = path.join(outDir, titleKeys[i] + file);

            await new Promise((resolve, reject) => {
                fs.writeFile(outputPath, modifiedArticle[i], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`File replaced ${titleKeys[i] + file}`);
                        resolve(null);
                    }
                });
            });
        }
    }
    else {
        for (const key of titleKeys) {
            const outputPath = path.join(outDir, key + file);

            await new Promise((resolve, reject) => {
                fs.writeFile(outputPath, modifiedArticle[0], (err) => {
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
}

function createArticle(articles: string[], arrLen: number, title: string, contentSectionLimit: number, theme: number) {
    let content = "";

    for (let i = 0; i < contentSectionLimit; i++) {
        let index = Math.floor(Math.random() * arrLen);
        content += `<p>${articles[index]}</p><br>`;
    }

    let article = "";

    if (theme === 1) {
        article = theme1(title, content)
    }

    return article;
}

async function createHTMLContent(contentGenerated: number, contentSectionLimit: number, theme: number, domain: string) {
    console.log("HTML Content Replacement")
    //const contentStr = readFileSync('./config/htmlContent.json').toString()
    //const contentArr = JSON.parse(contentStr);
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    const contentArr = fs.readFileSync('./config/htmlContent.txt')
        .toString()
        .split(/\r?\n/)
        .filter(line => line.trim() !== '');
    console.log(contentArr)
    //const titleStr = readFileSync('./config/htmlTitle.json').toString()
    //const titleArr = JSON.parse(titleStr);
    const titleArr = fs.readFileSync('./config/htmlTitle.txt')
        .toString()
        .split(/\r?\n/)
        .filter(line => line.trim() !== '');
    const arrLen = contentArr.length;
    const titleLen = titleArr.length;

    for (let i = 0; i < contentGenerated; i++) {
        const titleIndex = Math.floor(Math.random() * titleLen);
        const newArticle = createArticle(contentArr, arrLen, titleArr[titleIndex], contentSectionLimit, theme);
        const outputPath = path.join(htmlOutDir, titleArr[titleIndex] + i + ".html");
        fs.writeFileSync(outputPath, newArticle);
        sitemap += `<url><loc>https://${domain}/${titleArr[titleIndex] + i}.html</loc><priority>0.8</priority></url>\n`
        console.log("File replaced: " + titleArr[titleIndex] + i + ".html")
    }
    sitemap += `</urlset>`
    fs.writeFileSync(path.join(htmlOutDir, "sitemap.xml"), sitemap);
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
        console.log("2. Replace keys in the articles and save HTML content");
        console.log("3. Replace keys in the articles and prefix keywords to the title");
        console.log("4. Replace keys in the articles, prefix keywords to the title, and randomize content")
        console.log("5. Create HTML Content and sitemap")
        console.log("6. Exit");

        const answer = await askQuestion('Command: ');

        if (answer === "1") {
            ReplaceFiles();
        } else if (answer === "2") {
            ReplaceFiles(false, false, true);
        } else if (answer === "3") {
            ReplaceFiles(true);
        } else if (answer === "4") {
            ReplaceFiles(true, true);
        } else if (answer === "5") {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("How many HTML files do you want to generate?");
            const tempContentGenerated = parseInt(await askQuestion('Number of files: '));
            console.log("How many content sections do you want to generate for each HTML file?");
            const tempContentSectionLimit = parseInt(await askQuestion('Number of content sections: '));
            console.log("What is your domain name?")
            const domain = await askQuestion('Domain: ');
            console.log("What theme do you want to use?");
            themes.forEach((theme) => console.log(theme));
            const theme = parseInt(await askQuestion('Theme: '));

            if (tempContentGenerated > 0 && typeof (tempContentGenerated) === 'number') {
                contentGenerated = tempContentGenerated;
            } else {
                console.log("Invalid input for number of files. Defaulting to 10.");
            }

            if (tempContentSectionLimit > 0 && typeof (tempContentSectionLimit) === 'number') {
                contentSectionLimit = tempContentSectionLimit;
            } else {
                console.log("Invalid input for number of content sections. Defaulting to 5.");
            }

            createHTMLContent(contentGenerated, contentSectionLimit, theme, domain);
        } else {
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