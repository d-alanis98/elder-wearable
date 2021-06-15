import FormData from 'form-data';
import { readFile } from 'fs/promises';
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
        const formData = await this.getFormData();
        console.log('Making request')
        await new IoTDeviceDataAPI(this.logger).postData(
            'PanicAlert',
            formData,
            { 
                headers: {
                    ...formData.getHeaders(),
                } 
            }
        );
    }

    private getAudio = async (): Promise<Buffer> => (
        await readFile('/home/pi/.tmp/sample.wav')
    )

    private getSerializedLocation = () => JSON.stringify(
        this.panicAlert.toPrimitives().location
    );


    private getFormData = async () => {
        const formData = new FormData();
        formData.append('location', this.getSerializedLocation());
        formData.append('audioFile', await this.getAudio(), 'audio.wav');
        console.log(formData)
        return formData;
    }
}