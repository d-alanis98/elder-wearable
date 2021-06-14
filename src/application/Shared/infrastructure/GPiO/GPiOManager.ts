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
        console.log('turning on')
        this.writeSync(1);
    }

    turnOff = () => {
        console.log('Turning off')
        this.writeSync(0);
    }

    isOn = async () => (
        await this.read() === 1
    );

    isOnSync = () => this.readSync() === 1;

    turnOnByTime = (time?: number) => {
        //We normalize the time
        const timeOn = time || GPiOManager.DEFAULT_TIME_ON; 
        this.turnOn();
        //We set up a timeout to set the logic level to low after the given time
        setTimeout(() => this.turnOff(), timeOn);
    }

}
