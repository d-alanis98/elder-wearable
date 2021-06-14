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
const GPiOManager_1 = __importDefault(require("../GPiO/GPiOManager"));
class PromiseWithLEDOutput {
    constructor(executor) {
        this.then = (onFullfilled) => {
            var _a;
            (_a = this.promise) === null || _a === void 0 ? void 0 : _a.then((value) => {
                //We indicate success with the LED's
                this.indicateSuccess();
                //We execute the given handler
                onFullfilled === null || onFullfilled === void 0 ? void 0 : onFullfilled(value);
            });
        };
        this.catch = (onRejected) => {
            var _a;
            (_a = this.promise) === null || _a === void 0 ? void 0 : _a.catch(error => {
                //We indicate the failure with the LED's
                this.indicateFailure();
                //We execute the given handler
                onRejected === null || onRejected === void 0 ? void 0 : onRejected(error);
            });
        };
        this.executeAsyncCallback = (callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield callback();
                //We indicate the success result
                this.indicateSuccess();
                //We return the result
                return result;
            }
            catch (error) {
                //We indicate the failure
                this.indicateFailure();
                return Promise.reject(error);
            }
        });
        //Internal helpers
        this.indicateFailure = () => {
            this.turnAllOff();
            this.failureLed.turnOnByTime();
        };
        this.indicateSuccess = () => {
            this.turnAllOff();
            this.successLed.turnOnByTime();
        };
        this.turnAllOff = () => {
            this.failureLed.turnOff();
            this.successLed.turnOff();
            this.pendingLed.turnOff();
        };
        if (executor)
            this.promise = new Promise(executor);
        //We set the LEDS
        this.successLed = new GPiOManager_1.default(17, 'out');
        this.pendingLed = new GPiOManager_1.default(27, 'out');
        this.failureLed = new GPiOManager_1.default(22, 'out');
        //We start with all of the off
        this.turnAllOff();
        //We turn on the pending LED
        this.pendingLed.turnOn();
    }
}
exports.default = PromiseWithLEDOutput;
