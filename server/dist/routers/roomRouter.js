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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
exports.roomRouter = express_1.default.Router();
exports.roomRouter.use(express_1.default.json());
exports.roomRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const games = yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.rooms) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        res.status(200).send(games);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.roomRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const newGame = req.body;
        const result = yield ((_b = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.rooms) === null || _b === void 0 ? void 0 : _b.insertOne(newGame));
        result
            ? res
                .status(201)
                .send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send('Failed to create a new game.');
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
