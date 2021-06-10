//use cases
import LocationInterval from '../../application/Geolocation/application/LocationInterval';
//Base app
import App from '../App';


export default class GeolocationApp extends App {
    constructor() {
        super(GeolocationApp.name);
    }

    public start = async () => {
        try {
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            new LocationInterval(this.logger).run();
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}