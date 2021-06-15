import axios from 'axios';
import app from '../../../configuration/app';
//Domain
import Geolocation from '../domain/Geolocation';

export default class GetLocation {

    public run = async (): Promise<Geolocation> => {
        const geolocation: Geolocation = await this.getIPLocation();
        return geolocation;
    }

    private getIPLocation = async () => {
        const response = await axios.get(`http://api.ipstack.com/check?access_key=${ app.locationApiKey }`);
        const { latitude, longitude } = response.data;
        return new Geolocation(latitude, longitude);
    }
}

