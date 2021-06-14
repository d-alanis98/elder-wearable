//Domain
import Logger from '../../Shared/domain/Logger/Logger';
import { emptyResult, HeartRateResult } from '../domain/HeartRate';
//Infrastructure
import CommandExecutor from '../../Shared/infrastructure/ChildProcess/ChildProcess';
import PromiseWithLEDOutput from '../../Shared/infrastructure/Promises/PromiseWithLEDOutput';
export default class MeassureGetter {
    //Constants
    private readonly MAX_ATTEMPTS: number = 3;
    //Members
    private logger: Logger;
    private attempts: number;
    private measurementResult: HeartRateResult;

    constructor(logger: Logger) {
        this.logger = logger;
        this.attempts = 0;
        this.measurementResult = emptyResult;
    }


    public run = async (): Promise<HeartRateResult | undefined> => new PromiseWithLEDOutput<HeartRateResult | undefined>()
    .executeAsyncCallback(async () => {
        try {
            await this.setMeasurementResult();
            if(this.isValidMeasurement())
                return this.measurementResult;
            //We retry up to 3 times
            else if(this.attempts <= this.MAX_ATTEMPTS)
                return await this.run();
            else throw new Error('Error: Unable to get heart rate data. Please retry.')
        } catch(error) {
            this.logger.error(error.message);
            return Promise.reject(error.message);
        }
    });

    private setMeasurementResult = async () => {
        const serializedData = await this.executeHeartRateMonitorProcess();
        this.measurementResult = JSON.parse(serializedData);
        //We increase the attempts counter, which will help us to retry up to 3 times
        this.attempts++;
    }

    private executeHeartRateMonitorProcess = async () => (
        await new CommandExecutor(
            'python /home/pi/heart-rate-monitor/main.py'
        ).execute()
    );

    private isValidMeasurement = () => (
        this.measurementResult.heartRate > 0 && 
        this.measurementResult.saturation > 0
    );
    
}
