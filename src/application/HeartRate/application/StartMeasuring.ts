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
            const promise = new PromiseWithLEDOutput((resolve, reject) => {
                setTimeout(() => {
                    const fail = Math.round(Math.random());
                    fail ? reject() : resolve(null)
                }, 200)
            })
            promise.then(() => console.log('Turning On Green LED'))
            promise.catch(() => console.log('Turning On Red LED'))
        }, 500);
    }
}