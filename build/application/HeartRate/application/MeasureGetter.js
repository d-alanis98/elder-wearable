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
//Domain
const HeartRate_1 = require("../domain/HeartRate");
//Infrastructure
const ChildProcess_1 = __importDefault(require("../../Shared/infrastructure/ChildProcess/ChildProcess"));
const PromiseWithLEDOutput_1 = __importDefault(require("../../Shared/infrastructure/Promises/PromiseWithLEDOutput"));
class MeassureGetter {
    constructor() {
        //Constants
        this.MAX_ATTEMPTS = 3;
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.setMeasurementResult();
            if (this.isValidMeasurement())
                return this.measurementResult;
            //We retry up to 3 times
            else if (this.attempts <= this.MAX_ATTEMPTS)
                return yield this.run();
            else
                throw new Error('Error: Unable to get heart rate data. Please retry.');
        });
        this.setMeasurementResult = () => __awaiter(this, void 0, void 0, function* () {
            const serializedData = yield this.executeHeartRateMonitorProcess();
            console.log(serializedData);
            this.measurementResult = JSON.parse(serializedData);
            //We increase the attempts counter, which will help us to retry up to 3 times
            this.attempts++;
        });
        this.executeHeartRateMonitorProcess = () => __awaiter(this, void 0, void 0, function* () {
            return new PromiseWithLEDOutput_1.default()
                .executeAsyncCallback(() => __awaiter(this, void 0, void 0, function* () {
                return (yield new ChildProcess_1.default('python /home/pi/heart-rate-monitor/main.py').execute());
            }));
        });
        this.isValidMeasurement = () => (this.measurementResult.heartRate > 0 &&
            this.measurementResult.saturation > 0);
        this.attempts = 0;
        this.measurementResult = HeartRate_1.emptyResult;
    }
}
exports.default = MeassureGetter;
