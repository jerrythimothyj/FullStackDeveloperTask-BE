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
        while (_) try {
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
var express = require("express");
var axios_1 = __importDefault(require("axios"));
var _a = require('express-validator'), query = _a.query, validationResult = _a.validationResult, checkSchema = _a.checkSchema;
// Create a new express app instance
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/api/search', [
    checkSchema({
        text: {
            isLength: {
                errorMessage: 'Search text should be 3 or more characters',
                options: { min: 3 }
            }
        },
        type: {
            matches: {
                errorMessage: 'Search type should be either users, repositories or issues',
                options: [/\b(?:users|repositories|issues)\b/],
            }
        }
    })
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, text, type, usersRes, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.query, text = _a.text, type = _a.type;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get("https://api.github.com/search/" + type + "?q=" + text, { headers: { Authorization: "token 8db0c1b68f1198949a7dfafd7b2dbd110a721e29" } })];
            case 2:
                usersRes = _b.sent();
                return [2 /*return*/, res.send(usersRes.data)];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.send(err_1)];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(4000, function () {
    console.log('App is listening on port 4000!');
});
