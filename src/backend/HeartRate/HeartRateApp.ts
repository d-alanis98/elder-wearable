//use cases
import MeassureGetter from '../../application/HeartRate/application/MeasureGetter';
import SendHeartRate from '../../application/HeartRate/application/SendHeartRate';
import StatusLeds from '../../application/Shared/infrastructure/GPiO/components/StatusLeds';
//Base app
import App from '../App';


export default class HeartRateApp extends App {
    constructor() {
        super(HeartRateApp.name);
    }

    public start = async () => {
        try {
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            const heartRateResult = await new MeassureGetter().run();
            if(!heartRateResult)
                throw new Error('Heart rate data not received');
            await new SendHeartRate(
                this.logger,
                heartRateResult
            ).run();
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}