import fs from 'fs';

const keys = {
    "Hello": "Hi",
    "Up": "Down",
    "Big": "Small",
};

const article = fs.readFileSync('./articles/1.txt', 'utf-8');

function replaceKeysWithValues(text:any, keys:any) {
    let result = text;
    for (const [key, value] of Object.entries(keys)) {
        const regex = new RegExp(key, 'gi');
        result = result.replace(regex, value);
    }
    return result;
}

const modifiedArticle = replaceKeysWithValues(article, keys);

fs.writeFileSync('./out/1.txt', modifiedArticle);
