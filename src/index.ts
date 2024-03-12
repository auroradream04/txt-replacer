import fs from 'fs';
import path from 'path';
// import keys from "../keys/key.json";
import iconv from 'iconv-lite';

const articlesDir = './articles';
const outDir = './out';
const files = fs.readdirSync(articlesDir);
const keys = JSON.parse(fs.readFileSync('./keys/key.json', 'utf8'));
console.log(keys)

files.forEach((file) => {
    const articlePath = path.join(articlesDir, file);
    const rawArticle = fs.readFileSync(articlePath, 'binary');
    const article = iconv.decode(Buffer.from(rawArticle, 'binary'), 'GB18030');

    const modifiedArticle = replaceKeysWithValues(article, keys);

    const outputPath = path.join(outDir, file);
    fs.writeFileSync(outputPath, modifiedArticle);
});

function replaceKeysWithValues(text: any, keys: any) {
    let result = text;
    for (const [key, value] of Object.entries(keys)) {
        const regex = new RegExp(key, 'gi');
        result = result.replace(regex, value);
    }
    return result;
}