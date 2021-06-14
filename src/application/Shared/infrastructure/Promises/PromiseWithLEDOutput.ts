import GPiOManager from '../GPiO/GPiOManager';



export default class PromiseWithLEDOutput<T = any> {
    private readonly promise?: Promise<T>;
    //LEDS
    private readonly successLed: GPiOManager;
    private readonly pendingLed: GPiOManager;
    private readonly failureLed: GPiOManager;

    constructor(executor?: Executor<T>) {
        if(executor)
            this.promise = new Promise<T>(executor);
        //We set the LEDS
        this.successLed = new GPiOManager(17, 'out');
        this.pendingLed = new GPiOManager(27, 'out');
        this.failureLed = new GPiOManager(22, 'out');
        //We start with all of the off
        this.turnAllOff();
        //We turn on the pending LED
        this.pendingLed.turnOn();
    }

    public then = (onFullfilled?: ResolveFunction<T>) => {
        this.promise?.then((value: T) => {
            //We indicate success with the LED's
            this.indicateSuccess();
            //We execute the given handler
            onFullfilled?.(value);
        }) 
    };

    public catch = (onRejected?: RejectFunction) => {
        this.promise?.catch(error => {
            //We indicate the failure with the LED's
            this.indicateFailure();
            //We execute the given handler
            onRejected?.(error);
        });
    }


    public executeAsyncCallback = async (callback: AsyncCallback<T>) => {
        try {
            const result = await callback();
            //We indicate the success result
            this.indicateSuccess()
            //We return the result
            return result;
        } catch(error) {
            //We indicate the failure
            this.indicateFailure();
            return Promise.reject(error);
        }
    }

    //Internal helpers

    private indicateFailure = () => {
        this.turnAllOff();
        this.failureLed.turnOnByTime();
    }

    private indicateSuccess = () => {
        this.turnAllOff();
        this.successLed.turnOnByTime();
    }

    private turnAllOff = () => {
        this.failureLed.turnOff();
        this.successLed.turnOff();
        this.pendingLed.turnOff();
    }


}

//Types
type ResolveFunction<T> = (value: T) => void;
type RejectFunction = (reason?: any) => void;
type Executor<T> = (resolve: ResolveFunction<T>, reject: RejectFunction) => void;
type AsyncCallback<T> = () => Promise<T>;