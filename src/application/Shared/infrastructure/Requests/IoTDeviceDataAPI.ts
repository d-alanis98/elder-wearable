//Domain
import Logger from '../../domain/Logger/Logger';
//Request manager
import AxiosRequest from './AxiosRequest';


export default class IoTDeviceDataAPI {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public postData = async (key: string, data: IoTDeviceDataRequest) => {
        try {
            const response = await AxiosRequest.post(
                '/iot/device/data',
                { 
                    key, 
                    value: data
                }
            );
            const deviceDataCreated = response.data;
            this.logger.info(`[${ deviceDataCreated.key }] data sent successfully.`);
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}

type IoTDeviceDataRequest = string | Object;