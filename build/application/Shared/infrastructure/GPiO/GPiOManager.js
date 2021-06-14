"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
class GPiOManager extends onoff_1.Gpio {
    constructor(pin, pinMode) {
        super(pin, pinMode);
        this.turnOn = () => {
            this.writeSync(1);
        };
        this.turnOff = () => {
            this.writeSync(0);
        };
        this.isOn = () => this.readSync() === 1;
        this.turnOnByTime = (time) => {
            //We normalize the time
            const timeOn = time || GPiOManager.DEFAULT_TIME_ON;
            this.turnOn();
            //We set up a timeout to set the logic level to low after the given time
            setTimeout(() => this.turnOff(), timeOn);
        };
    }
}
exports.default = GPiOManager;
//Constants
GPiOManager.DEFAULT_TIME_ON = 3500;
