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
const GPiOManager_1 = __importDefault(require("../../Shared/infrastructure/GPiO/GPiOManager"));
const PromiseWithLEDOutput_1 = __importDefault(require("../../Shared/infrastructure/Promises/PromiseWithLEDOutput"));
class StartMeasuring {
    constructor() {
        this.start = () => {
            this.testPromiseWithLEDOutput();
        };
        this.testPromiseWithLEDOutput = () => {
            setInterval(() => {
                const promise = new PromiseWithLEDOutput_1.default();
                promise.executeAsyncCallback(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.timeout(500);
                    console.log('Executed');
                }));
            }, 1000);
        };
        this.timeout = (time) => new Promise(resolve => setTimeout(resolve, time));
        this.led = new GPiOManager_1.default(17, 'out');
    }
}
exports.default = StartMeasuring;
