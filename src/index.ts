import fs from 'fs';
import path from 'path';
import keys from "../keys/key.json";
console.log(keys)

const articlesDir = './articles';
const outDir = './out';
const files = fs.readdirSync(articlesDir);

files.forEach((file) => {
    const articlePath = path.join(articlesDir, file);
    const article = fs.readFileSync(articlePath, 'utf-8');

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
