//use cases
import MeassureGetter from '../../application/HeartRate/application/MeasureGetter';
import SendHeartRate from '../../application/HeartRate/application/SendHeartRate';
import PushButton from '../../application/Shared/infrastructure/GPiO/components/PushButton';
import StatusLeds from '../../application/Shared/infrastructure/GPiO/components/StatusLeds';
//Base app
import App from '../App';


export default class HeartRateApp extends App {
    constructor() {
        super(HeartRateApp.name);
    }

    public start = async () => {
        try {
            const pushButton = new PushButton(18);
            pushButton.onPress(async () => {
                //We execute the heart rate monitor service and send the data to the server
                const heartRateResult = await new MeassureGetter().run();
                if(!heartRateResult)
                    throw new Error('Heart rate data not received');
                await new SendHeartRate(
                    this.logger,
                    heartRateResult
                ).run();
            })
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}