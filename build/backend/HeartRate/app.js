"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HeartRateApp_1 = __importDefault(require("./HeartRateApp"));
const app = new HeartRateApp_1.default();
app.start();
