import { Gpio, Direction } from 'onoff';

export default class GPiOManager extends Gpio {

    constructor(
        pin: number,
        pinMode: Direction
    ) {
        super(pin, pinMode);
    }

    turnOn = async () => {
        await super.write(1);
    }

    turnOff = async () => {
        await super.write(0);
    }

    isOn = async () => (
        await super.read() === 1
    );

    isOnSync = () => super.readSync() === 1;

    turnOnByTime = async (time: number) => {
        this.turnOn();
        //We set up a timeout to set the logic level to low after the given time
        setTimeout(() => this.turnOff(), time);
    }

}
