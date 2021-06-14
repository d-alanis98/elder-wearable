import { Gpio, Direction } from 'onoff';

export default class GPiOManager extends Gpio {
    //Constants
    static readonly DEFAULT_TIME_ON = 3500;

    constructor(
        pin: number,
        pinMode: Direction
    ) {
        super(pin, pinMode);
    }

    turnOn = () => {
        this.writeSync(1);
    }

    turnOff = () => {
        this.writeSync(0);
    }

    isOn = () => this.readSync() === 1;

    turnOnByTime = (time?: number) => {
        //We normalize the time
        const timeOn = time || GPiOManager.DEFAULT_TIME_ON; 
        this.turnOn();
        //We set up a timeout to set the logic level to low after the given time
        setTimeout(() => this.turnOff(), timeOn);
    }

}
