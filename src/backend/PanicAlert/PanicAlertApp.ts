//use cases
import SendPanicAlert from '../../application/PanicAlert/application/SendPanicAlert';
//Base app
import GetLocation from '../../application/Geolocation/application/GetLocation';
import PushButton from '../../application/Shared/infrastructure/GPiO/components/PushButton';
import App from '../App';
import PromiseWithLEDOutput from '../../application/Shared/infrastructure/Promises/PromiseWithLEDOutput';
import PanicAudioRecorder from '../../application/PanicAlert/application/PanicAudioRecorder';


export default class PanicAlertApp extends App {
    constructor() {
        super(PanicAlertApp.name);
        this.logger.info(`${PanicAlertApp.name} service started`);
    }

    public start = async () => {
        const pushButton = new PushButton(21);
        pushButton.onPress(async () => {
            try {
                //We execute the location service
                const location = await new GetLocation().run();
                const promiseWithLEDs = new PromiseWithLEDOutput();
                promiseWithLEDs
                    .executeAsyncCallback(async () => {
                    //We record the audio
                    await new PanicAudioRecorder(
                        this.logger
                    ).run();
                    //We turn off the status LEDs, because the pending LED is to indicate the recording process
                    promiseWithLEDs.statusLeds.turnAllOff();
                    //We send the panic alert
                    await new SendPanicAlert(
                        this.logger,
                        location
                    ).run();
                });
            } catch(error) {
                this.logger.error(error.message);
            }
        })
    }
}