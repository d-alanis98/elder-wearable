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
//use cases
const MeasureGetter_1 = __importDefault(require("../../application/HeartRate/application/MeasureGetter"));
//Base app
const App_1 = __importDefault(require("../App"));
class HeartRateApp extends App_1.default {
    constructor() {
        super(HeartRateApp.name);
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            try {
                //We execute the main location interval use case, to update the location every X seconds (60 by default)
                const result = yield new MeasureGetter_1.default().run();
                console.log(result);
            }
            catch (error) {
                this.logger.error(error.message);
            }
        });
    }
}
exports.default = HeartRateApp;
