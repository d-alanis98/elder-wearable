import FormData from 'form-data';
import { readFile } from 'fs/promises';
//Domain
import PanicAlert from '../domain/PanicAlert';
import Geolocation from '../../Geolocation/domain/Geolocation';
//Shared domain
import Logger from '../../Shared/domain/Logger/Logger';
//Infrastructure
import IoTDeviceDataAPI from '../../Shared/infrastructure/Requests/IoTDeviceDataAPI';
import axios from 'axios';
import app from '../../../configuration/app';


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
        
        await axios.post(
            `${ app.serverUrl }/iot/device/data`,
            formData,
            { 
                headers: {
                    ...formData.getHeaders(),
                    Authentication: `Bearer ${ app.authToken }`,
                } 
            }
        );
    }

    private getAudio = async (): Promise<Buffer> => (
        await readFile('/home/pi/.tmp/sample.wav')
    )

    private getSerializedLocation = () => JSON.stringify(
        this.panicAlert.toPrimitives()
    );


    private getFormData = async () => {
        const formData = new FormData();
        formData.append('key', 'PanicAlert');
        formData.append('value', this.getSerializedLocation());
        formData.append('audioFile', await this.getAudio(), 'audio.wav');
        return formData;
    }
}