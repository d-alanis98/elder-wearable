//use cases
import StartMeasuring from '../../application/HeartRate/application/StartMeasuring';
//Base app
import App from '../App';


export default class HeartRateApp extends App {
    constructor() {
        super(HeartRateApp.name);
    }

    public start = async () => {
        try {
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            new StartMeasuring().start();
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}