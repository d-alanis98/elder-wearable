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
const axios_1 = __importDefault(require("axios"));
const app_1 = __importDefault(require("../../../configuration/app"));
const ChildProcess_1 = __importDefault(require("../../Shared/infrastructure/ChildProcess/ChildProcess"));
class SendPanicAlert {
    constructor(logger, location) {
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            const formData = yield this.getFormData();
            try {
                const response = yield axios_1.default.post(`${app_1.default.serverUrl}/iot/device/data`, formData, {
                    headers: Object.assign(Object.assign({}, formData.getHeaders()), { Authorization: `Bearer ${app_1.default.authToken}` })
                });
                const deviceDataCreated = response.data;
                //We delete the audio
                yield this.deleteTempAudio();
                //We log the success state
                this.logger.info(`[${deviceDataCreated.key}] data sent successfully.`);
            }
            catch (error) {
                this.logger.error(error.message);
            }
        });
        this.getAudio = () => __awaiter(this, void 0, void 0, function* () {
            return (yield promises_1.readFile('/home/pi/.tmp/temp.wav'));
        });
        this.getSerializedLocation = () => JSON.stringify(this.panicAlert.toPrimitives());
        this.getFormData = () => __awaiter(this, void 0, void 0, function* () {
            const formData = new form_data_1.default();
            formData.append('key', 'PanicAlert');
            formData.append('value', this.getSerializedLocation());
            formData.append('audioFile', yield this.getAudio(), 'audio.wav');
            return formData;
        });
        this.deleteTempAudio = () => __awaiter(this, void 0, void 0, function* () {
            yield new ChildProcess_1.default('rm /home/pi/.tmp/temp.wav').execute();
        });
        this.logger = logger;
        //We create the panic alert
        this.panicAlert = new PanicAlert_1.default(location);
    }
}
exports.default = SendPanicAlert;
