//use cases
import SendPanicAlert from '../../application/PanicAlert/application/SendPanicAlert';
//Base app
import GetLocation from '../../application/Geolocation/application/GetLocation';
import PushButton from '../../application/Shared/infrastructure/GPiO/components/PushButton';
import App from '../App';
import PromiseWithLEDOutput from '../../application/Shared/infrastructure/Promises/PromiseWithLEDOutput';


export default class PanicAlertApp extends App {
    constructor() {
        super(PanicAlertApp.name);
        this.logger.info(`${PanicAlertApp.name} service started`);
    }

    public start = async () => {
        const pushButton = new PushButton(18);
        pushButton.onPress(async () => {
            try {
                new PromiseWithLEDOutput()
                    .executeAsyncCallback(async () => {
                    //We execute the location service
                    const location = await new GetLocation().run();
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