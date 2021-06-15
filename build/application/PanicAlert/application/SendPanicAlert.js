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
const form_data_1 = __importDefault(require("form-data"));
const promises_1 = require("fs/promises");
//Domain
const PanicAlert_1 = __importDefault(require("../domain/PanicAlert"));
//Infrastructure
const IoTDeviceDataAPI_1 = __importDefault(require("../../Shared/infrastructure/Requests/IoTDeviceDataAPI"));
class SendPanicAlert {
    constructor(logger, location) {
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            const formData = yield this.getFormData();
            console.log('Making request');
            yield new IoTDeviceDataAPI_1.default(this.logger).postData('PanicAlert', formData, {
                headers: Object.assign({}, formData.getHeaders())
            });
        });
        this.getAudio = () => __awaiter(this, void 0, void 0, function* () {
            return (yield promises_1.readFile('/home/pi/.tmp/sample.wav'));
        });
        this.getSerializedLocation = () => JSON.stringify(this.panicAlert.toPrimitives().location);
        this.getFormData = () => __awaiter(this, void 0, void 0, function* () {
            const formData = new form_data_1.default();
            formData.append('location', this.getSerializedLocation());
            formData.append('audioFile', yield this.getAudio(), 'audio.wav');
            console.log(formData);
            return formData;
        });
        this.logger = logger;
        //We create the panic alert
        this.panicAlert = new PanicAlert_1.default(location);
    }
}
exports.default = SendPanicAlert;
