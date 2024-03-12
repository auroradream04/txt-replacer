"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var key_json_1 = __importDefault(require("../keys/key.json"));
var iconv_lite_1 = __importDefault(require("iconv-lite"));
var articlesDir = './articles';
var outDir = './out';
var files = fs_1.default.readdirSync(articlesDir);
files.forEach(function (file) {
    var articlePath = path_1.default.join(articlesDir, file);
    var rawArticle = fs_1.default.readFileSync(articlePath, 'binary');
    var article = iconv_lite_1.default.decode(Buffer.from(rawArticle, 'binary'), 'GB18030');
    var modifiedArticle = replaceKeysWithValues(article, key_json_1.default);
    var outputPath = path_1.default.join(outDir, file);
    fs_1.default.writeFileSync(outputPath, modifiedArticle);
});
function replaceKeysWithValues(text, keys) {
    var result = text;
    for (var _i = 0, _a = Object.entries(keys); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var regex = new RegExp(key, 'gi');
        result = result.replace(regex, value);
    }
    return result;
}
