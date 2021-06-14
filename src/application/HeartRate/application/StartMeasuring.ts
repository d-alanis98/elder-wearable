import GPiOManager from '../../Shared/infrastructure/GPiO/GPiOManager'
import PromiseWithLEDOutput from '../../Shared/infrastructure/Promises/PromiseWithLEDOutput';


export default class StartMeasuring {
    private readonly led: GPiOManager;

    constructor() {
        this.led = new GPiOManager(17, 'out');
    }

    public start = () => {
        this.testPromiseWithLEDOutput();
    }

    private testPromiseWithLEDOutput = () => {
        setInterval(() => {
            const promise = new PromiseWithLEDOutput();
            promise.executeAsyncCallback(async () => {
                await this.timeout(750);
                console.log('Executed')
            });
        }, 500);
    }

    private timeout = (time: number) => new Promise(resolve => setTimeout(resolve, time));
}