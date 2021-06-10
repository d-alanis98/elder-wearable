//Domain
import Geolocation from '../domain/Geolocation';
//Shared domain
import Logger from '../../Shared/domain/Logger/Logger';
//Infrastructure
import IoTDeviceDataAPI from '../../Shared/infrastructure/Requests/IoTDeviceDataAPI';


export default class SendLocation {
    private readonly logger: Logger;
    private readonly location: Geolocation;

    constructor(
        logger: Logger, 
        location: Geolocation
    ) {
        this.logger = logger;
        this.location = location;
    }

    public run = async () => {
        await new IoTDeviceDataAPI(this.logger).postData(
            'Location',
            this.location.toPrimitives()
        );
    }
}