import GPiOManager from '../../Shared/infrastructure/GPiO/GPiOManager'


export default class StartMeasuring {
    private readonly led: GPiOManager;

    constructor() {
        this.led = new GPiOManager(2, 'out');
    }

    public start = async () => {
        this.blinkLed();
    }

    private blinkLed = async () => {
        await this.led.isOn()
            ? this.led.turnOff()
            : this.led.turnOn;
    }
}