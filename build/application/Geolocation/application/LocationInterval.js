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
//Use cases
const GetLocation_1 = __importDefault(require("./GetLocation"));
const SendLocation_1 = __importDefault(require("./SendLocation"));
//Configuration
const app_1 = __importDefault(require("../../../configuration/app"));
class LocationInterval {
    constructor(logger) {
        this.run = () => {
            this.validateInterval();
            this.sendLocation();
            this.interval = setInterval(this.sendLocation, app_1.default.refreshInterval);
        };
        this.sendLocation = () => __awaiter(this, void 0, void 0, function* () {
            const location = yield new GetLocation_1.default().run();
            yield new SendLocation_1.default(this.logger, location).run();
        });
        this.stop = () => {
            this.interval && clearInterval(this.interval);
        };
        this.validateInterval = () => {
            if (app_1.default.refreshInterval < 60000)
                throw new Error('Interval not allowed');
        };
        this.logger = logger;
        this.interval = null;
    }
}
exports.default = LocationInterval;
