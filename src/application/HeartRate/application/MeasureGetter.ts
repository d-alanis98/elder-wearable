//Domain
import { emptyResult, HeartRateResult } from '../domain/HeartRate';
//Infrastructure
import CommandExecutor from '../../Shared/infrastructure/ChildProcess/ChildProcess';
import PromiseWithLEDOutput from '../../Shared/infrastructure/Promises/PromiseWithLEDOutput';

export default class MeassureGetter {
    //Constants
    private readonly MAX_ATTEMPTS: number = 3;
    //Members
    private attempts: number;
    private measurementResult: HeartRateResult;

    constructor() {
        this.attempts = 0;
        this.measurementResult = emptyResult;
    }

    public run = async () => {
        await this.setMeasurementResult();
        if(this.isValidMeasurement())
            return this.measurementResult;
        //We retry up to 3 times
        else if(this.attempts <= this.MAX_ATTEMPTS)
            await this.run();
        else throw new Error('Error: Unable to get heart rate data. Please retry.')
    }

    private setMeasurementResult = async () => {
        const serializedData = await this.executeHeartRateMonitorProcess();
        console.log(serializedData);
        this.measurementResult = JSON.parse(serializedData);
        //We increase the attempts counter, which will help us to retry up to 3 times
        this.attempts++;
    }

    private executeHeartRateMonitorProcess = async () => new PromiseWithLEDOutput<string>()
        .executeAsyncCallback(async () => (
            await new CommandExecutor(
                'python /home/pi/heart-rate-monitor/main.py'
            ).execute()
        ));

    private isValidMeasurement = () => (
        this.measurementResult.heartRate > 0 && 
        this.measurementResult.saturation > 0
    );
    
}
