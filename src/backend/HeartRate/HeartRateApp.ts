//use cases
import MeassureGetter from '../../application/HeartRate/application/MeasureGetter';
//Base app
import App from '../App';


export default class HeartRateApp extends App {
    constructor() {
        super(HeartRateApp.name);
    }

    public start = async () => {
        try {
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            const result = await new MeassureGetter().run();
            console.log(result);
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}