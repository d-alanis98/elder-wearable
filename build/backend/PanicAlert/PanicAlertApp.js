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
const SendPanicAlert_1 = __importDefault(require("../../application/PanicAlert/application/SendPanicAlert"));
//Base app
const GetLocation_1 = __importDefault(require("../../application/Geolocation/application/GetLocation"));
const PushButton_1 = __importDefault(require("../../application/Shared/infrastructure/GPiO/components/PushButton"));
const App_1 = __importDefault(require("../App"));
class PanicAlertApp extends App_1.default {
    constructor() {
        super(PanicAlertApp.name);
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            const pushButton = new PushButton_1.default(18);
            pushButton.onPress(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    //We execute the location service
                    const location = yield new GetLocation_1.default().run();
                    //We send the panic alert
                    yield new SendPanicAlert_1.default(this.logger, location).run();
                }
                catch (error) {
                    this.logger.error(error.message);
                }
            }));
        });
    }
}
exports.default = PanicAlertApp;
