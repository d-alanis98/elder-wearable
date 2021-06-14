//Domain
import { HeartRateResult } from '../domain/HeartRate';
//Shared domain
import Logger from '../../Shared/domain/Logger/Logger';
//Infrastructure
import IoTDeviceDataAPI from '../../Shared/infrastructure/Requests/IoTDeviceDataAPI';


export default class SendHeartRate {
    private readonly logger: Logger;
    private readonly heartRateResult: HeartRateResult;

    constructor(
        logger: Logger, 
        heartRateResult: HeartRateResult
    ) {
        this.logger = logger;
        this.heartRateResult = heartRateResult;
    }

    public run = async () => {
        await new IoTDeviceDataAPI(this.logger).postData(
            'HeartRate',
            this.heartRateResult
        );
    }
}