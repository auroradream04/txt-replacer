"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var iconv_lite_1 = __importDefault(require("iconv-lite"));
var readline_1 = __importDefault(require("readline"));
var themes_1 = require("./themes");
var contentGenerated = 10;
var contentSectionLimit = 5;
var articlesDir = './articles';
var outDir = './out';
var htmlOutDir = './htmlOut';
var configDir = './config';
var files = fs_1.default.readdirSync(articlesDir);
var keys = JSON.parse(fs_1.default.readFileSync('./config/keys.json', 'utf8'));
var titleKeys = fs_1.default.readFileSync('./config/titleKeys.txt').toString().split("\r\n");
var header = fs_1.default.readFileSync('./config/headers.txt').toString().split("\r\n");
var footer = fs_1.default.readFileSync('./config/footers.txt').toString().split("\r\n");
var themes = ["1. Theme 1 (Paripesax)"];
console.log(titleKeys);
function ReplaceFiles(isPrefix, isModifyContent, isSaveHTML) {
    var _this = this;
    var htmlContent = "";
    files.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
        var articlePath, rawArticle, article, modifiedArticle, outputPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    articlePath = path_1.default.join(articlesDir, file);
                    rawArticle = fs_1.default.readFileSync(articlePath, 'binary');
                    article = iconv_lite_1.default.decode(Buffer.from(rawArticle, 'binary'), 'GB18030');
                    modifiedArticle = replaceKeysWithValues(article, keys);
                    if (isSaveHTML) {
                        htmlContent += modifiedArticle;
                    }
                    if (!isModifyContent) return [3 /*break*/, 2];
                    return [4 /*yield*/, modifyContent(modifiedArticle, isPrefix)];
                case 1:
                    modifiedArticle = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    modifiedArticle = [modifiedArticle];
                    _a.label = 3;
                case 3:
                    if (isPrefix) {
                        prefixKeyword(modifiedArticle, file, isModifyContent);
                    }
                    else {
                        outputPath = path_1.default.join(outDir, file);
                        fs_1.default.writeFileSync(outputPath, modifiedArticle[0]);
                        console.log("File replaced: " + file);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    if (isSaveHTML) {
        fs_1.default.writeFileSync(path_1.default.join(configDir, "htmlContent.txt"), htmlContent);
    }
}
function modifyContent(article, isPrefix) {
    return __awaiter(this, void 0, void 0, function () {
        var modifiedArticle, titleCount, i, headerDice, footerDice;
        return __generator(this, function (_a) {
            modifiedArticle = [];
            titleCount = isPrefix ? titleKeys.length : 1;
            for (i = 0; i < titleCount; i++) {
                headerDice = Math.floor(Math.random() * header.length);
                footerDice = Math.floor(Math.random() * footer.length);
                modifiedArticle.push(header[headerDice] + "\n" + article + "\n" + footer[footerDice]);
            }
            return [2 /*return*/, modifiedArticle];
        });
    });
}
function replaceKeysWithValues(text, keys) {
    var result = text;
    for (var _i = 0, _a = Object.entries(keys); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var regex = new RegExp(key, 'gi');
        result = result.replace(regex, value);
    }
    return result;
}
function prefixKeyword(modifiedArticle, file, isModifyContent) {
    return __awaiter(this, void 0, void 0, function () {
        var len, _loop_1, i, _loop_2, _i, titleKeys_1, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isModifyContent) return [3 /*break*/, 5];
                    len = modifiedArticle.length;
                    _loop_1 = function (i) {
                        var outputPath;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    outputPath = path_1.default.join(outDir, titleKeys[i] + file);
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            fs_1.default.writeFile(outputPath, modifiedArticle[i], function (err) {
                                                if (err) {
                                                    reject(err);
                                                }
                                                else {
                                                    console.log("File replaced ".concat(titleKeys[i] + file));
                                                    resolve(null);
                                                }
                                            });
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 9];
                case 5:
                    _loop_2 = function (key) {
                        var outputPath;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    outputPath = path_1.default.join(outDir, key + file);
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            fs_1.default.writeFile(outputPath, modifiedArticle[0], function (err) {
                                                if (err) {
                                                    reject(err);
                                                }
                                                else {
                                                    console.log("File replaced ".concat(key + file));
                                                    resolve(null);
                                                }
                                            });
                                        })];
                                case 1:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, titleKeys_1 = titleKeys;
                    _a.label = 6;
                case 6:
                    if (!(_i < titleKeys_1.length)) return [3 /*break*/, 9];
                    key = titleKeys_1[_i];
                    return [5 /*yield**/, _loop_2(key)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function createArticle(articles, arrLen, title, contentSectionLimit, theme) {
    var content = "";
    for (var i = 0; i < contentSectionLimit; i++) {
        var index = Math.floor(Math.random() * arrLen);
        content += "<p>".concat(articles[index], "</p><br>");
    }
    var article = "";
    if (theme === 1) {
        article = (0, themes_1.theme1)(title, content);
    }
    return article;
}
function createHTMLContent(contentGenerated, contentSectionLimit, theme, domain, useTitle, startFrom) {
    if (startFrom === void 0) { startFrom = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var contentArr, titleArr, arrLen, titleLen, sitemap, sitemapIndex, i, title, formattedTitle, newArticle, outputPath, sitemapPath;
        return __generator(this, function (_a) {
            console.log("HTML Content Replacement");
            contentArr = fs_1.default.readFileSync('./config/htmlContent.txt')
                .toString()
                .split(/\r?\n/)
                .filter(function (line) { return line.trim() !== ''; });
            console.log(contentArr);
            titleArr = fs_1.default.readFileSync('./config/htmlTitle.txt')
                .toString()
                .split(/\r?\n/)
                .filter(function (line) { return line.trim() !== ''; });
            arrLen = contentArr.length;
            titleLen = titleArr.length;
            sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
            sitemapIndex = 0;
            for (i = 0; i < contentGenerated; i++) {
                title = void 0;
                formattedTitle = void 0;
                if (useTitle) {
                    title = titleArr[Math.floor(Math.random() * titleLen)];
                    formattedTitle = title.replace(/ /g, "-").toLowerCase() + i;
                }
                else {
                    title = (startFrom + i).toString();
                    formattedTitle = (startFrom + i).toString();
                }
                newArticle = createArticle(contentArr, arrLen, title, contentSectionLimit, theme);
                outputPath = path_1.default.join(htmlOutDir, formattedTitle + ".html");
                fs_1.default.writeFileSync(outputPath, newArticle);
                sitemap += "<url><loc>https://".concat(domain, "/").concat(formattedTitle, ".html</loc><priority>0.8</priority></url>\n");
                console.log("File replaced: " + formattedTitle + ".html");
                if (i % 29999 === 0 && i !== 0 || i === contentGenerated - 1) {
                    sitemapIndex++;
                    sitemap += "</urlset>";
                    sitemapPath = sitemapIndex > 1 ? path_1.default.join(htmlOutDir, "sitemap".concat(sitemapIndex, ".xml")) : path_1.default.join(htmlOutDir, "sitemap.xml");
                    fs_1.default.writeFileSync(sitemapPath, sitemap);
                    sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
                }
            }
            return [2 /*return*/];
        });
    });
}
// Keep the process alive by creating a readline interface
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Ask for input from the user
var isDone = false;
console.log("Welcome to txt-replacer tool!");
console.log("This tool will replace all the keys in the articles with the values from the keys.json file.");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var answer, tempContentGenerated, _a, tempContentSectionLimit, _b, domain, theme, _c, useTitleQuestion, useTitle, startFromQuestion, _d, startFrom;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!!isDone) return [3 /*break*/, 14];
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("1. Replace keys in the articles");
                    console.log("2. Replace keys in the articles and save HTML content");
                    console.log("3. Replace keys in the articles and prefix keywords to the title");
                    console.log("4. Replace keys in the articles, prefix keywords to the title, and randomize content");
                    console.log("5. Create HTML Content and sitemap");
                    console.log("6. Exit");
                    return [4 /*yield*/, askQuestion('Command: ')];
                case 1:
                    answer = _e.sent();
                    if (!(answer === "1")) return [3 /*break*/, 2];
                    ReplaceFiles();
                    return [3 /*break*/, 13];
                case 2:
                    if (!(answer === "2")) return [3 /*break*/, 3];
                    ReplaceFiles(false, false, true);
                    return [3 /*break*/, 13];
                case 3:
                    if (!(answer === "3")) return [3 /*break*/, 4];
                    ReplaceFiles(true);
                    return [3 /*break*/, 13];
                case 4:
                    if (!(answer === "4")) return [3 /*break*/, 5];
                    ReplaceFiles(true, true);
                    return [3 /*break*/, 13];
                case 5:
                    if (!(answer === "5")) return [3 /*break*/, 12];
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("How many HTML files do you want to generate?");
                    _a = parseInt;
                    return [4 /*yield*/, askQuestion('Number of files: ')];
                case 6:
                    tempContentGenerated = _a.apply(void 0, [_e.sent()]);
                    console.log("How many content sections do you want to generate for each HTML file?");
                    _b = parseInt;
                    return [4 /*yield*/, askQuestion('Number of content sections: ')];
                case 7:
                    tempContentSectionLimit = _b.apply(void 0, [_e.sent()]);
                    console.log("What is your domain name?");
                    return [4 /*yield*/, askQuestion('Domain: ')];
                case 8:
                    domain = _e.sent();
                    console.log("What theme do you want to use?");
                    themes.forEach(function (theme) { return console.log(theme); });
                    _c = parseInt;
                    return [4 /*yield*/, askQuestion('Theme: ')];
                case 9:
                    theme = _c.apply(void 0, [_e.sent()]);
                    console.log("Do you want to use the title keys?");
                    return [4 /*yield*/, askQuestion('Use title keys? (y/n): ')];
                case 10:
                    useTitleQuestion = _e.sent();
                    useTitle = useTitleQuestion.toLocaleLowerCase() === "y" ? true : false;
                    console.log("Do you want to start from a specific number? (Default is 1)");
                    _d = parseInt;
                    return [4 /*yield*/, askQuestion('Start from: ')];
                case 11:
                    startFromQuestion = _d.apply(void 0, [_e.sent()]);
                    startFrom = startFromQuestion > 0 ? startFromQuestion : 1;
                    if (tempContentGenerated > 0 && typeof (tempContentGenerated) === 'number') {
                        contentGenerated = tempContentGenerated;
                    }
                    else {
                        console.log("Invalid input for number of files. Defaulting to 10.");
                    }
                    if (tempContentSectionLimit > 0 && typeof (tempContentSectionLimit) === 'number') {
                        contentSectionLimit = tempContentSectionLimit;
                    }
                    else {
                        console.log("Invalid input for number of content sections. Defaulting to 5.");
                    }
                    createHTMLContent(contentGenerated, contentSectionLimit, theme, domain, useTitle, startFrom);
                    return [3 /*break*/, 13];
                case 12:
                    isDone = true;
                    rl.close();
                    _e.label = 13;
                case 13: return [3 /*break*/, 0];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function askQuestion(question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            resolve(answer);
        });
    });
}
main();
