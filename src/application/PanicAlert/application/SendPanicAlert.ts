//Domain
import PanicAlert from '../domain/PanicAlert';
import Geolocation from '../../Geolocation/domain/Geolocation';
//Shared domain
import Logger from '../../Shared/domain/Logger/Logger';
//Infrastructure
import IoTDeviceDataAPI from '../../Shared/infrastructure/Requests/IoTDeviceDataAPI';


export default class SendPanicAlert {
    private readonly logger: Logger;
    private readonly panicAlert: PanicAlert;

    constructor(
        logger: Logger, 
        location: Geolocation
    ) {
        this.logger = logger;
        //We create the panic alert
        this.panicAlert = new PanicAlert(location);
    }

    public run = async () => {
        await new IoTDeviceDataAPI(this.logger).postData(
            'PanicAlert',
            this.panicAlert.toPrimitives()
        );
    }
}