import GPiOManager from '../../Shared/infrastructure/GPiO/GPiOManager'


export default class StartMeasuring {
    private readonly led: GPiOManager;

    constructor() {
        this.led = new GPiOManager(17, 'out');
    }

    public start = () => {
        this.blinkLed();
    }

    private blinkLed = () => {
        setInterval(() => { 
            console.log('Blinking')
            this.led.isOnSync()
                ? this.led.turnOff()
                : this.led.turnOn();
        }, 1000);
    }
}